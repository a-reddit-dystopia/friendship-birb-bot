const request = require("request");

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
        message.channel.send(json, { reply: message });
      }
    );
  }
};
