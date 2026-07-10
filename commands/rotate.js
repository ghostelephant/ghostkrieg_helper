const {SlashCommandBuilder, MessageFlags} = require("discord.js");

const userWhitelist = {
  "1516157059547136000": ["288768900169072641", "377256286179557377"]
};

const rotate = async interaction => {
  await interaction.deferReply();

  const {guildId, channelId, user: {id: userId}} = interaction;
  
  if(channelId in userWhitelist && userWhitelist[channelId].includes(userId)){
    const {rotateGame} = require("../utils");

    const rotationResult = rotateGame({guildId, channelId});

    await interaction.followUp({
      content: rotationResult
    });
  }

  else{
    await interaction.followUp({
      content: "Sorry, you can't do this",
      flags: MessageFlags.Ephemeral
    });
  }


  // console.log(interaction);
};

const data = new SlashCommandBuilder()
  .setName("rotate")
  .setDescription("Rotate nations in selected game");

module.exports = {
  data,
  run: rotate
}