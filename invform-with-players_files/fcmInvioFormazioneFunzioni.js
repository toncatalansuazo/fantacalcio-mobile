/**
 * fcmInvioFormazioneFunzioni.js
 *
 * @author Marcello 'John Doe' Puri
 * @copyright Copyright (C) 2005-2023 Marcello 'John Doe' Puri
 * @license http://www.gnu.org/copyleft/gpl.html GNU General Public License
 * @version 2.3.0 (13/05/2023)
 */

/**
 * Oggetto Giocatore per Invio formazione
 *
 * @param {Number} IDSquadra Id fantasquadra
 * @param {Number} ID Id giocatore
 * @param {Number} Ruolo Ruolo (1=P, 2=D, 3=C, 4=A)
 * @param {Number} IDSquadraDiA Id squadra di A
 * @param {String} Dati Dati statistici ("<aff>%<prim>%<mv>%<col>%<fm>%<col>%<mv>%<col>%<fv>%<col>")
 */
function ifG(IDSquadra, ID, Ruolo, IDSquadraDiA, Dati)
{
	this.IDSquadra = IDSquadra;
	this.ID = ID;
	this.Nome = "xg" + ID;
	this.Ruolo = Ruolo;
	this.IDSquadraDiA = IDSquadraDiA;
	this.SquadraDiA = "xa" + IDSquadraDiA;
	this.Dati = Dati;

	this.Formazione = 0;
	this.Rigorista = 0;
}

var arrRosa = [];
var arrFormazione = [];
var coloreRuoli = ["", "G", "V", "R", "Blu"];
var coloreDati = ["Rv", "CellaRvRosso", "CellaRvCiano", "CellaRvVerde"];
var ruoli = ["", "P", "D", "C", "A"];

var moduloInserito = [0, 0, 0, 0, 0];
var titolariInseriti = 0;
var riserveInserite = [0, 0, 0, 0, 0];
var totaleRiserveInserite = 0;

var arrRigoristi = [];
var mostraRigoristi = false;
var controllaRigoristi = false;

var incontriDisponibili = [];
var incontroReimposta;

var idxFsq;

/**
 * Genera l'intestazione per la scelta della fantasquadra e della giornata
 * Utilizza MaxA definito in SerieADati
 * @param {Number} cFsq Codice fantasquadra
 * @param {Number} cGio Codice giornata di A
 */
function GeneraIntestazioneInvioFormazione(cFsq, cGio)
{
	var arrF = arrFantasquadre;
	document.write("<form name='frmIF' id='frmIF' action='invform.htm' method='get'>");
	document.write("<table width='100%' border='0' cellspacing='0' cellpadding='0'>");
	document.write("<tr><td width='5%' class='t-xxsB'><nobr>Fantasquadra:&nbsp;<select name='Fsq' class='t-xxs' id='Fsq'>");
	for (var i = 1; i < arrF.length; i++) {
		document.write("<option value='" + arrF[i].ID + "'");
		if (arrF[i].ID === cFsq) {
			document.write(" selected");
			idxFsq = i;
		}
		document.write(">" + arrF[i].Nome + "</option>");
	}
	document.write("</select></nobr></td>");

	var attributes = disabilitaGiornata ? "disabled" : "";
	document.write("<td width='5%' class='t-xxsB'><nobr>&nbsp;&nbsp;Giornata:&nbsp;<select name='Gio' class='t-xxs' id='Gio' " + attributes + ">");
	for (i = 1; i <= MaxA; i++) {
		document.write("<option value='" + i + "'");
		if (i === cGio) document.write(" selected");
		document.write(">" + i + "</option>");
	}
	document.write("</select></nobr></td>");

	document.write("<td width='95%' class='t-xxsB'>&nbsp;&nbsp;<input name='Invia' type='submit' class='t-xxs' id='Invia' value='  Vai  '></td>");
	document.write("</tr></table></form>");
}

/**
 * Genera form per la selezione degli incontri che interessano la squadra
 * @param {Number} cFsq Codice fantasquadra
 * @param {Number} cGio Codice giornata di A
 * @returns {Boolean} false se nessun incontro disponibile
 */
function GeneraSelezioneCompetizioni(cFsq, cGio)
{
	// Ottiene incontri della giornata selezionata che interessano la squadra
	// controllando che non siano già stati giocati
	for (var i = 1; i < arrIncontri.length; i++)
		if (
		arrIncontri[i].GiornataDiA === cGio &&
		(arrIncontri[i].IDSquadre.Casa === cFsq || arrIncontri[i].IDSquadre.Fuori === cFsq) &&
		arrIncontri[i].IDTipo !== INC_RIPOSO &&
		arrIncontri[i].Giocato === 0 &&
		arrIncontri[i].IncAcc === 1
		)
			incontriDisponibili.push(i);

	var errore;
	if (incontriDisponibili.length === 0) {
		// Se nessun incontro disponibile, lo segnala
		errore = "Nessun incontro disponibile";
	}
	else if (termineInvio !== undefined) {
		if (termineInvio === false)
			// Se non è stato possibile determinare il termine invio, lo segnala
			errore = "Impossibile determinare termine invio";
		else {
			termineInvio.dataOraTermine = new Date(termineInvio.dataOraTermine);
			if (termineInvio.secondiRimasti <= 0)
			// Se termine invio scaduto, lo segnala
				errore = "Termine invio scaduto (" + FormattaDataOraTermineInvio() + ")";
			else {
				termineInvio.offsetServer = new Date(termineInvio.dataOraServer) - new Date();
				termineInvio.funzione = setInterval(AggiornaTempoRimasto, 1000);
			}
		}
	}

	if (errore !== undefined) {
		document.write("<p class='t-xxsB' style='text-align:left'>" + errore + "</p>");
		return false;
	}

	incontroReimposta = arrIncontri[incontriDisponibili[0]];

	// Mostra check-box degli incontri disponibili
	var attributes = incontriDisponibili.length === 1 || disabilitaIncontri ? "disabled" : "";
	document.write("<table width='100%' border='0' cellspacing='0' cellpadding='0'>");
	for (i = 0; i < incontriDisponibili.length; i++) {
		var ii = arrIncontri[incontriDisponibili[i]];

		ii.Descrizione = ii.Competizione + ": " + ii.Fantagiornata;
		if (ii.IDTipo !== INC_GRANPREMIO) ii.Descrizione += " (" + ii.Nomi.Casa + " - " + ii.Nomi.Fuori + ")";

		if (
		ii.IDTipo === INC_ELIMDIRETTA_DIR ||
		ii.IDTipo === INC_ELIMDIRETTA_RIT ||
		ii.IDTipo === INC_ELIMDIRETTA_DIR_FC
		) {
			ii.Rigoristi = true;
			mostraRigoristi = true;
			incontroReimposta = ii;
		}

		document.write("<tr><td class='t-xxsB' valign='middle'><nobr>");
		document.write("<input class='t-xxs' type='checkbox' value='" + incontriDisponibili[i] + "' id='incontro" + (i + 1) + "' checked " + attributes + "></td>");
		document.write("<td width='100%' class='t-xxsB'>" + ii.Descrizione + "</td>");
		if (i === 0 && termineInvio !== undefined) {
			document.write("<td rowspan='" + incontriDisponibili.length + "' class='t-xxs' align='center' style='padding-right:5px'><nobr>");
			document.write("<b>Termine invio</b><br>");
			document.write(FormattaDataOraTermineInvio() + "<br>");
			document.write("<span id='tempoRimasto' style='font-style: italic'>&nbsp;</span>");
			document.write("</td>");
			AggiornaTempoRimasto();
		}
		document.write("</tr>");
	}
	document.write("</table><br>");

	return true;
}

