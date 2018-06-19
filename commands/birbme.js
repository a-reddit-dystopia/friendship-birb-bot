const blizz = require("blizzard.js").initialize({ apikey: process.env.BLIZZ });
const logger = require("winston");
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});
logger.level = "debug";

module.exports = {
  name: "birbme",
  description: "Add me to the list motherlover",
  async execute(client, message, args) {
    message.react("🤔");

    if (args.length === 2) {
      const [charName, serverName] = args;
      try {
        const char = await blizz.wow.character(["profile"], {
          origin: "us",
          realm: serverName,
          name: charName
        });
        logger.info(char.data);
      } catch (error) {
        logger.info(error.response.status);
        logger.info(error.response.data);
      }
      const embed = {
        color: 3447003,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        description: "Friendship Birb Check!!!!!!",
        fields: [
          {
            name: "✅ Server",
            value: "I found your server"
          },
          {
            name: "✅ Character",
            value: "I found your character"
          },
          {
            name: "✅ Birb status",
            value: "You do not currently have the friendship birb"
          },
          {
            name: "✅ All set",
            value:
              "You are good to go buddy! Hang out and wait for the lottery."
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "woof I am dog"
        }
      };
      message.reply({ embed });
    } else {
      message.channel.send(
        `I need you to send me your character name, then server name in dash-case, ie bleeding-hollow not Bleeding Hollow`,
        { reply: message }
      );
    }
  }
};
