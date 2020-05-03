const check = require("../utils/authorization-check");

module.exports = {
  name: "move",
  description: "Move members into the winners channel",
  execute(client, message, args) {
    if (check.isNotAuthorized(message)) {
      return;
    }

    const taggedUsers = message.mentions.users;
    if (taggedUsers.array.length <= 10) {
      const channel = message.guild.channels.find(
        "name",
        "FriendshipDragon Winners"
      );

      taggedUsers.forEach(async function (user) {
        const member = await message.guild.fetchMember(user);
        await member.setVoiceChannel(channel);
      });

      message.reply(
        "Those folks should have been moved to the voice channel if they are in voice comms."
      );
    } else {
      message.reply(
        "I can only move 10 people at a time. Try to tag fewer people!"
      );
    }
  }
};
