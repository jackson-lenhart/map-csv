const fs = require("fs");

const playersCSV = fs.readFileSync("./Master.csv", "utf-8");

const mappedPlayers = playersCSV.split("\n").map(item => item.split(","));

const template = mappedPlayers[0];

const reducedPlayers = mappedPlayers.slice(1).reduce((players, playerArr, index) => {
  players[playerArr[0]] = template.reduce((player, attribute, attributeIndex) => {
    player[attribute] = playerArr[attributeIndex];
    return player;
  }, {});
  return players;
}, {});

delete reducedPlayers[""];

fs.writeFileSync("./reduced-players.json", JSON.stringify(reducedPlayers, null, 2));
