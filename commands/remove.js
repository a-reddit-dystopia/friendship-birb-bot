const request = require("request-promise-native");
const check = require("../utils/authorization-check");

module.exports = {
  name: "remove",
  description: "Remove a discord user or users from the list",
  execute(client, message, args) {
    if (check.isNotAuthorized(message)) {
      return;
    }

    const taggedUsers = message.mentions.users;

    if (taggedUsers.array.length <= 10) {
      taggedUsers.forEach(async function(user) {
        try {
          const response = await request.delete(
            `${process.env.API}api/users/${user.id}.json`,
            {
              auth: {
                bearer: process.env.elroy
              },
              form: {}
            }
          );
          message.channel.send(`Arf! I removed <@${user.id}> from the list.`);
        } catch (error) {
          message.channel.send(
            `Arf! I couldn't find <@${user.id}> on the list.`
          );
        }
      });
    } else {
      message.reply(
        "I can only remove 10 people at a time. Try to tag fewer people!"
      );
    }
  }
};
