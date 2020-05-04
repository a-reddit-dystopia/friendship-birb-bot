const logger = require("winston");
const check = require("../utils/authorization-check");

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true,
});
logger.level = "debug";

module.exports = {
  name: "add",
  description: "Give a discord user the AOTC role",
  async execute(client, message, args) {
    if (check.isNotAuthorized(message)) {
      return;
    }

    const taggedUsers = message.mentions.users;
    logger.debug(taggedUsers.array.length);

    if (taggedUsers.array.length <= 10) {
      const role = message.guild.roles.find("name", process.env.winnerRole);

      taggedUsers.forEach(async function (user) {
        const member = await message.guild.fetchMember(user);
        return await member.addRole(role, "I am a loving dog");
      });

      message.reply("Arf! Done!");
    } else {
      message.reply(
        "I can only add roles to 10 people at a time. Try to tag fewer people!"
      );
    }
  },
};
