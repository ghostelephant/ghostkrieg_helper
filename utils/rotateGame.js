const rotateGame = ({guildId, channelId}) => {
  try{
    const {writeFileSync} = require("fs");
    const filePath = `../../saves/${guildId}/${channelId}.json`;

    const gameData = require(filePath);
    writeFileSync(`${filePath}.bak`, JSON.stringify(gameData, null, 2));

    const players = JSON.parse(JSON.stringify(gameData.players));
    const nations = JSON.parse(JSON.stringify(gameData.nations));

    players.sort((a, b) => a.colorId.value - b.colorId.value);

    const sortNationsByColor = (a, b) => {
      const playerA = a.identity.id;
      const playerB = b.identity.id;

      const getColor = pId =>
        players.filter(p => p.identity.id === pId)[0]?.colorId?.value;

      const colorA = getColor(playerA)
      const colorB = getColor(playerB);

      return colorA - colorB;
    };

    nations.sort(sortNationsByColor);

    for(let i=0; i<players.length; i++){
      let nextNationIdx = (i+1 >= players.length ? 0 : i+1);
      nations[nextNationIdx].identity.id = players[i].identity.id;
    }

    gameData.nations = nations;

    writeFileSync(filePath, JSON.stringify(gameData, null, 2));

    return "File written!"
  }
  catch(e){
    console.log(e);
    return `Something went wrong:\n${e.message}`;
  }

}

module.exports = rotateGame;