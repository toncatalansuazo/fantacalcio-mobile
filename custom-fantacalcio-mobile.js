var txxsRowsPlayers;
var players = [];
var startingLineUp = [];
var currentRoleFilter = "";

function getPlayerInfoFromRoleTdElement(tdElement) {
  const playerRole = tdElement.querySelector("span").textContent;
  // Get the value of the ID attribute of the <span>
  const spanRoleIdElement = tdElement.querySelector("span").id;
  const playerId = spanRoleIdElement.valueOf().replaceAll("r_ruolo", "");

  return { playerRole, spanRoleIdElement, playerId };
}

function getPlayerInfoFromNameTdElement(tdElement) {
  const playerNameAndTeamName = tdElement.querySelector("span").textContent;
  const start = playerNameAndTeamName.indexOf("(");
  const playerName = playerNameAndTeamName.substr(0, start);
  const teamPlayerName = playerNameAndTeamName
    .substr(start, playerNameAndTeamName.length)
    .replace("(", "")
    .replace(")", "");

  return { playerName, teamPlayerName };
}

function getPlayerAff(tdElement) {
  return tdElement.textContent;
}

function getPlayerMtv(tdElement) {
  return tdElement.textContent;
}

function getPlayerAff(tdElement) {
  return tdElement.textContent;
}

function getPlayerMvu(tdElement) {
  return tdElement.textContent;
}

function getPlayerFmu(tdElement) {
  return tdElement.textContent;
}

function getOponentTeamName(tdElement) {
  return tdElement.textContent;
}

function displayPlayerInSoccerField(
  elementIdToPlacePlayer,
  playerFieldHtml,
  atrrId
) {
  const containerPlayerElment = document.createElement("div");
  containerPlayerElment.classList.add("container");
  containerPlayerElment.innerHTML = playerFieldHtml;
  containerPlayerElment.setAttribute("id", atrrId);
  const fieldGoalKeeperElement = document.getElementById(
    elementIdToPlacePlayer
  );
  fieldGoalKeeperElement.appendChild(containerPlayerElment);
}

function isFormationValid(
  goalkeeper = 0,
  defenders = 0,
  midfielders = 0,
  forwards = 0
) {
  const formations = [
    { goalkeeper: 1, defenders: 3, midfielders: 4, forwards: 3 },
    { goalkeeper: 1, defenders: 3, midfielders: 5, forwards: 2 },
    { goalkeeper: 1, defenders: 3, midfielders: 6, forwards: 1 },
    { goalkeeper: 1, defenders: 4, midfielders: 3, forwards: 3 },
    { goalkeeper: 1, defenders: 4, midfielders: 4, forwards: 2 },
    { goalkeeper: 1, defenders: 4, midfielders: 5, forwards: 1 },
    { goalkeeper: 1, defenders: 5, midfielders: 2, forwards: 3 },
    { goalkeeper: 1, defenders: 5, midfielders: 3, forwards: 2 },
    { goalkeeper: 1, defenders: 5, midfielders: 4, forwards: 1 },
    { goalkeeper: 1, defenders: 6, midfielders: 1, forwards: 3 },
    { goalkeeper: 1, defenders: 6, midfielders: 2, forwards: 2 },
    { goalkeeper: 1, defenders: 6, midfielders: 3, forwards: 1 },
    { goalkeeper: 1, defenders: 3, midfielders: 3, forwards: 4 },
    { goalkeeper: 1, defenders: 4, midfielders: 2, forwards: 4 },
  ];
  return (
    formations.filter(
      (formation) =>
        formation.goalkeeper >= goalkeeper &&
        formation.defenders >= defenders &&
        formation.midfielders >= midfielders &&
        formation.forwards >= forwards
    ).length > 0
  );
}

function countByPlayerRole(playerSelected) {
  let goalkeeper = 0;
  let defenders = 0;
  let midfielders = 0;
  let forwards = 0;

  for (let i = 0; i < playerSelected.length; i++) {
    const player = playerSelected[i];
    switch (player.role) {
      case "P":
        goalkeeper++;
        break;
      case "D":
        defenders++;
        break;
      case "C":
        midfielders++;
        break;
      case "A":
        forwards++;
        break;
      default:
        console.error(`player role not identidied. role = ${player.role}`);
        break;
    }
  }
  return { goalkeeper, defenders, midfielders, forwards };
}
/* 
  Valid formations
    * 3-4-3 / 3-5-2 / 3-6-1
    * 4-3-3 / 4-4-2 / 4-5-1
    * 5-2-3 / 5-3-2 / 5-4-1
    * 6-1-3 / 6-2-2 / 6-3-1
    * 3-3-4 / 4-2-4
*/
function canAddPlayer(player) {
  let possibleStartingLineUp = Object.assign([], startingLineUp);
  possibleStartingLineUp.push(player);
  const { goalkeeper, defenders, midfielders, forwards } = countByPlayerRole(
    possibleStartingLineUp
  );
  return isFormationValid(goalkeeper, defenders, midfielders, forwards);
}

const RoleType = {
  Goalkeeper: "P",
  Defender: "D",
  Midfielders: "C",
  Forwad: "A",
};

