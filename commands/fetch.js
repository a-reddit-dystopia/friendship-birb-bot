const request = require("request-promise-native");
const logger = require("winston");

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});
logger.level = "debug";

module.exports = {
  name: "fetch",
  description: "Stop trying to make fetch happen",
  async execute(client, message, args) {
    const resp = await getCount();
    const embed = {
      color: 3447003,
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
      },
      title: "Listing of Friendship dragon contestants",
      description: `There are currently ${resp.count} entries`,
      url: `${process.env.API}`,
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL,
        text: "woof I am dog"
      }
    };
    message.channel.send({ embed });
  }
};

async function getCount() {
  const response = await request.get(`${process.env.API}api/users.json`, {
    auth: {
      bearer: process.env.elroy
    },
    form: {}
  });
  return JSON.parse(response);
}
