const blizz = require("blizzard.js").initialize({ apikey: process.env.BLIZZ });
const logger = require("winston");
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});
logger.level = "debug";
const REALM_NOT_FOUND = "Realm not found.";
const CHARACTER_NOT_FOUND = "Character not found.";
const NOT_HORDE = "Not Horde.";
const BIRB_ID = 12110;

module.exports = {
  name: "birbme",
  description: "Add me to the list motherlover",
  async execute(client, message, args) {
    let fields;
    message.react("🤔");

    if (args.length === 2) {
      const [charName, serverName] = args;
      const charTuple = await doTheRequest(charName, serverName);
      console.warn(charTuple);

      if (charTuple[0] === "ok") {
        fields = [
          {
            name: "✅ Server",
            value: "I found your server"
          },
          {
            name: "✅ Character",
            value: "I found your character\nIt is HORDE"
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
        ];
      } else {
        if (charTuple[1] === REALM_NOT_FOUND) {
          fields = [
            {
              name: "	❌ Server",
              value: `I did not find ${serverName}. Is it spelled right?`
            }
          ];
        } else if (charTuple[1] === CHARACTER_NOT_FOUND) {
          fields = [
            {
              name: "✅ Server",
              value: "I found your server"
            },
            {
              name: "❌ Character",
              value: `I did not find ${charName}. Is it spelled right?`
            }
          ];
        } else if (charTuple[1] === NOT_HORDE) {
          fields = [
            {
              name: "✅ Server",
              value: "I found your server"
            },
            {
              name: "❌ Character",
              value: `${charName} is alliance. We are HORDE.`
            }
          ];
        } else {
          logger.info("here");
        }
      }
      logger.info(fields);

      const embed = {
        color: 3447003,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        description: "Friendship Birb Check!!!!!!",
        fields: fields,
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

async function doTheRequest(charName, serverName) {
  try {
    const char = await blizz.wow.character(["profile", "achievements"], {
      origin: "us",
      realm: serverName,
      name: charName
    });
    logger.info(char.data.achievementsCompleted);
    const included = char.data.achievementsCompleted.includes(BIRB_ID);
    logger.info(included);
    if (char.data.faction === 1) {
      return ["ok"];
    } else {
      return ["not_ok", NOT_HORDE];
    }
  } catch (error) {
    const reason = error.response.data.reason;
    return ["not_ok", reason];
  }
}