/**
 * Genera tabella contenente i giocatori che compongono la rosa
 */
function GeneraTabelleGiocatori()
{
	document.write("<table width='95%' border='0' cellpadding='0' cellspacing='0'>");

	// Tabella di sinistra (rosa fantasquadra)
	document.write("<tr><td width='62.5%' align='center' valign='top'>");
	var tabR = new Tabella(1, 8);

	// Imposta proprietà della tabella
	tabR.nome = "Rosa fantasquadra";
	tabR.larghezza = 100;
	tabR.border = 0;
	tabR.cellpadding = 1;
	tabR.cellspacing = 0;
	tabR.stile = "ClassEl";
	var col = 1;
	tabR.SetLarghezzaColonna(col++, 5);
	tabR.SetLarghezzaColonna(col++, 25);
	tabR.SetLarghezzaColonna(col++, primavera ? 5 : 10);
	if (primavera) tabR.SetLarghezzaColonna(col++, 5);
	tabR.SetLarghezzaColonna(col++, 10);
	tabR.SetLarghezzaColonna(col++, 10);
	tabR.SetLarghezzaColonna(col++, 10);
	tabR.SetLarghezzaColonna(col++, 10);
	tabR.SetLarghezzaColonna(col++, 20);

	// Header
	col = 1;
	tabR.SetValore(1, col++, "R");
	tabR.SetValore(1, col++, "Nome&nbsp;(Squadra)");
	tabR.SetValore(1, col++, "Aff");
	if (primavera) tabR.SetValore(1, col++, "PPr");
	tabR.SetValore(1, col++, "MVt");
	tabR.SetValore(1, col++, "FMt");
	tabR.SetValore(1, col++, "MVu");
	tabR.SetValore(1, col++, "FMu");
	tabR.SetValore(1, col++, "Sq Avv.");
	for (col = 1; col <= 8 + primavera; col++) tabR.SetStile(1, col, "IntRossoBlu");

	// Riempie la tabella
	var cnt = 2;
	for (var g = 0; g < arrInvioFormazione.length; g++) {
		var gg = arrInvioFormazione[g];
		if (gg.IDSquadra !== cFsq) continue;

		arrRosa.push(g);

		var pd = cnt % 2 ? "D" : "P";
		var dati = gg.Dati.split("%");

		tabR.SetStileRiga(cnt, "t-xxs");

		var colore = coloreRuoli[gg.Ruolo];

		// Ruolo
		col = 0;
		tabR.SetValore(cnt, ++col, "<span class='t-xxs" + colore + "B' id='r_ruolo" + g + "'>&nbsp;" + ruoli[gg.Ruolo] + "&nbsp;</span>");
		tabR.SetStile(cnt, col, "Form" + pd + "Centro");
		// Nome (Squadra)
		tabR.SetValore(cnt, ++col, "<nobr><span class='t-xxs" + colore + "B' style='cursor: pointer' id='r_nome" + g + "' onclick='ClickGiocatoreRosa(" + g + ")'>" + eval(gg.Nome) + " (" + eval(gg.SquadraDiA) + ")</span>");
		tabR.SetStile(cnt, col, "Form" + pd);
		// Dati
		for (var d = 0; d < 10; d++) {
			if (d % 2 && d >= 3) {
				colore = Number(dati[d]);
				tabR.SetStile(cnt, col, coloreDati[colore] + (colore === 0 ? pd : "") + "Centro");
			}
			else {
				if (!primavera && d == 1) continue;
				tabR.SetValore(cnt, ++col, dati[d]);
				if (d < 3) tabR.SetStile(cnt, col, "Form" + pd + "Centro");
			}
		}
		// Squadra avversaria
		var nomeAvversaria = "---";
		var inTrasferta = false;
		if (gg.IDSquadraDiA < incontraInA.length) {
			var avversaria = incontraInA[gg.IDSquadraDiA][cGio];
			inTrasferta = avversaria >= 100;
			nomeAvversaria = eval("xa" + (avversaria % 100));
		}
		tabR.SetValore(cnt, ++col, "<span class='t-xxs'>" + (inTrasferta ? nomeAvversaria : nomeAvversaria.toUpperCase()) + "</span>");
		tabR.SetStile(cnt, col, "Form" + pd);

		cnt++;
	}

	// Stampa tabella
	tabR.Stampa();
	document.write("</td><td width='2.5%'>&nbsp;</td>");

	// Imposta 'totaleNumeroMassimoRiserve' se panchina libera
	// Inizializza formazione (array 'arrFormazione' e 'arrRigoristi')
	if (totaleNumeroMassimoRiserve < 0) totaleNumeroMassimoRiserve = arrRosa.length - 11;
	for (var i = 1; i <= 11 + totaleNumeroMassimoRiserve; i++) arrFormazione[i] = arrRigoristi[i] = -1;

	// Tabella di destra (formazione)
	document.write("<td width='35%' align='center' valign='top'>");
	var tabF = new Tabella(1, 4 + Number(mostraRigoristi));

	// Imposta proprietà della tabella
	tabF.nome = "Formazione";
	tabF.larghezza = 100;
	tabF.border = 0;
	tabF.cellpadding = 1;
	tabF.cellpadding = 0;
	tabF.stile = "ClassEl";
	tabF.SetLarghezzaColonna(1, 7);
	tabF.SetLarghezzaColonna(2, 1);
	tabF.SetLarghezzaColonna(3, 7);
	tabF.SetLarghezzaColonna(4, 85 - 5 * (mostraRigoristi === true));
	if (mostraRigoristi) {
		tabF.SetLarghezzaColonna(5, 5);
		rigoristiOptions = "";
	}

	// Costruisce la tabella vuota
	var n = 1;
	for (var cnt = 1; cnt <= 11 + totaleNumeroMassimoRiserve + 2; cnt++) {
		var pd = cnt % 2 ? "D" : "P";
		if (cnt === 1 || cnt === 13) {
			// Header titolari o riserve
			tabF.SetSpan(cnt, 1, 4 + Number(mostraRigoristi));
			tabF.SetSpanned(cnt, 2, true);
			tabF.SetSpanned(cnt, 3, true);
			tabF.SetSpanned(cnt, 4, true);
			if (mostraRigoristi) tabF.SetSpanned(cnt, 5, true);
			tabF.SetStile(cnt, 1, "IntRossoBlu");
			if (cnt === 1) tabF.SetValore(cnt, 1, "<span id='f_titolari'>Titolari (0-0-0)</span>");
			else tabF.SetValore(cnt, 1, "<span id='f_riserve'>Riserve</span>");
		}
		else {
			// Giocatore
			tabF.SetStileRiga(cnt, "t-xxs");
			tabF.SetValore(cnt, 1, "<span class='t-xxsB'>&nbsp;" + n + "&nbsp;</span>");
			tabF.SetStile(cnt, 1, "Form" + pd + "Centro");
			tabF.SetValore(cnt, 2, "<img src='img/spacer.gif' width='32' height='32' id='f_maglia" + n + "'");
			tabF.SetStile(cnt, 2, "Form" + pd + "Centro");
			tabF.SetValore(cnt, 3, "<span class='t-xxsB' id='f_ruolo" + n + "'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>");
			tabF.SetStile(cnt, 3, "Form" + pd + "Centro");
			tabF.SetValore(cnt, 4, "<span class='t-xxsB' style='cursor: pointer' id='f_nome" + n + "' onclick='ClickGiocatoreFormazione(" + n + ")'>&nbsp;</span>");
			tabF.SetStile(cnt, 4, "Form" + pd);

			if (mostraRigoristi) {
				var r = n <= 11 ? (11 - n + 1) : n;
				arrRigoristi[n] = r;
				var rigoristiOptions = "";
				for (i = 1; i <= 11 + totaleNumeroMassimoRiserve; i++)
					rigoristiOptions += "<option " + (r === i ? "selected " : "") + "value='" + i + "'>" + i + "</option>";
				tabF.SetValore(cnt, 5, "<select class='t-xxs' name='f_rigorista" + n + "' id='f_rigorista" + n + "' onchange='CambiaRigorista(" + n + ")'>" + rigoristiOptions + "</select>");
				tabF.SetStile(cnt, 5, "Form" + pd + "Centro");
			}
			n++;
		}
	}

	// Stampa tabella
	tabF.Stampa();

	document.write("<br><input type='button' class='t-xxs' value=' Inizializza ' onclick='InizializzaFormazione()'>&nbsp;&nbsp;&nbsp;&nbsp;");
	document.write("<input type='button' class='t-xxs' value=' Reimposta ' onclick='ReimpostaFormazione()'>");
	document.write("</td></tr></table>");
	Stato("Invio formazione");
}

