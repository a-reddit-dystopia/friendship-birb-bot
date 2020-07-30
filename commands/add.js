const logger = require("winston");
const check = require("../utils/authorization-check");
const request = require("request-promise-native");

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true,
});
logger.level = "debug";

module.exports = {
  name: "add",
  description: "Manually enter a person",
  async execute(client, message, args) {
    if (check.isNotAuthorized(message)) {
      return;
    }

    const taggedUsers = message.mentions.users;
    logger.debug(taggedUsers.array.length);

    if (taggedUsers.array.length <= 10) {
      taggedUsers.forEach(async function (user) {
        const author = await message.guild.fetchMember(user);
        await request.post(`${process.env.API}api/users.json`, {
          auth: {
            bearer: process.env.elroy,
          },
          form: {
            user: {
              discord_name: `${user.username}#${user.discriminator}`,
              discord_id: author.id,
              wow_name: "character",
              wow_server: "whatever",
              status: "active",
              status_date: new Date(),
            },
          },
        });
      });

      message.reply("Arf! Done!");
    } else {
      message.reply(
        "I can only add roles to 10 people at a time. Try to tag fewer people!"
      );
    }
  },
};
