const check = require("../utils/authorization-check");

module.exports = {
  name: "yank",
  description: "Remove a role from a discord user",
  execute(client, message, args) {
    if (check.isNotAuthorized(message)) {
      return;
    }

    const taggedUsers = message.mentions.users;

    if (taggedUsers.array.length <= 10) {
      const role = message.guild.roles.find("name", process.env.winnerRole);

      taggedUsers.forEach(async function (user) {
        const member = await message.guild.fetchMember(user);
        member.removeRole(role, "I am a vengeful dog");
      });

      message.reply("Arf! Done!");
    } else {
      message.reply(
        "I can only remove roles to 10 people at a time. Try to tag fewer people!"
      );
    }
  },
};
