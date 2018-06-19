module.exports = {
  name: "lottery",
  description: "Make a birb drawing",
  execute(client, message, args) {
    const user = drawWinner();
    message.channel.send(
      `Congrats <@${
        user.attributes.discord_id
      }> is the winner! Follow directions to get your birb!`
    );
  }
};

function drawWinner() {
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
      return json;
    }
  );
}
