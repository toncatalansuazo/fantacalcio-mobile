<?php

/**
 * invform.php (ex sendmail.php)
 *
 * @author Marcello 'John Doe' Puri
 * @copyright Copyright (C) 2005-2023 Marcello 'John Doe' Puri
 * @license http://www.gnu.org/copyleft/gpl.html GNU General Public License
 * @version 2.3.0 (13/05/2023)
 */

require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
require 'PHPMailer/Exception.php';
require 'TelegramBotPHP/Telegram.php';
require 'invform.inc.php';

use PHPMailer\PHPMailer\PHPMailer;

/**
 * @global string FIRMA
 */
const FIRMA = '<p><b>invform.php versione 2.3.0</b><br /><span class="t-xs">Copyright &copy; 2005-2023 johndoe</span></p>';

/**
 * Script principale
 */
$azione = isset($_REQUEST['azione']) ? $_REQUEST['azione'] : '';
if ($azione == 'ottieneTermine')
	restituisceTermine();
else {
	print <<<EOT
<html lang="it">
<head>
<title>Invio formazione</title>
<meta http-equiv="content-type" content="text/html; charset=iso-8859-1">
<link href="../fcm.css" rel="stylesheet" type="text/css">
<script type="text/javascript">
	window.addEventListener('load', function() {
		window.resizeTo(window.outerWidth, document.documentElement.scrollHeight + (window.outerHeight - window.innerHeight));
	});
</script>
</head>
<body>
<div id="container"
<br>
<div class="dxcont">
<h2 class="titletext">Invio formazione</h2>
EOT;
	if ($azione === 'inviaFormazione')
		inviaFormazione();
	else {
		print(FIRMA);
		if (!extension_loaded('curl'))
			print("<p style='color: red'>Estensione cURL non rilevata</p>");
		if (!extension_loaded('openssl'))
			print("<p style='color: red'>Estensione OpenSSL non rilevata</p>");
	}

	print <<<EOT
</div>
<p style="text-align:center"><a id="close" href="#" onclick="window.close(); return false;">chiudi</a></p>
</div>
</body>
</html>
EOT;
}

/**
 * Esegue tutte le operazioni configurate per la formazione:
 * - invio e-mail
 * - salvataggio su sito
 * - inoltro a Telegram
 */
function inviaFormazione()
{
	global $passwords, $controllaOrarioInvio, $inviaEMail, $destinatariEMail,
		   $salvaSuSito, $inoltraATelegram;

	$idSquadra = isset($_REQUEST['idSquadra']) ? $_REQUEST['idSquadra'] : 0;
	$giornataDiA = isset($_REQUEST['giornataDiA']) ? $_REQUEST['giornataDiA'] : 0;
	$password = isset($_REQUEST['password']) ? $_REQUEST['password'] : '';
	$formazioni = isset($_REQUEST['formazioni']) ? json_decode($_REQUEST['formazioni'], TRUE) : NULL;

	try {
		if (!isset($passwords[$idSquadra]) || crypt($password, $passwords[$idSquadra]) != $passwords[$idSquadra])
			throw new Exception('Password non valida');

		if (empty($giornataDiA) || empty($formazioni))
			throw new Exception('Parametri formazione non validi');

		if ($controllaOrarioInvio) {
			$t = ottieneTermine($giornataDiA);
			if ($t === false)
				throw new Exception('Impossibile determinare termine invio');
			if ($t['secondiRimasti'] < 0) {
				setlocale(LC_TIME, 'it_IT');
				$s = strftime('%A %d/%m/%y, %H:%M', $t['dataOraTermine']->getTimestamp());
				throw new Exception("Termine invio scaduto ($s)");
			}
		}

		$mailer = NULL;
		foreach ($formazioni as $f) {
			print('<p><b>' . html($f['descrizione']) . "</b>\n");
			if ($inviaEMail && isset($f['datiEMail'])) {
				foreach ($f['datiEMail'] as $m) {
					$nomi = []; $indirizzi = [];
					foreach ($destinatariEMail as $id => $d) {
						if (!in_array($id, $m['destinatari'])) continue;
						$i = PHPMailer::parseAddresses($d['indirizzo'], true, PHPMailer::CHARSET_UTF8);
						if (!empty($i)) {
							$indirizzi = array_merge($indirizzi, $i);
							$i = array_map(function($a) { return html($a['address']); }, $i);
							$nomi[] = '<i>' . html($d['nome']) . ' (' . join(', ', $i) . ')</i>';
						}
					}
					if (!empty($indirizzi)) {
						$errore = inviaEMail($mailer, $indirizzi, $m['oggetto'], $m['corpo']);
						visualizzaRisultato('invio e-mail a ' . join(', ', $nomi), $errore);
					}
				}
			}
			if ($salvaSuSito && isset($f['datiSalvataggio'])) {
				$errore = salvaSuSito($idSquadra, $giornataDiA, $f['idIncontro'], $f['datiSalvataggio']);
				visualizzaRisultato('salvataggio sul sito', $errore);
			}
			if ($inoltraATelegram && isset($f['datiTelegram'])) {
				$errore = inoltraATelegram($f['datiTelegram']);
				visualizzaRisultato('inoltro a Telegram', $errore);
			}
			print('</p>');
		}
	}
	catch (Exception $e) {
		print("<h2 style=\"color:red\">&#9888; {$e->getMessage()}</h2>");
	}
}

