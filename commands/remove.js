const request = require("request-promise-native");
const logger = require("winston");

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});
logger.level = "debug";

module.exports = {
  name: "remove",
  description: "Remove a discord user or users from the list",
  execute(client, message, args) {
    if (!message.member.roles.find("name", "Elroy Admin")) {
      return message.reply("Sorry you cannot execute this command.");
    }
    const taggedUsers = message.mentions.users;

    taggedUsers.forEach(async function(user) {
      try {
        const response = await request.delete(
          `https://friendship-birb-api.herokuapp.com/api/users/${user.id}.json`,
          {
            auth: {
              bearer: process.env.elroy
            },
            form: {}
          }
        );
        message.reploy("Arf! I removed the contestant(s) from the list");
      } catch (error) {
        logger.debug(error);
        message.reply("Arf! I couldn't find that contestant.");
      }
    });
  }
};
