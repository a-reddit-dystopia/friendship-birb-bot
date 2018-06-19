const request = require("request");
const logger = require("winston");

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});
logger.level = "debug";

module.exports = {
  name: "lottery",
  description: "Make a birb drawing",
  execute(client, message, args) {
    drawWinner(message);
  }
};

function drawWinner(message) {
  request.post(
    "https://friendship-birb-api.herokuapp.com/api/lotteries.json",
    {
      auth: {
        bearer: process.env.elroy
      },
      form: {}
    },
    (error, response, body) => {
      const json = JSON.parse(body);
      logger.debug(json);
      const user = json.data;
      logger.debug(user);
      message.channel.send(
        `Congrats <@${
          user.attributes.discord_id
        }> is the winner! Follow directions to get your birb!`
      );
    }
  );
}
