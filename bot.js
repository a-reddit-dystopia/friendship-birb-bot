const Discord = require("discord.io");
const logger = require("winston");
const request = require("request");
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});
logger.level = "debug";
// Initialize Discord Bot
const bot = new Discord.Client({
  token: process.env.TOKEN,
  autorun: true
});
bot.on("ready", function(evt) {
  logger.info("Connected");
  logger.info("Logged in as: ");
  logger.info(bot.username + " - (" + bot.id + ")");
});
bot.on("message", function(user, userID, channelID, message, evt) {
  // Our bot needs to know if it will execute a command
  // It will listen for messages that will start with `!`
  const split = message.split(" ");
  const prefix = split[0];
  const command = split[1];
  if (prefix === "!elroy") {
    switch (command) {
      case "dog":
        bot.sendMessage({
          to: channelID,
          message: "Yes, this is dog"
        });
        break;
      case "fetch":
        const blerg = request.get(
          "https://friendship-birb-api.herokuapp.com/api/users.json",
          {
            auth: {
              bearer: process.env.elroy
            }
          }
        );
        logger.info(blerg);
        break;
      // Just add any case commands if you want to..
    }
  }
});