/**
 * Inizializza dati e svuota tabella formazione
 */
function InizializzaFormazione()
{
	for (var i = 1; i < arrFormazione.length; i++) {
		var idG = arrFormazione[i];
		arrFormazione[i] = -1;
		if (idG >= 0) {
			arrInvioFormazione[idG].Formazione = 0;
			arrInvioFormazione[idG].Rigorista = 0;
			CambiaAttributiGiocatoreRosa(idG, false)
		}
		if (mostraRigoristi) {
			var el = document.getElementById("f_rigorista" + i);
			arrRigoristi[i] = i <= 11 ? (11 - i + 1) : i;
			el.value = arrRigoristi[i];
		}
	}
	moduloInserito = [0, 0, 0, 0, 0];
	titolariInseriti = 0;
	riserveInserite = [0, 0, 0, 0, 0];
	totaleRiserveInserite = 0;
	VisualizzaTabellaFormazione();
}

/**
 * Reimposta formazione impostando l'ultima presente sul sito
 */
function ReimpostaFormazione()
{
	InizializzaFormazione(false);

	var idLega = incontroReimposta.IDSquadre.Casa === cFsq ? incontroReimposta.IDLegaSquadre.Casa : incontroReimposta.IDLegaSquadre.Fuori;
	var arrFormazioneEsistente = GetFormazione(incontroReimposta.ID, cFsq, idLega);

	for (var i = 1; i < arrFormazioneEsistente.length; i++) {
		var g = arrFormazioneEsistente[i];
		if (g.Pos < 0) continue;
		for (var idG = 0; idG < arrInvioFormazione.length; idG++) {
			var gg = arrInvioFormazione[idG];
			if (gg.IDSquadra === g.IDSquadra && eval(gg.Nome) === g.Nome) {
				var result;
				if (g.Pos === 0) result = InserisciTitolare(gg, idG);
				else result = InserisciRiserva(gg, idG);
				if (result) {
					CambiaAttributiGiocatoreRosa(idG, true);
					if (mostraRigoristi) gg.Rigorista = g.Rig;
				}
				break;
			}
		}
	}

	for (i = 1; i <= 11 + totaleNumeroMassimoRiserve; ++i) {
		g = arrInvioFormazione[arrFormazione[i]];
		if (g !== undefined && g.Rigorista !== 0) {
			var el = document.getElementById("f_rigorista" + g.Formazione);
			el.value = g.Rigorista;
			CambiaRigorista(g.Formazione);
		}
	}
}

