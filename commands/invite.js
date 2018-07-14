const check = require("../utils/authorization-check");
const logger = require("winston");

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});
logger.level = "debug";
module.exports = {
  name: "invite",
  description: "Sends winners an invite DM",
  execute(client, message, args) {
    if (check.isNotAuthorized(message)) {
      return;
    }

    const voiceChan = message.guild.channels.find("id", 425014120522448897);
    logger.debug(voiceChan);
  }
};
