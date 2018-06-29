const request = require("request");
const logger = require("winston");

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});
logger.level = "debug";

module.exports = {
  name: "fetch",
  description: "Stop trying to make fetch happen",
  execute(client, message, args) {
    request.get(
      `${process.env.API}api/users.json`,
      {
        auth: {
          bearer: process.env.elroy
        }
      },
      (error, response, body) => {
        logger.debug(error);
        const json = JSON.parse(body);
        const users = json.data.slice(0, 25);
        logger.debug(users);
        let fields = [];
        users.forEach(user => {
          logger.debug(user);
          const attributes = user.attributes;
          //attributes.discord_id, wow_name, wow_server
          fields.push({
            value: `<@${attributes.discord_id}>`,
            name: `${attributes.wow_name}-${attributes.wow_server}`
          });
        });
        const embed = {
          color: 3447003,
          author: {
            name: client.user.username,
            icon_url: client.user.avatarURL
          },
          title: "Listing of Friendship birb contestants",
          description:
            "click the link to see everyone, we can only display 25 here",
          url: `${process.env.API}`,
          fields: fields,
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "woof I am dog"
          }
        };
        message.channel.send({ embed });
      }
    );
  }
};