/**
 * Handler dell'evento onclick su un giocatore della rosa.
 * Viene inserito nella formazione, come titolare o riserva.
 * @param {Number} idG Indice giocatore (in arrInvioFormazione)
 */
function ClickGiocatoreRosa(idG)
{
	var gg = arrInvioFormazione[idG];
	if (gg.Formazione === 0) {
		var result;
		if (titolariInseriti < 11) result = InserisciTitolare(gg, idG);
		else result = InserisciRiserva(gg, idG);
		if (result) CambiaAttributiGiocatoreRosa(idG, true);
	}
	else {
		if (gg.Formazione <= 11) RimuoviTitolare(gg);
		else RimuoviRiserva(gg);
		CambiaAttributiGiocatoreRosa(idG, false);
	}
}

/**
 * Handler dell'evento onclick su un giocatore della formazione.
 * Viene rimosso dalla formazione e rimesso disponibile fra quelli della rosa.
 * @param {Number} pos Posizione nella formazione (1..11, 12..)
 */
function ClickGiocatoreFormazione(pos)
{
	var idG = arrFormazione[pos];
	if (idG < 0) return;

	var gg = arrInvioFormazione[idG];
	if (pos <= 11) RimuoviTitolare(gg);
	else RimuoviRiserva(gg);
	CambiaAttributiGiocatoreRosa(idG, false);
}

/**
 * Funzione che inserisce il giocatore specificato fra i titolari.
 * @param {Object} gg Oggetto ifG
 * @param {Number} idG Indice giocatore (in arrInvioFormazione)
 * @returns {Boolean} false se non è possibile inserire il giocatore perché
 * si otterrebbe un modulo non valido
 */
function InserisciTitolare(gg, idG)
{
	// Controlla se il nuovo modulo è compatibile
	moduloInserito[gg.Ruolo]++;

	var compatibile = false;
	for (var m = 0; m < moduliAmmessi.length; m++)
		if (moduloInserito[1] <= moduliAmmessi[m][1] &&
		moduloInserito[2] <= moduliAmmessi[m][2] &&
		moduloInserito[3] <= moduliAmmessi[m][3] &&
		moduloInserito[4] <= moduliAmmessi[m][4]) {
			compatibile = true;
			break;
		}

	if (!compatibile) {
		moduloInserito[gg.Ruolo]--;
		alert("Impossibile inserire il giocatore in formazione: il modulo che ne deriverebbe non è ammesso nella competizione");
		return false;
	}

	// Cerca posizione d'inserimento
	for (var p = 1; p <= 11; p++)
		if (arrFormazione[p] < 0 || arrInvioFormazione[arrFormazione[p]].Ruolo > gg.Ruolo) break;

	// Sposta giocatori già inseriti
	for (var i = titolariInseriti; i >= p; i--) {
		arrFormazione[i + 1] = arrFormazione[i];
		arrInvioFormazione[arrFormazione[i]].Formazione = i + 1;
	}

	// Inserisci nuovo giocatore
	arrFormazione[p] = idG;
	gg.Formazione = p;
	titolariInseriti++;

	// Visualizza nuova formazione
	VisualizzaTabellaFormazione();
	return true;
}

/**
 * Funzione che rimuove un giocatore dai titolari.
 * @param {Object} gg Oggetto ifG
 * @returns {Boolean}
 */
function RimuoviTitolare(gg)
{
	// Sposta giocatori già inseriti
	for (var i = gg.Formazione; i <= 11; i++) {
		if (i < titolariInseriti) {
			arrFormazione[i] = arrFormazione[i + 1];
			arrInvioFormazione[arrFormazione[i]].Formazione = i;
		}
		else arrFormazione[i] = -1;
	}

	// Rimuovi giocatore
	gg.Formazione = 0;
	titolariInseriti--;
	moduloInserito[gg.Ruolo]--;

	// Visualizza nuova formazione
	VisualizzaTabellaFormazione();
	return true;
}

/**
 * Funzione che inserisce il giocatore specificato fra le riserve
 * @param {Object} gg Oggetto ifG
 * @param {Number} idG Indice giocatore (in arrInvioFormazione)
 * @returns {Boolean} false se non è possibile inserire il giocatore perché
 * si supererebbe il limite massimo totale o per ruolo
 */
function InserisciRiserva(gg, idG)
{
	// Controlla se è possibile inserire altre riserve
	if (totaleRiserveInserite >= totaleNumeroMassimoRiserve) {
		alert("Hai già inserito il numero massimo di riserve");
		return false;
	}
	if (numeroMassimoRiserve[gg.Ruolo] >= 0 &&
	riserveInserite[gg.Ruolo] >= numeroMassimoRiserve[gg.Ruolo]) {
		alert("Hai già inserito il numero massimo di riserve in questo ruolo");
		return false;
	}

	// Cerca posizione d'inserimento
	for (var p = 12; p <= 11 + totaleNumeroMassimoRiserve; p++)
		if (arrFormazione[p] < 0 || (panchinaOrdinata && arrInvioFormazione[arrFormazione[p]].Ruolo > gg.Ruolo)) break;

	// Sposta giocatori già inseriti
	for (var i = 11 + totaleRiserveInserite; i >= p; i--) {
		arrFormazione[i + 1] = arrFormazione[i];
		arrInvioFormazione[arrFormazione[i]].Formazione = i + 1;
	}

	// Inserisci nuovo giocatore
	arrFormazione[p] = idG;
	gg.Formazione = p;
	totaleRiserveInserite++;
	riserveInserite[gg.Ruolo]++;

	// Visualizza nuova formazione
	VisualizzaTabellaFormazione();
	return true;
}

/**
 * Funzione che rimuove un giocatore dalle riserve
 * @param {Object} gg Oggetto ifG
 * @returns {Boolean}
 */
function RimuoviRiserva(gg)
{
	// Sposta giocatori già inseriti
	var i;
	for (i = gg.Formazione; i <= 11 + totaleNumeroMassimoRiserve; i++) {
		if (i < 11 + totaleRiserveInserite) {
			arrFormazione[i] = arrFormazione[i + 1];
			arrInvioFormazione[arrFormazione[i]].Formazione = i;
		}
		else arrFormazione[i] = -1;
	}

	// Rimuovi giocatore
	gg.Formazione = 0;
	totaleRiserveInserite--;
	riserveInserite[gg.Ruolo]--;

	// Visualizza nuova formazione
	VisualizzaTabellaFormazione();
	return true;
}

