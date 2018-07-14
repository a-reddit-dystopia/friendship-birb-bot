const logger = require("winston");
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});
logger.level = "debug";

module.exports = {
  name: "add",
  description: "Give a discord user the birb role",
  async execute(client, message, args) {
    if (!message.member.roles.find("name", "Elroy Admin")) {
      return message.reply("Sorry you cannot execute this command.");
    }
    const taggedUsers = message.mentions.users;
    logger.debug(taggedUsers);

    if (taggedUsers.length <= 10) {
      const role = message.guild.roles.find("name", "AOTC Winner");

      taggedUsers.forEach(async function(user) {
        const member = await message.guild.fetchMember(user);
        return await member.addRole(role, "I am a loving dog");
      });

      message.reply("Arf! Done!");
    } else {
      message.reply(
        "I can only add roles to 10 people at a time. Try to tag fewer people!"
      );
    }
  }
};
