const request = require("request");
const logger = require("winston");

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});
logger.level = "debug";

module.exports = {
  name: "add",
  description: "gimme a bud",
  execute(client, message, args) {
    const [charName, serverName] = args;
    request.post(
      "https://friendship-birb-api.herokuapp.com/api/users.json",
      {
        auth: {
          bearer: process.env.elroy
        },
        form: {
          user: {
            discord_name: message.author.tag,
            wow_name: charName,
            wow_server: serverName,
            status: "active",
            status_date: new Date()
          }
        }
      },
      (error, response, body) => {
        const json = JSON.parse(body);
        logger.debug(body);
        message.channel.send(json, { reply: message });
      }
    );
  }
};