/**
 * Cambia gli attributi di visualizzazione delle riga di un giocatore nella
 * tabella della rosa
 * @param {Number} idG Indice giocatore (in arrInvioFormazione)
 * @param {Boolean} sel Giocatore selezionato e inserito in formazione
 */
function CambiaAttributiGiocatoreRosa(idG, sel)
{
	if (sel) {
		document.getElementById("r_ruolo" + idG).className = "t-xxsI";
		document.getElementById("r_nome" + idG).className = "t-xxsI";
	}
	else {
		document.getElementById("r_ruolo" + idG).className = "t-xxs" + coloreRuoli[arrInvioFormazione[idG].Ruolo] + "B";
		document.getElementById("r_nome" + idG).className = "t-xxs" + coloreRuoli[arrInvioFormazione[idG].Ruolo] + "B";
	}
}

/**
 * Visualizza i dati dei giocatori nella tabella della formazione
 */
function VisualizzaTabellaFormazione()
{
	document.getElementById("f_titolari").innerHTML = "Titolari (" + moduloInserito[2] + "-" + moduloInserito[3] + "-" + moduloInserito[4] + ")";

	var i;
	for (i = 1; i <= 11 + totaleNumeroMassimoRiserve; i++) {
		if (arrFormazione[i] < 0) {
			document.getElementById("f_maglia" + i).src = "img/spacer.gif";
			document.getElementById("f_ruolo" + i).innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
			document.getElementById("f_nome" + i).innerHTML = "&nbsp;";
		}
		else {
			var gg = arrInvioFormazione[arrFormazione[i]];
			document.getElementById("f_maglia" + i).src = "img/sq/" + eval(gg.SquadraDiA) + ".gif";
			document.getElementById("f_ruolo" + i).innerHTML = "&nbsp;" + ruoli[gg.Ruolo] + "&nbsp;";
			document.getElementById("f_ruolo" + i).className = "t-xxs" + coloreRuoli[gg.Ruolo] + "B";
			document.getElementById("f_nome" + i).innerHTML = eval(gg.Nome) + " (" + eval(gg.SquadraDiA) + ")";
			document.getElementById("f_nome" + i).className = "t-xxs" + coloreRuoli[gg.Ruolo] + "B";
		}
	}
}

/**
 * Handler dell'evento onchange dei controlli select dei rigoristi.
 * Scambia gli ordini rigoristi in modo da evitare duplicati.
 * @param {Number} pos Numero del controllo select modificato
 */
function CambiaRigorista(pos)
{
	var r = Number(document.getElementById('f_rigorista' + pos).value);
	var rPrec = arrRigoristi[pos];

	for (var i = 1; i <= arrRigoristi.length; i++)
		if (arrRigoristi[i] === r) {
			arrRigoristi[i] = rPrec;
			document.getElementById('f_rigorista' + i).value = rPrec;
		}
	arrRigoristi[pos] = r;
}

/**
 * Genera controlli per invio formazione (comunicazioni, password e pulsante d'invio)
 */
function GeneraControlliPerInvio()
{
	document.write("<form id='formInvio' action='" + scriptServer + "' method='post' accept-charset='utf-8' target='invformWindow' onsubmit='return InviaFormazione();'>");
	document.write("<p>&nbsp;</p><table width='95%' border='0' cellpadding='0' cellspacing='0'>");

	// Comunicazioni
	if (!nascondiComunicazioni) {
		document.write("<tr><td colspan='3' width='100%' align='left' valign='top' class='t-xxsB'>Comunicazioni:<br>");
		document.write("<textarea id='fi_comunicazioni' class='t-xxs' rows='4' style='width: 100%'></textarea><br><br>");
		document.write("</td></tr>");
	}

	// Password e Invia
	document.write("<tr><td width='65%'>&nbsp;</td>");
	document.write("<td align='left' valign='top' class='t-xxsB'><nobr>Password: <input type='password' name='password' value='' class='t-xxs'></td>");
	document.write("<td align='right' valign='top'><input type='submit' value='  Invia formazione  '  class='t-xxs'></td>");

	document.write("</tr></table>");
	document.write("<input type='hidden' name='azione' value='inviaFormazione'>");
	document.write("<input type='hidden' id='fi_idSquadra' name='idSquadra'>");
	document.write("<input type='hidden' id='fi_giornataDiA' name='giornataDiA'>");
	document.write("<input type='hidden' id='fi_formazioni' name='formazioni'>");
	document.write("</form><br>");
}

/**
 * Compila tutti i campi nascosti del form HTML con tutti i dati necessari
 * per l'invio della formazione.
 * Crea window dove visualizzare il risultato dell'invio e richiama lo
 * script server-side incaricato di eseguire le operazioni d'invio (invio
 * mail, salvataggio su sito e inoltro a Telegram).
 * @returns {Boolean} false se non è possibile inviare la formazione per
 * un errore di compilazione
 */
function InviaFormazione()
{
	// Non invia la formazione se nessun incontro è stato selezionato
	var incontriSelezionati = 0;
	for (var i = 1; i <= incontriDisponibili.length; ++i)
		if (document.getElementById("incontro" + i).checked) incontriSelezionati++;
	if (incontriSelezionati === 0) {
		alert("Impossibile inviare la formazione: nessun incontro selezionato");
		return false;
	}

	// Non invia la formazione se non è corretta
	if (!ControllaFormazione()) return false;

	// Genera dati per invio formazione per ciascun incontro selezionato
	var formazioni = [];
	var datiTelegram = "";
	for (i = 1; i <= incontriDisponibili.length; ++i) {
		// Salta l'incontro (competizione) se non è selezionato
		if (!document.getElementById("incontro" + i).checked) continue;
		var ii = arrIncontri[document.getElementById("incontro" + i).value];

		// Oggetto contenente i dati della formazione
		var formazione = {
			"idIncontro" : ii.ID,
			"descrizione" : ii.Descrizione
		};

		// Genera dati per invio mail
		if (inviaEMail) {
			formazione.datiEMail = [];
			var destinatari = OttieneDestinatari(ii);
			var m;
			if (destinatari.completa.length !== 0) {
				m = GeneraEMailCompleta(ii);
				m.destinatari = destinatari.completa;
				formazione.datiEMail.push(m);
			}
			if (destinatari.ridotta.length !== 0) {
				m = GeneraEMailRidotta(ii);
				m.destinatari = destinatari.ridotta;
				formazione.datiEMail.push(m);
			}
		}

		// Genera dati per salvataggio sul sito
		if (salvaSuSito) {
			formazione.datiSalvataggio = GeneraDatiSalvataggioSuSito(ii);
		}

		// Genera dati per inoltro a Telegram
		if (inoltraATelegram) {
			datiTelegram = GeneraDatiTelegram(ii, datiTelegram);
		}

		// Aggiunge formazione
		formazioni.push(formazione);
	}
	if (datiTelegram !== "")
		formazioni[0].datiTelegram = datiTelegram;

	// Compila gli altri dati ed invia la form
	document.getElementById("fi_formazioni").value = JSON.stringify(formazioni);
	document.getElementById("fi_idSquadra").value = cFsq;
	document.getElementById("fi_giornataDiA").value = cGio;
	window.open("", "invformWindow", "width=600,height=240,screenX=20,screenY=20");

	return true;
}

