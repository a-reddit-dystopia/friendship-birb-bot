const check = require("../utils/authorization-check");
const config = require("./../config.json");

module.exports = {
  name: "invite",
  description: "Sends winners an invite DM",
  execute(client, message, args, state) {
    if (check.isNotAuthorized(message)) {
      return;
    }

    const voiceChan = message.guild.channels.get(config.onDeckChannel);

    voiceChan.members.forEach(member => {
      const has = member.roles.find("name", config.winnerRole);
      if (has) {
        member.send(
          `Hey buddy. It's time to ROLL OUT. ${
            state.inviteMessage
          } to get into the raid!`
        );
      }
    });
    message.reply("I've sent our new buddies the invite message!");
  }
};
