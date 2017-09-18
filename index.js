const fs = require("fs");

const playersCSV = fs.readFileSync("./Master.csv", "utf-8");

const mappedPlayers = playersCSV.split("\n").map(item => item.split(","));

const template = mappedPlayers[0];

const reducedPlayers = mappedPlayers.slice(1).reduce((players, playerArr, index) => {
  const newPlayer = template.reduce((player, attribute, attributeIndex) => {
    return {
      ...player,
      [attribute]: playerArr[attributeIndex]
    };
  }, {});

  return {
    ...players,
    [playerArr[0]]: newPlayer
  };
}, {});

fs.writeFileSync("./reduced-players.json", JSON.stringify(reducedPlayers, null, 2));
