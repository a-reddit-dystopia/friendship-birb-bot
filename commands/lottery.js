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
  async execute(client, message, args) {
    if (message.member.roles.find("name", "Elroy Admin")) {
      return message.reply("Sorry you cannot execute this command.");
    }
    const number = args[0] || 1;
    drawWinner(message, number);
  }
};

function drawWinner(message, number) {
  request.post(
    "https://friendship-birb-api.herokuapp.com/api/lotteries.json",
    {
      auth: {
        bearer: process.env.elroy
      },
      form: {
        amount: number
      }
    },
    (error, response, body) => {
      logger.debug(response.statusCode);
      const json = JSON.parse(body);
      logger.debug(json);

      if (response.statusCode === 201) {
        const users = json.data;
        let msg = [];
        users.forEach(user => {
          msg.push(
            `<@${user.attributes.discord_id}> (${user.attributes.wow_name} of ${
              user.attributes.wow_server
            })`
          );
        });
        const text = msg.join(", ");
        message.channel.send(
          `Congrats ${text} are the winner(s)! Follow directions to get your birb!`
        );
      } else if (response.statusCode === 422) {
        message.channel.send(`We have drawn all the birbs! Congrats fam!`);
      } else {
        message.channel.send(`Arf! Something went horribly wrong.`);
      }
    }
  );
}
