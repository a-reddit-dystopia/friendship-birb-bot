const blizz = require("blizzard.js").initialize({ apikey: process.env.BLIZZ });
const request = require("request");
const REALM_NOT_FOUND = "Realm not found.";
const CHARACTER_NOT_FOUND = "Character not found.";
const NOT_HORDE = "Not Horde.";
const BIRB_ID = 12110;
const HAS_BIRB = "Has Friendship birb already";

module.exports = {
  name: "birbme",
  description: "Add me to the list motherlover",
  async execute(client, message, args) {
    let fields;
    message.react("🤔");

    if (args.length === 2) {
      const [charName, serverName] = args;
      const charTuple = await doTheRequest(charName, serverName);

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
        await addToBirbList(message.author, charName, serverName);
        message.react("✅");
      } else {
        if (charTuple[1] === REALM_NOT_FOUND) {
          fields = [
            {
              name: "	❌ Server",
              value: `I did not find ${serverName}. Is it spelled right?`
            }
          ];
          message.react("❌");
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
          message.react("❌");
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
          message.react("❌");
        } else if (charTuple[1] === HAS_BIRB) {
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
              name: "❌ Birb status",
              value: "You already have a friendship birb!"
            }
          ];
          message.react("❌");
        }
      }

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
    const hasBirb = char.data.achievements.achievementsCompleted.includes(
      BIRB_ID
    );
    if (char.data.faction === 0) {
      return ["not_ok", NOT_HORDE];
    } else if (hasBirb === true) {
      return ["not_ok", HAS_BIRB];
    }
    return ["ok"];
  } catch (error) {
    const reason = error.response.data.reason;
    return ["not_ok", reason];
  }
}

function addToBirbList(author, charName, serverName) {
  request.post(
    "https://friendship-birb-api.herokuapp.com/api/users.json",
    {
      auth: {
        bearer: process.env.elroy
      },
      form: {
        user: {
          discord_name: author.tag,
          discord_id: author.id,
          wow_name: charName,
          wow_server: serverName,
          status: "active",
          status_date: new Date()
        }
      }
    },
    (error, response, body) => {
      const json = JSON.parse(body);
    }
  );
}