function getPlayerAttrIdSoccerField(player) {
  return `soccer-field-player-id-${player.id}`;
}

function addToSoccerField(player) {
  console.log(`add to soccer field`);
  const playerElementIdattrSoccerField = getPlayerAttrIdSoccerField(player);
  const roleClassMap = {
    P: {
      cssClass: "circle-goalkeeper",
      elementId: "field-goalkeeper",
      atrrId: playerElementIdattrSoccerField,
    },
    D: {
      cssClass: "circle-defender",
      elementId: "field-defenders",
      atrrId: playerElementIdattrSoccerField,
    },
    C: {
      cssClass: "circle-midfielder",
      elementId: "field-midfielders",
      atrrId: playerElementIdattrSoccerField,
    },
    A: {
      cssClass: "circle-forwarder",
      elementId: "field-forwards",
      atrrId: playerElementIdattrSoccerField,
    },
  };
  const playerAttributes = roleClassMap[player.role];
  const playerFieldHtml = `
  <ion-icon class="circle ${playerAttributes.cssClass}"
    id="player-soccer-field-${player.id}"
    size="large" color="primary" name="ellipse">
  </ion-icon>
  <div class="player-info"> ${player.name}</div>
  `;

  displayPlayerInSoccerField(
    playerAttributes.elementId,
    playerFieldHtml,
    playerAttributes.atrrId
  );
}
function displaySendButton() {
  if (startingLineUp.length === 11) {
    console.log(`display sent button`);
  }
}
async function presentAlert({
  header = "Alert",
  subHeader = "",
  message = "",
  buttons = ["OK"],
}) {
  const alert = document.createElement("ion-alert");
  alert.header = header;
  alert.subHeader = subHeader;
  alert.message = message;
  alert.buttons = buttons;

  document.body.appendChild(alert);
  await alert.present();
}
function addPlayerToLineUp(player) {
  const playerItemElement = getPlayerItemElement(player.id);
  const playerIndex = startingLineUp.findIndex((p) => p.id === player.id);
  const isAlreadyAdded = playerIndex !== -1;
  if (isAlreadyAdded) {
    removePlayerFromLineUp(player, playerIndex);
    return;
  }
  if (!canAddPlayer(player)) {
    presentAlert({
      header: `Modulo non valido`,
      message: `Rimuove uno dei giocatore con ruolo ${player.role} se vuoi inserire questo giocatore`,
    });
    return;
  }
  startingLineUp.push(player);
  playerItemElement.setAttribute("color", "secondary");
  addToSoccerField(player);
  displayCurrentFormation();
  displaySendButton();
  ClickGiocatoreRosa(player.id);
}

function displayCurrentFormation() {
  const { defenders, midfielders, forwards } =
    countByPlayerRole(startingLineUp);
  const currentFormationElement = document.getElementById(`current-formation`);
  const formationElement = document.createElement("div");
  formationElement.classList.add("formation");
  formationElement.innerHTML = `<div class="current-formation">${defenders} - ${midfielders} - ${forwards}</div>`;
  currentFormationElement.textContent = "";
  currentFormationElement.appendChild(formationElement);
}

/**
 * @param positionId is the position in which it was added to the starting lineup
 * for example if this was selected by 3er the position Id should be 3
 * if was the first one in be selected it should be 1
 */
function removePlayerFromLineUp(player, positionId) {
  const playerItemElement = getPlayerItemElement(player.id);
  playerItemElement.removeAttribute("color");
  startingLineUp.splice(positionId, 1);
  removeFromSoccerField(player);
  displayCurrentFormation();
  ClickGiocatoreFormazione(positionId);
}
function removeFromSoccerField(player) {
  const soccerPlayerId = getPlayerAttrIdSoccerField(player);
  document.getElementById(soccerPlayerId).remove();
}

function onLoadSuccess(table) {
  txxsRowsPlayers = table.querySelectorAll("tr.t-xxs");
  // console.log(txxsRowsPlayers.length)
  // Now, txxsRowsPlayers contains all the <tr> elements with class "t-xxs"
  // You can loop through them or perform any other operations you need
  for (let i = 0; i < txxsRowsPlayers.length; i++) {
    const roleTd = txxsRowsPlayers[i].querySelectorAll("td")[0];
    const { playerRole, spanRoleIdElement, playerId } =
      getPlayerInfoFromRoleTdElement(roleTd);

    const nameTd = txxsRowsPlayers[i].querySelectorAll("td")[1];
    const { playerName, teamPlayerName } =
      getPlayerInfoFromNameTdElement(nameTd);

    const affTd = txxsRowsPlayers[i].querySelectorAll("td")[2];
    const affValue = getPlayerAff(affTd);

    const mvtTd = txxsRowsPlayers[i].querySelectorAll("td")[3];
    const mvtValue = getPlayerMtv(mvtTd);

    const fmtTd = txxsRowsPlayers[i].querySelectorAll("td")[4];
    const fmtValue = getPlayerAff(fmtTd);

    const mvuTd = txxsRowsPlayers[i].querySelectorAll("td")[5];
    const mvuValue = getPlayerMvu(mvuTd);

    const fmuTd = txxsRowsPlayers[i].querySelectorAll("td")[6];
    const fmuValue = getPlayerFmu(fmuTd);

    const oponentTeamTd = txxsRowsPlayers[i].querySelectorAll("td")[7];
    const oponentTeamName = getOponentTeamName(oponentTeamTd);

    const player = {
      id: playerId,
      role: (playerRole || "").trim(),
      spanRoleIdElement,
      name: playerName,
      teamPlayerName,
      oponentTeamName,
      affValue,
      mvtValue,
      fmtValue,
      mvuValue,
      fmuValue,
      getStats: function () {
        return `Aff: ${this.affValue} MVt: ${this.mvtValue} FMt: ${this.fmtValue} MVu: ${this.mvuValue} FMu: ${this.fmuValue}`;
      },
    };
    players.push(player);
  }
}