/**
 * Restituisce come oggetto JavaScript i dati relativi al termine d'invio
 */
function restituisceTermine()
{
	global $controllaOrarioInvio;

	if ($controllaOrarioInvio) {
		$giornataDiA = isset($_REQUEST['giornataDiA']) ? $_REQUEST['giornataDiA'] : 0;
		$t = ottieneTermine($giornataDiA);
		$termineInvio = $t === false ? 'false' : json_encode(array(
			'dataOraTermine' => $t['dataOraTermine']->format(DATE_ATOM),
			'dataOraServer' => $t['dataOraServer']->format(DATE_ATOM),
			'secondiRimasti' => $t['secondiRimasti']
		));
		print("termineInvio=$termineInvio;\n");
	}
}

/**
 * Invia e-mail della formazione
 *
 * @param object|null $mailer oggetto PHPMailer da creare o da riutilizzare
 * @param array $destinatari destinatari
 * @param string $oggetto oggetto della e-mail
 * @param string $corpo corpo della e-mail
 * @return string messaggio d'errore
 */
function inviaEMail(&$mailer, $destinatari, $oggetto, $corpo)
{
	global $servizioEMail, $mittenteEMail, $hostSmtp, $usernameSmtp, $passwordSmtp;

	try {
		$m = PHPMailer::parseAddresses($mittenteEMail, true, PHPMailer::CHARSET_ISO88591);
		if (empty($m)) throw new Exception('Indirizzo mittente non valido');
		if ($mailer == NULL) {
			$mailer = new PHPMailer(true);
			if ($servizioEMail == 1) {
				$mailer->IsSMTP();
				$mailer->SMTPKeepAlive = true;
				$mailer->Host = $hostSmtp;
				if (!empty($usernameSmtp)) {
					$mailer->SMTPAuth = true;
					$mailer->Username = $usernameSmtp;
					$mailer->Password = $passwordSmtp;
				}
			}
			$mailer->setFrom($m[0]['address'], $m[0]['name']);
		}
		$mailer->ClearAddresses();
		foreach ($destinatari as $d)
			$mailer->addAddress($d['address'], $d['name']);
		$mailer->Subject = $oggetto;
		$mailer->Body = $corpo;
		$mailer->Send();
		return '';
	}
	catch (Exception $e) {
		return "Errore durante durante l'invio della e-mail ({$e->getMessage()})";
	}
}

/**
 * Salva formazione sul sito
 *
 * @param integer $idSquadra id della fantasquadra
 * @param integer $giornataDiA giornata di A
 * @param integer $idIncontro id dell'incontro
 * @param string[] $righeNuovaFormazione righe della formazione da inserire
 *	nel file JavaScript delle formazioni
 * @return string messaggio d'errore
 */
