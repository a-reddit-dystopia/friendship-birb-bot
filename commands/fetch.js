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
      "https://friendship-birb-api.herokuapp.com/api/users.json",
      {
        auth: {
          bearer: process.env.elroy
        }
      },
      (error, response, body) => {
        const json = JSON.parse(body);
        const users = json.data;
        logger.debug(users);
        let blerg = `+---------------+----------------+-----------------+
| Discord       | Character Name | Server          |
+---------------+----------------+-----------------+`;
        users.forEach(user => {
          logger.debug(user);
          const attributes = user.attributes;
          blerg =
            blerg +
            `
| ${attributes.discord_name} | ${attributes.wow_name}        | ${
              attributes.wow_server
            } |
+---------------+----------------+-----------------+`;
        });
        message.channel.send(blerg, { reply: message });
      }
    );
  }
};
