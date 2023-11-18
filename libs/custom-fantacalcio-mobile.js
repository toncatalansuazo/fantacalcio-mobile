var txxsRowsPlayers;
/**
 * {
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
      
 */
var players = [];
var startingLineUp = [];
var reservePlayers = [];
var currentRoleFilter = "";
var isLoaded = false;
var retriesToShowPage = 10;
var mobileVersionLoaded = false;
var intervalRemainingTimeId;
// v20231115

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
  // const formations = [
  //   { goalkeeper: 1, defenders: 3, midfielders: 4, forwards: 3 },
  //   { goalkeeper: 1, defenders: 3, midfielders: 5, forwards: 2 },
  //   { goalkeeper: 1, defenders: 3, midfielders: 6, forwards: 1 },
  //   { goalkeeper: 1, defenders: 4, midfielders: 3, forwards: 3 },
  //   { goalkeeper: 1, defenders: 4, midfielders: 4, forwards: 2 },
  //   { goalkeeper: 1, defenders: 4, midfielders: 5, forwards: 1 },
  //   { goalkeeper: 1, defenders: 5, midfielders: 2, forwards: 3 },
  //   { goalkeeper: 1, defenders: 5, midfielders: 3, forwards: 2 },
  //   { goalkeeper: 1, defenders: 5, midfielders: 4, forwards: 1 },
  //   { goalkeeper: 1, defenders: 6, midfielders: 1, forwards: 3 }, // is it ok?
  //   { goalkeeper: 1, defenders: 6, midfielders: 2, forwards: 2 },
  //   { goalkeeper: 1, defenders: 6, midfielders: 3, forwards: 1 },
  //   { goalkeeper: 1, defenders: 3, midfielders: 3, forwards: 4 },
  //   { goalkeeper: 1, defenders: 4, midfielders: 2, forwards: 4 },
  // ];
  const formations = [
    { goalkeeper: 1, defenders: 3, midfielders: 3, forwards: 4 },
    { goalkeeper: 1, defenders: 4, midfielders: 3, forwards: 3 },
    { goalkeeper: 1, defenders: 4, midfielders: 4, forwards: 2 },
    { goalkeeper: 1, defenders: 4, midfielders: 5, forwards: 1 },
    { goalkeeper: 1, defenders: 5, midfielders: 3, forwards: 2 },
    { goalkeeper: 1, defenders: 5, midfielders: 4, forwards: 1 },
    { goalkeeper: 1, defenders: 6, midfielders: 3, forwards: 1 },
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

  players.filter((p) => p.id !== player.id);
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

function addPlayer(player) {
  startingLineUp.push(player);
  const idsSelected = startingLineUp.map((p) => p.id);
  reservePlayers = players.filter((p) => !idsSelected.includes(p.id));
  if (startingLineUp.length === 11) {
    presentReserveModal();
  }
}
function createReserveItemElement(player) {
  var ionItem = document.createElement("ion-item");
  // Create the ion-label element and set its text content
  var ionLabel = document.createElement("ion-label");
  ionLabel.textContent = player.name;
  // Create the ion-reorder element and set its slot attribute to "end"
  var ionReorder = document.createElement("ion-reorder");
  ionReorder.setAttribute("slot", "end");

  // Append ionLabel and ionReorder as children to ionItem
  ionItem.appendChild(ionLabel);
  ionItem.appendChild(ionReorder);
  return ionItem;
}
function displayReservePlayers() {
  const reservePlayerList = document.querySelector(
    "ion-reorder-group#reseve-list"
  );
  console.log("displaying", reservePlayers);
  for (let i = 0; i < reservePlayers.length; i++) {
    const reservePlayer = reservePlayers[i];
    reservePlayerList.appendChild(createReserveItemElement(reservePlayer));
  }
}
function clearReservePlayers() {
  const reservePlayerList = document.querySelector(
    "ion-reorder-group#reseve-list"
  );
  reservePlayerList.innerHTML = ``;
}
function addPlayerToLineUp(player, callClickGiocatoreRosa = true) {
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
  } else {
    addPlayer(player);
    playerItemElement.setAttribute("color", "secondary");
    addToSoccerField(player);
    displayCurrentFormation();

    if (callClickGiocatoreRosa) {
      ClickGiocatoreRosa(player.id);
    }
  }
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

function removePlayer(positionId) {
  startingLineUp.splice(positionId, 1);
  reservePlayers = [];
}
/**
 * @param positionId is the position in which it was added to the starting lineup
 * for example if this was selected by 3er the position Id should be 3
 * if was the first one in be selected it should be 1
 */
function removePlayerFromLineUp(player, positionId) {
  const playerItemElement = getPlayerItemElement(player.id);
  playerItemElement.removeAttribute("color");
  removePlayer(positionId);
  removeFromSoccerField(player);
  displayCurrentFormation();
  let positionInLineUpTable = positionId + 1;
  ClickGiocatoreFormazione(positionInLineUpTable);
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
  h2.textContent = `(${role}) ${playerName} ${teamName.toUpperCase()}`;

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

function listenHeaderPage() {
  let count = 0;
  document.querySelector("#ion-header-form").addEventListener("click", () => {
    count++;
    console.log("dev count " + count);
    if (count > 4) {
      console.log("activated dev ");
      let devButton = document.querySelector("#dev-button");
      devButton.classList.remove("hidden-cs");
      devButton.classList.add("dev-btn");
    }
  });
}

function presentReserveModal() {
  var modal = document.querySelector("ion-modal");
  modal.present();
  clearReservePlayers();
  displayReservePlayers();
}

function cancel() {
  document.querySelector("ion-modal").dismiss(null, "cancel");
}

function confirm($event) {
  unSelectAllReservePlayersInFantaCalcioVersion();
  selectAllReservePlayers();
  sendMobileFormation();
  // document.querySelector("ion-modal").dismiss(input.value, "confirm");
}

function selectAllReservePlayers() {
  for (let i = 0; i < reservePlayers.length; i++) {
    const player = reservePlayers[i];
    ClickGiocatoreRosa(player.id);
  }
}
function unSelectAllReservePlayersInFantaCalcioVersion() {
  const isPlayerSelectedInTable = (r) => r != 0;
  const areSubstitutePlayerSelected = (substitutePlayers) =>
    substitutePlayers.filter(isPlayerSelectedInTable).length > 0;
  while (
    riserveInserite.length > 0 &&
    areSubstitutePlayerSelected(riserveInserite)
  ) {
    /**
     * when we remove a player from the reserve lift, the lift shift one position
     * so the player in position 13 go down to position 12, so always there is going
     * to be a player in position 12 if there are "riserveInserite"
     */
    var idG = arrFormazione[12];
    if (idG == null) {
      return;
    }
    var gg = arrInvioFormazione[idG];
    RimuoviRiserva(gg);
  }
}

function sendMobileFormation() {
  const fantaPassword = document.querySelector(`#mobile-password`).value;
  document.querySelector("input[name='password']").value = fantaPassword;
  document
    .querySelector("#formInvio")
    .setAttribute("onsubmit", "return sendFormationMobileVersion();");
  document.querySelector('#formInvio input[type="submit"]').click();
}

function listenSupplyPlayers() {
  const reorderGroup = document.querySelector("ion-reorder-group");

  reorderGroup.addEventListener("ionItemReorder", (data) => {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    let itemsIndex = [];
    for (let i = 0; i < reservePlayers.length; i++) {
      // const element = array[i];
      itemsIndex.push(i);
    }
    console.log("Before complete reservePlayers = ", reservePlayers);
    console.log("Before complete itemsIndex = ", itemsIndex);
    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. Update the reservePlayers variable to the
    // new order of reservePlayers
    data.detail.complete(itemsIndex);
    let tmpArray = [];
    for (let i = 0; i < itemsIndex.length; i++) {
      const elementIndex = itemsIndex[i];
      tmpArray.push(reservePlayers[elementIndex]);
    }
    reservePlayers = tmpArray;

    // Reorder the items in the DOM
    // reorderItems(items);
    console.log("after complete itemsIndex = ", itemsIndex);
    console.log("after complete reservePlayers = ", reservePlayers);
    reorderPlayers(reservePlayers);
  });

  function reorderPlayers(reservePlayers) {
    reorderGroup.replaceChildren();
    clearReservePlayers();
    displayReservePlayers();
  }
}
function addMobileVersion() {
  console.log("addMobileVersion");
  if (mobileVersionLoaded) {
    return;
  }
  mobileVersionLoaded = true;
  // Create ion-app element
  const ionApp = document.createElement("ion-app");
  ionApp.classList.add("ios", "ion-page", "hydrated");

  ionApp.innerHTML = `
  <ion-header id="ion-header-form">
    <ion-toolbar>
      <ion-title>
        Invio formazione 
        <div id="remainning-time"></div>
      </ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ios content-ltr hydrated">
    <div class="container-search-team" style="display: flex;flex-direction: row;justify-content: center;">
      <ion-item style="width: 30%;">
        <ion-select id="team-name-select" aria-label="Squadra" placeholder="Seleziona squadra">
        </ion-select>
      </ion-item>
      <ion-item style="width: 30%;">
        <ion-select id="match-day-select" aria-label="Seleziona giornata" placeholder="Seleziona giornata"></ion-select>
      </ion-item>
      <ion-item style="width: 30%;flex-direction: column-reverse;display: flex;">
        <ion-button style="width: 100%;" onclick="onclickSearchTeamAndMatchDay()">VAI</ion-button>
      </ion-item>
      <ion-item id="dev-button" class="hidden-cs">
        <ion-button onclick="devMode()">DEV</ion-button>
      </ion-item>
    </div>
    
    </ion-select>
    <div class="team-table">
      <section class="filters">
        <div class="filters__bar" id="filter-actions">
        </div>
      </section>
      <ion-list class="list__players" id="players-list">
      </ion-list>
    </div>
    <div class="soccer-field">
      <div class="field-header">
        <div class="formation" id="current-formation">
        </div>
      </div>
      <div class="field-main">
        <div class="field-section" id="field-goalkeeper">
        </div>
        <div class="field-section" id="field-defenders">
        </div>
        <div class="field-section" id="field-midfielders">
        </div>
        <div class="field-section" id="field-forwards">
        </div>
      </div>
      <div class="field-footer">
      </div>
      </div>
      <ion-modal trigger="open-modal">
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-button onclick="cancel()">Cancel</ion-button>
            </ion-buttons>
            <ion-title>Confirmare formazione</ion-title>
            <ion-buttons slot="end">
              <ion-button id="finish-formation-btn" disabled="true" onclick="confirm()" strong="true">Confirm</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-list>
            <ion-item>
              <ion-input fill="solid" type="password" id="mobile-password" label="Password"></ion-input>
              <ion-icon id="eye-icon-modal" style="cursor: pointer;" name="eye"></ion-icon>
            </ion-item>
            <ion-reorder-group id="reseve-list" disabled="false">
            </ion-reorder-group>
          </ion-list>
        </ion-content>
      </ion-modal>
  </ion-content>
`;

  // Continue creating and appending other elements in a similar manner.

  // Finally, append ionApp to the body
  const body = document.body;

  // Get the first child of the <body> element (if any)
  const firstChild = body.firstChild;

  // Insert ionApp as the first child of the <body> element
  if (firstChild) {
    body.insertBefore(ionApp, firstChild);
  } else {
    body.appendChild(ionApp);
  }
  onDomMobileLoaded();
}

function onDomMobileLoaded() {
  selectTeamAndDaySelectedPreviouslyOnSearch();
}
function checkMatchDaySelected(day) {
  // Define the URL you want to send the GET request to
  const url = "https://example.com/some-page";

  // Send a GET request using the fetch API
  fetch(url)
    .then((response) => {
      // Check if the request was successful (status code 200)
      if (response.status === 200) {
        return response.text(); // Parse the response body as text
      } else {
        throw new Error("Request failed with status: " + response.status);
      }
    })
    .then((htmlContent) => {
      // Handle the HTML content returned from the server

      const response = getJsonResponse(responseString);
      console.log(htmlContent);
      // You can insert the HTML content into the document, for example:
      // const container = document.getElementById('some-container-id');
      // container.innerHTML = htmlContent;
    })
    .catch((error) => {
      // Handle any errors that occurred during the request
      console.error("Error:", error);
    });
}
function getJsonResponse(responseString) {
  const startIndex = responseString.indexOf("{");
  const endIndex = responseString.lastIndexOf("}");
  const jsonPart = responseString.substring(startIndex, endIndex + 1);
  return JSON.parse(jsonPart);
}
function scrappingSelect(id) {
  const selectElement = document.querySelectorAll(id)[0];

  // Initialize an array to store the option values and texts
  const optionsData = [];

  // Loop through each option within the select element
  for (const option of selectElement.options) {
    // Extract the value and text of each option
    const value = option.value;
    const text = option.textContent;

    // Push the value and text into the optionsData array
    optionsData.push({ value, text });
  }

  // Now, optionsData contains an array of objects with the option values and texts
  return optionsData;
}
function createOptionElement(val) {
  const ionSelectOption = document.createElement("ion-select-option");

  // Set the "value" attribute
  ionSelectOption.setAttribute("value", val.value);

  // Set the text content of the element
  ionSelectOption.textContent = val.text;
  // Now, you can append this element to a parent element, such as a select or ion-select element.
  // For example, if you have a select element with the ID "mySelect":

  return ionSelectOption;
}
function displayTeamNames() {
  const teamsNamesValues = scrappingSelect("#Fsq");
  console.log({ teamsNamesValues });
  const teamNameElement = document.querySelector("#team-name-select");
  teamsNamesValues.forEach((val) => {
    teamNameElement.appendChild(createOptionElement(val));
  });
}
function displayMatchDays() {
  const matchDaysValues = scrappingSelect("#Gio");
  console.log("Gio", matchDaysValues);
  const teamNameElement = document.querySelector("#match-day-select");
  matchDaysValues.forEach((val) => {
    teamNameElement.appendChild(createOptionElement(val));
  });
}
function listenMobilePassword() {
  const finishFormationBtn = document.querySelector("#finish-formation-btn");
  document
    .querySelector("ion-input#mobile-password")
    .addEventListener("ionInput", function (event) {
      console.log({ event });
      console.log(event.detail.value);
      const password = event.detail.value;
      if (password.length > 1) {
        finishFormationBtn.removeAttribute("disabled");
      } else {
        finishFormationBtn.setAttribute("disabled", true);
      }

      // check if password is valid
      // if it is valid enable button
    });
}
function listenMatchDay() {
  const select = document.querySelector("ion-select#match-day-select");
  select.addEventListener("ionChange", (e) => {
    console.log(`ionChange fired with value: ${e.detail.value}`);
  });
}
function listenEyePasswordModal() {
  console.log(`listenEyePasswordModal`);
  const mobilePasswordInput = document.querySelector("#mobile-password");
  const eyeIconModal = document.querySelector("#eye-icon-modal");
  eyeIconModal.addEventListener("click", () => {
    console.log(`click in eye`);
    const typeMobileInput = mobilePasswordInput.getAttribute("type");
    if (typeMobileInput === "password") {
      mobilePasswordInput.removeAttribute("type");
    } else {
      mobilePasswordInput.setAttribute("type", "password");
    }
  });
}
function startMobileApp(table) {
  if (isLoaded) {
    return;
  }
  isLoaded = true;
  console.log("start mobile");
  showTimer();
  onLoadSuccess(table);
  // At this point all player were loaded
  // if you need to add a function, pleace it after this comment
  addFilterPlayerButtons();
  addPlayersList();
  // listenShowFormationModalBtn();
  listenSupplyPlayers();
  listenMobilePassword();
  listenEyePasswordModal();
  replaceOnActionInFormsGeneratedWithJS();
  // cleanAllSelectedPlayerInTable();
  try {
    loadPlayerAlreadySelected();
  } catch (error) {
    presentAlert({
      header: `Error`,
      message: `Giocatori selezionati precedentemente non caricati, re-seleziona la tua formazione.`,
    });
    cleanAllSelectedPlayerInTable();
  }
}
function getQueryParams() {
  var urlString = window.location.href;
  // Create a URL object
  var url = new URL(urlString);
  // Get the value of the "Fsq" parameter
  var teamSelectedValue = url.searchParams.get("Fsq");
  var daySelectedValue = url.searchParams.get("Gio");

  return { teamSelected: teamSelectedValue, daySelected: daySelectedValue };
}
// when user select team and day the page is recharge
// with this we keep the selection
function selectTeamAndDaySelectedPreviouslyOnSearch() {
  const selectedValues = getQueryParams();
  document.querySelector(`#team-name-select`).value =
    selectedValues.teamSelected;
  document.querySelector(`#match-day-select`).value =
    selectedValues.daySelected;
}

function replaceOnActionInFormsGeneratedWithJS() {
  const formSendFormation = document.querySelector("#formInvio");
  formSendFormation.setAttribute(
    "action",
    "./../" + formSendFormation.getAttribute("action")
  );
}

function clickOnVai(team, day) {
  console.log({ team });
  console.log({ day });
  document.querySelector("#Fsq").value = `${team}`;
  document.querySelector("#Gio").value = `${day}`;
  document.getElementById(`Invia`).click();
}

// search player and team given values from select elements onclickGoButton
function onclickSearchTeamAndMatchDay() {
  console.log(`click`);
  const teamValue = document.getElementById(`team-name-select`).value;
  const matchDayValue = document.getElementById(`match-day-select`).value;
  console.log(`teamName ${teamValue} matchDayValue ${matchDayValue}`);
  clickOnVai(teamValue, matchDayValue);
}
function showTimer() {
  intervalRemainingTimeId = setInterval(displayRemainingTime, 1000);
}
function displayRemainingTime() {
  if (
    !termineInvio ||
    !termineInvio.dataOraTermine ||
    !termineInvio.offsetServer
  ) {
    console.warn("termineInvio not present", termineInvio);
    return;
  }
  let text;
  let s =
    (termineInvio.dataOraTermine - new Date() - termineInvio.offsetServer) /
    1000;
  if (s > 0) {
    let gg = (s / 86400) | 0;
    let hh = ((s % 86400) / 3600) | 0;
    let mm = ((s % 3600) / 60) | 0;
    let ss = s % 60 | 0;
    text = gg > 0 ? gg + " Giorni " : "";
    text +=
      (hh < 10 ? "0" : "") +
      hh +
      ":" +
      (mm < 10 ? "0" : "") +
      mm +
      ":" +
      (ss < 10 ? "0" : "") +
      ss;
  } else {
    text = "Termine invio scaduto";
    intervalRemainingTimeId && clearInterval(intervalRemainingTimeId);
  }
  let el = document.getElementById("remainning-time");
  el.innerText = text;
}

// deselect all player in web version
function cleanAllSelectedPlayerInTable() {
  InizializzaFormazione();
}
function devMode() {
  console.log("dev mode");
  var element = document.querySelector("body > ion-app"); // Replace "yourElementId" with the actual ID of your element
  element.classList.remove("ion-page");
  element.classList.add("ion-page-dev");
  let body = document.querySelector("body");
  body.style = body.style + ";display: flex;";
}

function loadPlayerAlreadySelected() {
  let isLineUpSelectedPreviously = arrFormazioni.length > 0;
  if (!isLineUpSelectedPreviously) {
    // no player selected for current day
    return;
  }
  let lastIposition = 0;
  for (let i = 0; i < arrFormazioni.length; i++) {
    const playerPreviouslySelected = arrFormazioni[i];
    if (playerPreviouslySelected == null) {
      // for any weird reason the array is starting at 1 and not 0
      continue;
    }
    const hasSameNameRole = (playerInFormation, playerPrevSelected) =>
      playerInFormation.name.trim() === playerPrevSelected.Nome.trim() &&
      playerInFormation.teamPlayerName.trim() ===
        playerPrevSelected.SquadraDiA.trim();
    const playersFound = players.filter((p) =>
      hasSameNameRole(p, playerPreviouslySelected)
    );
    if (playersFound > 2) {
      console.log(
        "More than two players with same name and role",
        playersFound
      );
      // clean formation
      return;
    }
    let playerFound = playersFound[0];
    const areAllPlayerInLineUpAdded = startingLineUp.length === 11;
    if (!areAllPlayerInLineUpAdded) {
      addPlayerToLineUp(playerFound, false);
      lastIposition = i;
    } else {
      console.log("add it in the reserve array", playerFound);
      try {
        sortReservePlayerUsingPreviousSelection(
          i - (lastIposition + 1),
          playerFound
        );
      } catch (e) {
        presentAlert({
          header: "Atenzione",
          message: "Ricorda ordinare la panchina",
        });
      }
    }
  }
  // display in html
  clearReservePlayers();
  displayReservePlayers();
  console.log("Previous formation laoded. reservePlayers = ", reservePlayers);
  console.log("Previous formation laoded. startingLineUp = ", startingLineUp);
}
function sortReservePlayerUsingPreviousSelection(
  newPositionInReserve,
  playerFound
) {
  if (playerFound == null) {
    throw new Error(`reserve player to sort is null ${playerFound}`);
  }
  let currentPositionInReserve = reservePlayers.findIndex(
    (p) => p.id === playerFound.id
  );
  let tmpCopyOfPlayerToMoveBackInArray = Object.assign(
    {},
    reservePlayers[newPositionInReserve]
  );
  reservePlayers[newPositionInReserve] = playerFound;
  reservePlayers[currentPositionInReserve] = tmpCopyOfPlayerToMoveBackInArray;
}

function checkMatchesSelectedFantacalcioVersion() {
  var incontriSelezionati = 0;
  for (var i = 1; i <= incontriDisponibili.length; ++i)
    if (document.getElementById("incontro" + i).checked) incontriSelezionati++;
  if (incontriSelezionati === 0) {
    presentAlert({
      header: "Error in formazione",
      message: "Impossibile inviare la formazione: nessun incontro selezionato",
    });
    return false;
  }
}

function sendFormationMobileVersion() {
  checkMatchesSelectedFantacalcioVersion();

  // Non invia la formazione se non è corretta
  if (!checkFormationMobileVersion()) return false;

  // Genera dati per invio formazione per ciascun incontro selezionato
  var formazioni = [];
  var datiTelegram = "";
  for (i = 1; i <= incontriDisponibili.length; ++i) {
    // Salta l'incontro (competizione) se non è selezionato
    if (!document.getElementById("incontro" + i).checked) continue;
    var ii = arrIncontri[document.getElementById("incontro" + i).value];

    // Oggetto contenente i dati della formazione
    var formazione = {
      idIncontro: ii.ID,
      descrizione: ii.Descrizione,
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
  if (datiTelegram !== "") formazioni[0].datiTelegram = datiTelegram;

  // Compila gli altri dati ed invia la form
  document.getElementById("fi_formazioni").value = JSON.stringify(formazioni);
  document.getElementById("fi_idSquadra").value = cFsq;
  document.getElementById("fi_giornataDiA").value = cGio;
  window.open(
    "",
    "invformWindow",
    "width=600,height=240,screenX=20,screenY=20"
  );
  presentAlert({
    header: `Formazione Inviata`,
    message: `Verifica la tua email.`,
    buttons: ["OK"],
  });

  return true;
}
function checkFormationMobileVersion() {
  // Controlla titolari inseriti
  if (titolariInseriti !== 11) {
    presentAlert({
      header: "Errore in formazione",
      message:
        "Impossibile inviare la formazione: uno o più titolari non inseriti",
    });
    return false;
  }

  // Controlla ruoli delle riserve inserite
  if (regolaPanchina) {
    var ruoliSenzaRiserve = 0;
    for (var i = 1; i <= 4; ++i)
      if (riserveInserite[i] === 0) ruoliSenzaRiserve++;
    if (
      ruoliSenzaRiserve >
      totaleNumeroMassimoRiserve - totaleRiserveInserite
    ) {
      presentAlert({
        header: "Errore in formazione",
        message:
          "Impossibile inviare la formazione: è necessario inserire almeno una riserva per ruolo",
      });
      return false;
    }
  }

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
    if (arrFormazione[i] >= 0)
      arrInvioFormazione[arrFormazione[i]].Rigorista = arrRigoristi[i];

  // Controlla duplicati fra i rigoristi
  for (i = 1; i <= 11 + totaleNumeroMassimoRiserve - 1; i++)
    for (var j = i + 1; j <= 11 + totaleNumeroMassimoRiserve; j++)
      if (
        arrFormazione[i] >= 0 &&
        arrFormazione[j] >= 0 &&
        arrRigoristi[i] === arrRigoristi[j]
      ) {
        presentAlert({
          header: "Errore in formazione",
          message:
            "Impossibile inviare la formazione: ordine rigoristi non valido (duplicato)",
        });
        return false;
      }

  // Controlla regola dei portieri
  if (regolaRigoristi)
    for (i = 1; i <= 11 + totaleNumeroMassimoRiserve; i++)
      if (
        arrFormazione[i] >= 0 &&
        arrRigoristi[i] < 11 &&
        arrInvioFormazione[arrFormazione[i]].Ruolo === 1
      ) {
        presentAlert({
          header: "Errore in formazione",
          message:
            "Impossibile inviare la formazione: ordine rigoristi non valido (portiere < 11°)",
        });
        return false;
      }

  return true;
}

function onLoad() {
  console.log("loaded");
  addMobileVersion();
  listenHeaderPage();
  displayTeamNames();
  displayMatchDays();
  listenMatchDay();
  // if url have Invia and the day is valid display the table
  // Get a reference to the table element by its ID
  let table = document.getElementById("tabellaDati");
  if (table != null) {
    startMobileApp(table);
  } else {
    retriesToShowPage++;
    if (retriesToShowPage < 10) {
      setTimeout(() => onLoad(), 100);
    } else {
      alert(
        "Prova a selezionare una nuova data oppure verifica che ancora sei a tempo per inviare una formazione"
      );
    }
  }
}
/**
 * Selected player are in variable: 
  arrFormazioni : [{
    "IDIncontro": 26,
    "IDSquadra": 3,
    "IDLega": 0,
    "Nome": "ARESTI Simone",
    "SquadraDiA": "Cagliari",
    "Ruolo": 1,
    "Pos": 0,
    "Rig": 0
  }]
 * 
 */

window.addEventListener("DOMContentLoaded", function () {
  onLoad();
});
