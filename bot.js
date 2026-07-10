require("dotenv").config();

const {Client, Events, GatewayIntentBits} = require("discord.js");

const bot = new Client({intents: [GatewayIntentBits.Guilds]});

bot.once(Events.ClientReady, c => {
  console.log(`Logged in as ${c.user.tag}`);
});

bot.login(process.env.DISCORD_TOKEN);

bot.commands = require("./commands");

bot.on(Events.InteractionCreate, i => {
  if(i.isChatInputCommand()){
    const command = i.client.commands[i.commandName];
    command.run(i);
  }
});