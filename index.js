const fs = require("fs");

const playersCSV = fs.readFileSync("./Master.csv", "utf-8");

const mappedPlayers = playersCSV.split("\n").map(item => item.split(","));

const template = mappedPlayers[0];
const templateLen = template.length;
const playersLen = mappedPlayers.length;
let players = {};
for (let i = 1; i < playersLen; i++) {
  let player = {};
  for (let j = 0; j < templateLen; j++) {
    player[template[j]] = mappedPlayers[i][j];
  }
  players[mappedPlayers[i][0]] = player;
}

/*const reducedPlayers = mappedPlayers.slice(1).reduce((players, playerArr) => {
  players[playerArr[0]] = template.reduce((player, attribute, attributeIndex) => {
    player[attribute] = playerArr[attributeIndex];
    return player;
  }, {});
  return players;
}, {});*/

//delete players[""];

fs.writeFileSync("./reduced-players.json", JSON.stringify(players, null, 2));
