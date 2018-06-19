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
        const users = body["data"];
        logger.debug(users);
        users.each(user => {
          message.channel.send(
            `${user["discord_name"]} ${user["wow_name"]} ${user["wow_server"]}`,
            { reply: message }
          );
        });
      }
    );
  }
};
