require("dotenv").config();

const {REST, Routes, SlashCommandBuilder} = require("discord.js");

const ping = require("./commands/ping");

const rest = new REST().setToken(process.env.DISCORD_TOKEN);


const commands = require("./commands");
const commandData = Object.values(commands).map(c => c.data.toJSON());

rest.put(
  Routes.applicationGuildCommands(
    process.env.DISCORD_CLIENT_ID,
    process.env.DISCORD_GUILD_ID
  ), {body: commandData}
)
  .then(console.log)
  .catch(console.error);