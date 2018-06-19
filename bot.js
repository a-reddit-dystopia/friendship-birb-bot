const Discord = require("discord.js");
const logger = require("winston");
const request = require("request");
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
  logger.info("Logged in as: ");
  logger.info(client.username + " - (" + client.id + ")");
});
client.on("message", message => {
  logger.info(message);
  if (message.content === "ping") {
    message.channel.send("pong");
  }
});

client.login(process.env.TOKEN);
