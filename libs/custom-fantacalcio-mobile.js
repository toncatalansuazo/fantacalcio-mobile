var txxsRowsPlayers;
var players = [];
var startingLineUp = [];
var reservePlayers = [];
var currentRoleFilter = "";
var isLoaded = false;
var retriesToShowPage = 10;
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
    { goalkeeper: 1, defenders: 6, midfielders: 1, forwards: 3 }, // is it ok?
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
  } else {
    addPlayer(player);
    playerItemElement.setAttribute("color", "secondary");
    addToSoccerField(player);
    displayCurrentFormation();
    displaySendButton();
    ClickGiocatoreRosa(player.id);
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

// function listenShowFormationModalBtn() {
//   const btnSendFormation = document.getElementById("send-formation-btn");
//   btnSendFormation.addEventListener("click", ($event) => {
//     presentReserveModal();
//   });
// }

function listenHeaderPage() {
  let count = 0;
  document.querySelector("#ion-header-form").addEventListener("click", () => {
    count++;
    if (count > 4) {
      let devButton = document.querySelector("#dev-button");
      devButton.style = "width: 10%;";
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

function confirm() {
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
function unSelectAllReservePlayers() {
  for (let i = 0; i < reservePlayers.length; i++) {
    const player = reservePlayers[i];
    ClickGiocatoreFormazione(player.id);
  }
}

function sendMobileFormation() {
  const fantaPassword = document.querySelector(`#mobile-password`).value;
  document.querySelector("input[name='password']").value = fantaPassword;
  document.querySelector("form#formInvio").submit();

  // localStorage.setItem("fantacalcio-p", "washington");
  // const password = localStorage.getItem("fantacalcio-p");
  // if (password == null) {
  //   presentAlert({
  //     header: `Password non trovata`,
  //     message: `Ricaraca la pagina`,
  //   });
  //   location.reload();
  // }
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
    // After complete is called the items will be in the new order
    // const from = data.detail.from;
    // const to = data.detail.to;
    // const isMovingDown = from < to;
    // if (isMovingDown) {
    //   for (let i = from; i < to; i++) {
    //     const element = Object.assign({}, reservePlayers[i]);
    //     const elementAux = Object.assign({}, reservePlayers[i + 1]);
    //     reservePlayers[i] = elementAux;
    //     reservePlayers[i + 1] = element;
    //   }
    // } else {
    //   for (let i = from; i > to; i--) {
    //     const element = Object.assign({}, reservePlayers[i]);
    //     const elementAux = Object.assign({}, reservePlayers[i - 1]);
    //     reservePlayers[i] = elementAux;
    //     reservePlayers[i - 1] = element;
    //   }
    // }
    // console.log("After complete", reservePlayers);
  });

  function reorderPlayers(reservePlayers) {
    reorderGroup.replaceChildren();
    clearReservePlayers();
    displayReservePlayers();
  }
}
function addMobileVersion() {
  console.log("addMobileVersion");
  // Create ion-app element
  const ionApp = document.createElement("ion-app");
  ionApp.classList.add("ios", "ion-page", "hydrated");

  ionApp.innerHTML = `<ion-app class="ios ion-page hydrated">
  <ion-header id="ion-header-form">
    <ion-toolbar>
      <ion-title>Invio formazione</ion-title>
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
      <ion-item style="width: 30%;">
        <ion-button style="width: 100%;" onclick="onclickGoButton()">VAI</ion-button>
      </ion-item>
      <ion-item id="dev-button" style="width: 30%;display: none;">
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
</ion-app>`;

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
  onLoadSuccess(table);
  addFilterPlayerButtons();
  addPlayersList();
  // listenShowFormationModalBtn();
  listenSupplyPlayers();
  listenMobilePassword();
  listenEyePasswordModal();
  replaceOnActionInFormsGeneratedWithJS();
}
function getQueryParams() {
  var urlParams = new URLSearchParams(window.location.url);

  // Get individual query parameters
  var fsq = urlParams.get("Fsq");
  var gio = urlParams.get("Gio");
  var invia = urlParams.get("Invia");

  return { teamSelected: fsq, daySelected: gio };
}
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
function clickOnVai(team, day) {
  console.log({ team });
  console.log({ day });
  document.querySelector("#Fsq").value = `${team}`;
  document.querySelector("#Gio").value = `${day}`;
  document.getElementById(`Invia`).click();
}
function onclickGoButton() {
  console.log(`click`);
  const teamValue = document.getElementById(`team-name-select`).value;
  const matchDayValue = document.getElementById(`match-day-select`).value;
  console.log(`teamName ${teamValue} matchDayValue ${matchDayValue}`);
  clickOnVai(teamValue, matchDayValue);
}
function devMode() {
  var element = document.querySelector("body > ion-app"); // Replace "yourElementId" with the actual ID of your element
  element.classList.remove("ion-page");
  element.classList.add("ion-page-dev");
  let body = document.querySelector("body");
  body.style = body.style + ";display: flex;";
}
window.addEventListener("DOMContentLoaded", function () {
  onLoad();
});