function salvaSuSito($idSquadra, $giornataDiA, $idIncontro, $righeNuovaFormazione)
{
	if (($fp = fopen("../js/fcmFormazioniDati$giornataDiA.js", 'r+')) == false)
		return 'Impossibile aprire il file delle formazioni';

	try {
		if (!flock($fp, LOCK_EX))
			throw new Exception('Impossibile bloccare il file delle formazioni');

		$righeStatiche = array();
		$righeFormazioniEsistenti = array();
		while (($r = fgets($fp)) !== false) {
			if (empty($r = trim($r)))
				continue;
			if (!preg_match('/^a\[\d+]=new Z\((\d+),(\d+),([^)]+)\)/', $r, $m))
				$righeStatiche[] = $r;
			else if ($m[1] != $idIncontro || $m[2] != $idSquadra)
				$righeFormazioniEsistenti[] = "$m[1],$m[2],$m[3]";
		}

		if (!ftruncate($fp, 0) || !rewind($fp))
			throw new Exception('Errore durante la scrittura del file delle formazioni');

		foreach ($righeStatiche as $r)
			if (fputs($fp, "$r\r\n") === false)
				throw new Exception('Errore durante la scrittura del file delle formazioni');
		foreach (array_merge($righeFormazioniEsistenti, $righeNuovaFormazione) as $i => $r) {
			$i++;
			if (fputs($fp, "a[$i]=new Z($r)\r\n") === false)
				throw new Exception('Errore durante la scrittura del file delle formazioni');
		}
		return '';
	}
	catch (Exception $e) {
		return $e;
	}
	finally {
		flock($fp, LOCK_UN);
		fclose($fp);
	}
}

/**
 * Inoltra formazione alla chat Telegram
 *
 * @param string $messaggio messaggio da inoltrare
 * @return string messaggio di errore
 */
function inoltraATelegram($messaggio)
{
	global $chatIdTelegram, $tokenBotTelegram;

	$telegram = new Telegram($tokenBotTelegram, false);
	$data = [
		'chat_id' => $chatIdTelegram,
		'text' => $messaggio,
		'parse_mode' => 'Markdown',
	];
	$risp = $telegram->sendMessage($data);
	if (!isset($risp['ok']))
		return 'Risposta non valida';
	if ($risp['ok'] === false)
		return isset($risp['description']) ? $risp['description'] : $risp['curl_error'];
	return '';
}

/**
 * Restituisce oggetto contenente i dati di termine invio relativi alla giornata di A specificata
 *
 * @param integer $giornataDiA giornata di A
 * @return array|false oggetto termine invio o FALSE in caso d'errore
 */
function ottieneTermine($giornataDiA)
{
	global $orariInizio, $anticipoInvio;

	try {
		if (!isset($orariInizio[$giornataDiA]))
			throw new Exception('Orario di termine non disponibile');
		$dataOraTermine = new DateTime($orariInizio[$giornataDiA], new DateTimeZone('Europe/Rome'));
		$termine['dataOraTermine'] = $dataOraTermine->sub(new DateInterval("PT{$anticipoInvio}M"));
		$termine['dataOraServer'] = new DateTime('now', new DateTimeZone('Europe/Rome'));
		$termine['secondiRimasti'] = $dataOraTermine->getTimestamp() - $termine['dataOraServer']->getTimestamp();
		return $termine;
	}
	catch (Exception $e) {
		return false;
	}
}

/**
 * Visualizza risultato di un'operazione
 *
 * @param string $operazione descrizione dell'operazione
 * @param string $errore risultato dell'operazione ('' in caso di esito positivo)
 */
function visualizzaRisultato($operazione, $errore)
{
	$s = '<br>';
	$s .= !empty($errore) ? '<span style="color:red">&#x274c; </span>' : '<span style="color:blue">&#x2714; </span>';
	$s .= ' ' . $operazione;
	if (!empty($errore)) $s .= '<span style="color:red"> &#9654; ' . html($errore) . '</span>';
	print("$s\n");
}

/**
 * Converte una stringa nella sua rappresentazione HTML
 *
 * @param string $s stringa da convertire
 * @return string stringa convertita
 */
function html($s)
{
	return htmlentities($s, ENT_QUOTES | ENT_SUBSTITUTE | ENT_HTML401, "ISO-8859-1");
}
