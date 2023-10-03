var txxsRowsPlayers;
var players = [];
var startingLineUp = [];

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

function addPlayerToLineUp(playerId) {
  console.log(`player added`);
  ClickGiocatoreRosa(playerId);
  startingLineUp.push(playerId);
}

/**
 * @param positionId is the position in which it was added to the starting lineup
 * for example if this was selected by 3er the position Id should be 3
 * if was the first one in be selected it should be 1
 */
function removePlayerFromLineUp(positionId) {
  ClickGiocatoreFormazione(positionId);
}

function onLoadSuccess(table) {
  // console.log(`success`, table);
  // Use querySelectorAll to select all <tr> elements with class "t-xxs" within the table
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
      role: playerRole,
      spanRoleIdElement,
      name: playerName,
      teamPlayerName,
      oponentTeamName,
      affValue,
      mvtValue,
      fmtValue,
      mvuValue,
      fmuValue,
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
      btn.addEventListener("click", () => displayPlayers(filter.key));
      filterElement.appendChild(btn);
    });
  } catch (error) {
    console.log("add filter ", error);
  }
}

function createPlayerIonItem(
  playerName,
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

  // Create h2 element for player name
  const h2 = document.createElement("h2");
  h2.textContent = playerName + " - " + teamName;

  // Create p element for stats
  const p = document.createElement("p");
  p.textContent = stats + ` avv: ${oponentTeamName}`;

  // Append elements to ion-label
  ionLabel.appendChild(img);
  ionLabel.appendChild(h2);
  ionLabel.appendChild(p);

  // Append ion-label to ion-item
  ionItem.appendChild(ionLabel);
  ionItem.addEventListener("click", () => addPlayerToLineUp(id));
  return ionItem;
}
function addPlayersList() {
  const playerListElement = document.getElementById("players-list");
  players.forEach((player) => {
    const playerItem = createPlayerIonItem(
      player.name,
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

function onLoad() {
  console.log("loaded");
  // Get a reference to the table element by its ID
  let table = document.getElementById("tabellaDati");
  if (table != null) {
    onLoadSuccess(table);
    addFilterPlayerButtons();
    addPlayersList();
  } else {
    setTimeout(() => onLoad(), 100);
  }
}
