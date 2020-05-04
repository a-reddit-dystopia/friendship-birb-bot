const check = require("../utils/authorization-check");

module.exports = {
  name: "invite",
  description: "Sends winners an invite DM",
  execute(client, message, args, state) {
    if (check.isNotAuthorized(message)) {
      return;
    }

    const voiceChan = message.guild.channels.get(process.env.onDeckChannel);

    voiceChan.members.forEach((member) => {
      const has = member.roles.find("name", process.env.winnerRole);
      if (has) {
        member.send(
          `Hey buddy. It's time to ROLL OUT. Copy and paste this in-game: ${state.inviteMessage} to get into the raid!`
        );
      }
    });
    message.reply("I've sent our new buddies the invite message!");
  },
};
