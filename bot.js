const Discord = require("discord.js");
const logger = require("winston");
const request = require("request");
const fs = require("fs");

const prefix = "!elroy ";

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});
logger.level = "debug";
// Initialize Discord Bot
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("ready", function(evt) {
  logger.info("Connected");
});

client.on("message", message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  logger.info(args);
  const command = args.shift().toLowerCase();
  logger.info(command);

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.info(error);
    message.reply("arf! There was an error!");
  }
});

client.login(process.env.TOKEN);