/**
 * Genera e-mail completa della formazione con tutti i dati necessari per
 * l'importazione in FCM
 * @param {Object} ii Oggetto di tipo Incontro
 * @returns {Object} { subject, body } della e-mail
 */
function GeneraEMailCompleta(ii)
{
	// Ottiene nome fantasquadra e nome della competizione
	var fsq = arrFantasquadre[idxFsq].Nome;
	var cmp = ii.Competizione;
	var fsq_cmp = fsq + (incontriDisponibili.length > 1 ? " [" + cmp + "]" : "");

	// Costruisce il subject
	var oggetto = "Formazione " + fsq_cmp +", " + cmp + ", " + nomelega + " [MessaggioFrmFCM:" + cGio + "]";

	// Costruisce l'header del messaggio
	var corpo1 = "Lega: " + nomelega + "\n";
	corpo1 += "Squadra: " + fsq_cmp +"\n";
	corpo1 += "Giornata: " + ii.Fantagiornata + "\n";
	corpo1 += "Data e ora compilazione: " + DataOraCorrente() + "\n";

	// Costruisce la parte del messaggio contenente la formazione
	var corpo2 = "";
	for (var i = 1; i <= 11 + totaleNumeroMassimoRiserve; i++) {
		if (i === 1) corpo2 = "--- Titolari ---\n";
		else if (i === 12) corpo2 += "--- Riserve ---\n";
		if (arrFormazione[i] >= 0 && arrFormazione[i] < arrInvioFormazione.length) {
			var gg = arrInvioFormazione[arrFormazione[i]];
			corpo2 += ruoli[gg.Ruolo] + " " + eval(gg.Nome) + " (" + eval(gg.SquadraDiA) + ")";
			corpo2 += ii.Rigoristi ? " [R: " + arrRigoristi[i] + "]\n" : "\n";
		}
	}

	// Costruisce la terza parte del messaggio
	var corpo3 = "CODICI IDENTIFICATIVI FCM [*NON MODIFICARE*]\n";
	corpo3 += "[LEGA]=" + CorreggeNomeLega(nomelega) + "-" + stagione + "-" + anno.substr(0, 4) + "\\\n";
	corpo3 += "[IDSQUADRA]=" + cFsq + "\\\n";
	corpo3 += "[GIORNATADIA]=" + cGio + "\\\n";
	corpo3 += "[IDINCONTRO]=" + ii.ID + "\\\n";
	corpo3 += "[FRMCODE]=";
	for (i = 1; i <= 11 + totaleNumeroMassimoRiserve; i++) {
		if (arrFormazione[i] >= 0 && arrFormazione[i] < arrInvioFormazione.length) {
			gg = arrInvioFormazione[arrFormazione[i]];
			corpo3 += (i !== 1 ? "-" : "") + gg.ID;
			corpo3 += ii.Rigoristi ? "R" + arrRigoristi[i] : "";
		}
	}
	corpo3 += "\\\n\n";
	corpo3 += "Comunicazioni: " + (!nascondiComunicazioni ? document.getElementById("fi_comunicazioni").value : "");

	return {"oggetto" : oggetto, "corpo" : corpo1 + "\n" + corpo2 + "\n" + corpo3};
}

/**
 * Genera e-mail ridotta della formazione da inviare, se richiesto, ai
 * fantallenatori al posto di quella completa
 * @param {Object} ii Oggetto di tipo Incontro
 * @returns {Object} { subject, body } della e-mail
 */
function GeneraEMailRidotta(ii)
{
	// Ottiene nome fantasquadra e nome della competizione
	var fsq = arrFantasquadre[idxFsq].Nome;
	var cmp = ii.Competizione;

	// Costruisce il subject
	var oggetto = "Formazione " + fsq +", " + ii.Descrizione;

	// Costruisce l'header del messaggio
	var corpo1 = "Lega: " + nomelega + "\n";
	corpo1 += "Squadra: " + fsq + "\n";
	corpo1 += "Competizione: " + cmp + "\n";
	corpo1 += "Giornata: " + ii.Fantagiornata + "\n";
	if (ii.IDTipo !== INC_GRANPREMIO) corpo1 += "Incontro: " + ii.Nomi.Casa + " - " + ii.Nomi.Fuori + "\n";
	corpo1 += "Giornata di Serie A: " + cGio + "\n";
	corpo1 += "Data e ora compilazione: " + DataOraCorrente() + "\n";

	// Costruisce la parte del messaggio contenente la formazione
	var corpo2 = "";
	for (var i = 1; i <= 11 + totaleNumeroMassimoRiserve; i++) {
		if (i === 1) corpo2 = "--- Titolari ---\n";
		else if (i === 12) corpo2 += "--- Riserve ---\n";
		if (arrFormazione[i] >= 0 && arrFormazione[i] < arrInvioFormazione.length) {
			var gg = arrInvioFormazione[arrFormazione[i]];
			corpo2 += ruoli[gg.Ruolo] + " " + eval(gg.Nome) + " (" + eval(gg.SquadraDiA) + ")";
			corpo2 += ii.Rigoristi ? " [R: " + arrRigoristi[i] + "]\n" : "\n";
		}
	}

	// Costruisce la terza parte del messaggio
	var corpo3 = "";
	if (!nascondiComunicazioni) {
		var comunicazioni = document.getElementById("fi_comunicazioni").value;
		if (comunicazioni !== "") corpo3 = "\nComunicazioni: " + comunicazioni;
	}

	return {"oggetto" : oggetto, "corpo" : corpo1 + "\n" + corpo2 + corpo3};
}

