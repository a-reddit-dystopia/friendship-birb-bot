const Discord = require("discord.js");
const logger = require("winston");
const request = require("request");
const prefix = "!elroy ";

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});
logger.level = "debug";
// Initialize Discord Bot
const client = new Discord.Client();

client.on("ready", function(evt) {
  logger.info("Connected");
});

client.on("message", message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  logger.info(args);
  const command = args.shift().toLowerCase();
  logger.info(command);

  if (command === "ping") {
    message.channel.send("pong", { reply: message });
  }
});

client.login(process.env.TOKEN);