function displayPlayers(position) {
  console.log(`display positions ` + position);
}

function addFilterPlayerButtons() {
  const filterElement = document.getElementById("filter-actions");
  const filters = [
    { name: "TUTTI", key: "T" },
    { name: "PORTIERE", key: "P" },
    { name: "DIFENSORE", key: "D" },
    { name: "CENTRO", key: "C" },
    { name: "ATTACANTE", key: "A" },
  ];
  try {
    filters.forEach((filter) => {
      const btn = document.createElement("ion-button");
      btn.textContent = filter.name;
      btn.classList.add("button");
      btn.setAttribute("size", "small");
      btn.addEventListener("click", () => filterPlayerByRole(filter.key));
      filterElement.appendChild(btn);
    });
  } catch (error) {
    console.log("add filter ", error);
  }
}

function createPlayerIonItem(
  player,
  playerName,
  role,
  teamName,
  oponentTeamName,
  stats,
  imageUrl,
  id
) {
  // Create ion-item
  const ionItem = document.createElement("ion-item");

  // Create ion-label
  const ionLabel = document.createElement("ion-label");

  // Create image element
  const img = document.createElement("img");
  img.classList.add("player__team-icon");
  img.src = imageUrl;
  img.alt = "";
  img.style = "margin: auto 6px auto auto;max-width:20%";

  // Create h2 element for player name
  const h2 = document.createElement("h2");
  h2.textContent = playerName + " - " + teamName;

  // Create p element for stats
  const p = document.createElement("p");
  p.textContent = player.getStats() + ` avv: ${oponentTeamName}`;

  const playerInfoElement = document.createElement("div");
  playerInfoElement.setAttribute("style", "width: 100%;");
  playerInfoElement.appendChild(h2);
  playerInfoElement.appendChild(p);
  // Append elements to ion-label
  ionLabel.appendChild(img);
  ionLabel.appendChild(playerInfoElement);
  ionLabel.setAttribute("style", "display: flex");

  // Append ion-label to ion-item
  ionItem.appendChild(ionLabel);
  ionItem.setAttribute("id", `player-item-${player.id}`);

  ionItem.addEventListener("click", () => addPlayerToLineUp(player));
  return ionItem;
}

function getPlayerItemElement(playerId) {
  return document.getElementById(`player-item-${playerId}`);
}

function filterPlayerByRole(role) {
  console.log(`filterPlayerByRole`);
  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    if (player.role === role || role === "T") {
      showPlayer(player);
    } else {
      hidePlayer(player);
    }
  }
}

function hidePlayer(player) {
  const playerIonItem = getPlayerItemElement(player.id);
  playerIonItem.setAttribute("style", "display: none");
}

function showPlayer(player) {
  const playerIonItem = getPlayerItemElement(player.id);
  playerIonItem.removeAttribute("style");
}

function addPlayersList() {
  const playerListElement = document.getElementById("players-list");
  players.forEach((player) => {
    const playerItem = createPlayerIonItem(
      player,
      player.name,
      player.role,
      player.teamPlayerName,
      player.oponentTeamName,
      `Aff: ${player.affValue} MVt: ${player.mvtValue} FMt: ${player.fmtValue} MVu: ${player.mvuValue} FMu: ${player.fmuValue}`,
      `https://fantacalciochiampo.it/fcm/aaadati/img/sq/${player.teamPlayerName}.gif`,
      player.id
    );

    // Add the created ion-item to the DOM
    playerListElement.appendChild(playerItem);
  });
}

function listenSendFormationBtn() {
  const btnSendFormation = document.getElementById("send-formation-btn");
  btnSendFormation.addEventListener("click", ($event) => {
    console.log("click send formation");
  });
}

function cancel() {
  modal.dismiss(null, "cancel");
}

function confirm() {
  const input = document.querySelector("ion-input");
  modal.dismiss(input.value, "confirm");
}

function onLoad() {
  var modal = document.querySelector("ion-modal");
  console.log("loaded");
  // Get a reference to the table element by its ID
  let table = document.getElementById("tabellaDati");
  if (table != null) {
    onLoadSuccess(table);
    addFilterPlayerButtons();
    addPlayersList();
    listenSendFormationBtn();

    modal.present();
  } else {
    setTimeout(() => onLoad(), 100);
  }
}
