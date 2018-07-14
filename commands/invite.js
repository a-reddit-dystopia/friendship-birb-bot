const check = require("../utils/authorization-check");
const logger = require("winston");
const EMBED_MSG = `\`/w piprunetotem-bleedinghollow PARTY\``;

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

    const voiceChan = message.guild.channels.get("425014120522448897");

    voiceChan.members.forEach(member => {
      const has = member.roles.find("name", "AOTC Winner");
      if (has) {
        member.send(
          `Hey buddy. It's time to ROLL OUT. ${EMBED_MSG} to get into the raid!`
        );
      }
    });
    message.reply("I've sent our new buddies the invite message!");
  }
};