/**
 * Controlla se la formazione inserita è corretta
 * - 11 titolari
 * - almeno una riserva per ruolo (opzionale)
 * - rigoristi non duplicati
 * - portiere 11° rigorista (opzionale)
 * @returns {Boolean} false se la formazione non rispetta le regole
 */
function ControllaFormazione()
{
	// Controlla titolari inseriti
	if (titolariInseriti !== 11) {
		alert("Impossibile inviare la formazione: uno o più titolari non inseriti");
		return false;
	}

	// Controlla ruoli delle riserve inserite
	if (regolaPanchina) {
		var ruoliSenzaRiserve = 0;
		for (var i = 1; i <= 4; ++i)
			if (riserveInserite[i] === 0) ruoliSenzaRiserve++;
		if (ruoliSenzaRiserve > totaleNumeroMassimoRiserve - totaleRiserveInserite) {
			alert("Impossibile inviare la formazione: è necessario inserire almeno una riserva per ruolo");
			return false;
		}
	}

	// Controlla numero di riserve inserite
	if (totaleRiserveInserite < totaleNumeroMassimoRiserve)
		if (!confirm("La formazione è incompleta, vuoi inviarla comunque?")) return false;

	// Determina se incontri selezionati richiedono rigoristi
	controllaRigoristi = false;
	if (!mostraRigoristi) return true;
	for (var i = 1; i <= incontriDisponibili.length && !controllaRigoristi; i++)
		if (document.getElementById("incontro" + i).checked) {
			var ii = arrIncontri[document.getElementById("incontro" + i).value];
			controllaRigoristi = ii.Rigoristi;
		}
	if (!controllaRigoristi) return true;

	// Imposta rigoristi negli oggetti di arrInvioFormazione
	for (i = 1; i <= 11 + totaleNumeroMassimoRiserve; i++)
		if (arrFormazione[i] >= 0) arrInvioFormazione[arrFormazione[i]].Rigorista = arrRigoristi[i];

	// Controlla duplicati fra i rigoristi
	for (i = 1; i <= 11 + totaleNumeroMassimoRiserve - 1; i++)
		for (var j = i + 1; j <= 11 + totaleNumeroMassimoRiserve; j++)
			if (arrFormazione[i] >= 0 && arrFormazione[j] >= 0 && arrRigoristi[i] === arrRigoristi[j]) {
				alert("Impossibile inviare la formazione: ordine rigoristi non valido (duplicato)");
				return false;
			}

	// Controlla regola dei portieri
	if (regolaRigoristi)
		for (i = 1; i <= 11 + totaleNumeroMassimoRiserve; i++)
			if (arrFormazione[i] >= 0 && arrRigoristi[i] < 11 && arrInvioFormazione[arrFormazione[i]].Ruolo === 1) {
				alert("Impossibile inviare la formazione: ordine rigoristi non valido (portiere < 11°)");
				return false;
			}

	return true;
}

/**
 * Ottiene i destinatari della mail relativi all'incontro specificato
 * @param {Object} ii Oggetto di tipo Incontro
 * @returns {Object} id dei destinatari (per i fantallenatori l'id è l'id
 * della fantasquadra, per il presidente di lega l'id è 0)
 * 	- completa: array dei destinatari di e-mail completa
 * 	- ridotta:  array dei destinatari di e-mail ridotta
 */
function OttieneDestinatari(ii)
{
	var destCompleta = [], destRidotta = [];

	// Presidente di lega
	if (destinatariEMail[0])
		destCompleta.push(0);

	// Tutti i fantallenatori, avversario, se stessi
	var idAvv = ii.IDSquadre.Casa === cFsq ? ii.IDSquadre.Fuori : ii.IDSquadre.Casa;
	for (var f = 1; f < arrFantasquadre.length; ++f) {
		var id = arrFantasquadre[f].ID;
		if (destinatariEMail[2] ||					// Tutti i fantallenatori
		destinatariEMail[1] && id === idAvv ||		// Fantallenatore avversario
		destinatariEMail[3] && id === cFsq) 		// Se stessi
			if (id !== idPresidente || !destinatariEMail[0]) {
				if (eMailRidotta)
					destRidotta.push(id);
				else
					destCompleta.push(id);
			}
	}

	return {"completa": destCompleta, "ridotta": destRidotta};
}

/**
 * Genera dati da utilizzare per il salvataggio della formazione sul sito
 * @param {Object} ii Oggetto di tipo Incontro
 * @returns {Array} array di stringhe da inserire nel file JavaScript delle
 * formazioni fcmFormazioniDati<x>.js
 */
function GeneraDatiSalvataggioSuSito(ii)
{
	// Costruisce le stringa di formazione
	var formazione = [], altri = [];
	var idLega = ii.IDSquadre.Casa === cFsq ? ii.IDLegaSquadre.Casa : ii.IDLegaSquadre.Fuori;
	for (var i = 0; i < arrRosa.length; i++) {
		var gg = arrInvioFormazione[arrRosa[i]];
		if (gg.Formazione === 0)
			altri.push(ii.ID + "," + cFsq + "," + idLega + "," + gg.Nome + "," + gg.SquadraDiA + "," + gg.Ruolo + ",-1,0");
		else {
			var pos = gg.Formazione <= 11 ? 0 : gg.Formazione - 11;
			formazione[gg.Formazione - 1] = ii.ID + "," + cFsq + "," + idLega + "," + gg.Nome + "," + gg.SquadraDiA + "," + gg.Ruolo + "," + pos + "," + (ii.Rigoristi ? gg.Rigorista : 0);
		}
	}

	return formazione.concat(altri);
}

/**
 * Genera messaggio da inoltrare alla chat Telegram.
 * Il messaggio è unico per tutte le competizioni. Nome della fatasquadra,
 * modulo e formazioni vengono inseriti la prima volta che viene richiamata
 * la funzione, le successive volte vengono aggiunti i dettagli della
 * competizione.
 * @param {Object} ii Oggetto di tipo Incontro
 * @param {String} messaggio Corpo del messaggio da inviare
 * @returns {String} Corpo del messaggio modificato
 */
function GeneraDatiTelegram(ii, messaggio)
{
	if (messaggio.length === 0) {
		// Nome fantasquadra e modulo
		var intestazione = "*" + arrFantasquadre[idxFsq].Nome.toUpperCase() + "*";
		intestazione += " (" + moduloInserito[2] + "-" + moduloInserito[3] + "-" + moduloInserito[4] + ")\n";

		// Titolari divisi per ruolo
		var titolari = "";
		var ruolo = 0;
		for (var i = 1; i <= 11; i++) {
			var gg = arrInvioFormazione[arrFormazione[i]];
			if (gg.Ruolo !== ruolo) titolari += "\n*" + ruoli[gg.Ruolo] + ")* ";
			else titolari += ", ";
			titolari += OttieneNomeGiocatoreRidotto(gg);
			if (controllaRigoristi) titolari += " [R:" + gg.Rigorista + "]";
			ruolo = gg.Ruolo;
		}

		// Elenco riserve
		var riserve = "";
		ruolo = 0;
		for (var i = 12; i <= 11 + totaleNumeroMassimoRiserve; i++)
			if (arrFormazione[i] >= 0) {
				var gg = arrInvioFormazione[arrFormazione[i]];
				if (riserve.length === 0) riserve = "\n\n*Panchina:* ";
				else {
					if (panchinaOrdinata && gg.Ruolo !== ruolo) riserve += '; ';
					else riserve += ', ';
				}
				riserve += OttieneNomeGiocatoreRidotto(gg);
				if (controllaRigoristi) riserve += " [R:" + gg.Rigorista + "]";
				ruolo = gg.Ruolo;
			}
		messaggio = intestazione + titolari + riserve;
	}

	// Inserisce nome competizione ed incontro subito dopo il nome della
	// fantasquadra
	var competizione = "\n\u2022 _" + ii.Competizione + ": " + ii.Fantagiornata + "_\n";
	if (ii.IDTipo !== INC_GRANPREMIO) competizione += "    _" + ii.Nomi.Casa + " - " + ii.Nomi.Fuori + "_\n";
	i = messaggio.indexOf("\n\n");
	if (i >= 0) messaggio = messaggio.substring(0, i) + competizione + messaggio.substr(i + 1);

	return messaggio;
}

/**
 * Ritorna data e ora corrente nel formato gg/mm/yyyy hh.mm.ss
 * @returns {String}
 */
function DataOraCorrente()
{
	var dataOra = new Date();

	var g = "0" + dataOra.getDate();
	g = g.substr(g.length - 2, 2);
	var m = "0" + (dataOra.getMonth() + 1);
	m = m.substr(m.length - 2, 2);
	var a = "000" + dataOra.getFullYear();
	a = a.substr(a.length - 4, 4);

	var hh = "0" + dataOra.getHours();
	hh = hh.substr(hh.length - 2, 2);
	var mm = "0" + dataOra.getMinutes();
	mm = mm.substr(mm.length - 2, 2);
	var ss = "0" + dataOra.getSeconds();
	ss = ss.substr(ss.length - 2, 2);

	return g + "/" + m + "/" + a + " " + hh + "." + mm + "." + ss;
}

/**
 * Ritorna nome della Lega modificato, in modo che i caratteri *, ", ', \, /,
 * :, |, ? siano sostituiti con _
 * @param {String} nome Nome della lega
 * @returns {String}
 */
function CorreggeNomeLega(nome)
{
	return nome.replace(/[*"'\\\/:|?]/g, "_");
}

/**
 * Ritorna nome del giocatore composto dal solo cognome e dalla parte del
 * nome necessaria per distinguerlo da gli altri della fantasquadra
 * @param {Object} gg Oggetto ifG
 * @returns {String}
 */
function OttieneNomeGiocatoreRidotto(gg)
{
	var nome = eval(gg.Nome), nomeUp = nome.toUpperCase();

	// Ottiene nome ridotto candidato (cognome)
	for (var e = 0; e < nome.length && nome[e] === nomeUp[e]; e++);
	e = nomeUp.lastIndexOf(" ", e);

	// Confronta con tutti gli altri giocatori della rosa ed eventualmente
	// "allunga" nome ridotto finché non risulta unico
	do {
		var nomeRid = nomeUp.substring(0, e);
		var unico = true;
		for (var i = 0; i < arrRosa.length && unico; i++) {
			var ggCmp = arrInvioFormazione[arrRosa[i]];
			if (ggCmp.ID === gg.ID) continue;
			var nomeCmp = eval(ggCmp.Nome).toUpperCase();
			if (nomeCmp.startsWith(nomeRid)) unico = false;
		}
	} while (!unico && ++e < nome.length);

	// Ritorna nome del giocatore con le iniziali maiuscole
	return nome.substring(0, e).toLowerCase().replace(/\b\w/g, function(l) { return l.toUpperCase(); });
}

/**
 * Formatta data ora termine invio
 * @returns {String}
 */
function FormattaDataOraTermineInvio()
{
	var options = { weekday: 'long', month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
	return termineInvio.dataOraTermine.toLocaleString('it-IT', options);
}

/**
 * Aggiorna tempo rimasto per l'invio della formazione
 */
function AggiornaTempoRimasto()
{
	var text;
	var s = (termineInvio.dataOraTermine - new Date() - termineInvio.offsetServer) / 1000;
	if (s > 0) {
		var gg = (s / 86400) | 0;
		var hh = ((s % 86400) / 3600) | 0;
		var mm = ((s % 3600) / 60) | 0;
		var ss = (s % 60) | 0;
		text = "- " + (gg > 0 ? gg + " giorni " : "");
		text += (hh < 10 ? "0" : "") + hh + ":" + (mm < 10 ? "0" : "") + mm + ":" + (ss < 10 ? "0" : "") + ss;
	}
	else {
		text = "Termine invio scaduto";
		clearInterval(termineInvio.funzione);
	}

	var el = document.getElementById('tempoRimasto');
	el.innerText = text;
	if (s < 300) el.className = "t-xxsRB";
}
