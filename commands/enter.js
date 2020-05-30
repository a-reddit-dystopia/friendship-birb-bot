const blizz = require("blizzard.js").initialize({
  key: process.env.BLIZZ_KEY,
  secret: process.env.BLIZZ_SECRET,
});
const request = require("request-promise-native");
const REALM_NOT_FOUND = "Realm not found.";
const CHARACTER_NOT_FOUND = "Character not found or not logged in recently.";
const NOT_HORDE = "Not Horde. We are FOR THE HORDE!";
const HAS_BIRB = "Has AOTC mount already";
const DUPLICATE = "Character or discord user is already on our list";
const logger = require("winston");

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true,
});
logger.level = "debug";

module.exports = {
  name: "enter",
  description: "Add me to the list motherlover",
  async execute(client, message, args, state) {
    if (!state.lotteryEnabled) {
      return message.reply("The lottery is not currently running!");
    }
    message.react("🤔");

    console.debug(args);

    if (args.length >= 2) {
      const [charName, ...serverName] = args;
      console.debug(serverName);
      const character = charName.toLowerCase();
      const server = serverName.toLowerCase().replace("’", "").replace("'", "");
      const errorBuilder = {
        status: "ok",
        errors: {
          character: [],
          server: [],
          birb: [],
        },
      };
      await doTheRequest(character, server, errorBuilder, state);

      if (errorBuilder.status === "ok") {
        const status = await addToBirbList(message.author, character, server);
        if (status === 201) {
          message.react("✅");
        } else if (status === 422) {
          errorBuilder.status = "not_ok";
          errorBuilder.errors.character.push(DUPLICATE);
          message.react("❌");
        }
      } else {
        message.react("❌");
      }
      const embed = {
        color: 3447003,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL,
        },
        description: "AOTC Check!!!!!!",
        fields: buildFields(errorBuilder),
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "woof I am dog",
        },
      };
      message.reply({ embed });
    } else {
      message.channel.send(
        `I need you to send me your character name, then server name in dash-case, ie bleeding-hollow not Bleeding Hollow`,
        { reply: message }
      );
    }
  },
};

async function doTheRequest(charName, serverName, errorBuilder, state) {
  try {
    blizz.defaults.token = state.token;

    const char = await blizz.wow.character("collections/mounts", {
      region: "us",
      realm: serverName,
      name: charName,
      namespace: "profile",
    });

    const aotcMount = char.data.mounts.filter((mount) => {
      return mount.mount.id === Number(process.env.AOTC_ID);
    });
    const hasAotc = aotcMount.length > 0;

    const equipment = await getEquippedItems(serverName, charName, state.token);

    const hasCloakEquipped = equipment.filter((item) => {
      return item.item.id === Number(process.env.CLOAK_ID);
    });

    const faction = await getCharacterFaction(
      serverName,
      charName,
      state.token
    );

    if (faction !== "HORDE") {
      errorBuilder.status = "not_ok";
      errorBuilder.errors.character.push(NOT_HORDE);
      return ["not_ok", NOT_HORDE];
    } else if (hasAotc === true) {
      errorBuilder.status = "not_ok";
      errorBuilder.errors.birb.push(HAS_BIRB);
      return ["not_ok", HAS_BIRB];
    } else if (hasCloakEquipped.length === 0) {
      errorBuilder.status = "not_ok";
      errorBuilder.errors.character.push("No legendary cloak");
      return ["not_ok", "BLERG"];
    }
    return ["ok"];
  } catch (error) {
    errorBuilder.status = "not_ok";
    console.debug(error);
    const status = error.response.data.code;
    const realms = await getWowRealms(state.token);

    const realmFound = realms.filter((realm) => {
      return serverName === realm.slug || serverName === realm.name;
    });

    if (realmFound.length === 0) {
      errorBuilder.errors.server.push(REALM_NOT_FOUND);
    } else if (status === 404 || status === 403) {
      errorBuilder.errors.character.push(CHARACTER_NOT_FOUND);
    }
    return ["not_ok", status];
  }
}

async function getWowRealms(accessToken) {
  const response = await request.get(
    "https://us.api.blizzard.com/data/wow/realm/index?namespace=dynamic-us&locale=en_US",
    {
      auth: {
        bearer: accessToken,
      },
    }
  );
  const json = JSON.parse(response);
  return json.realms;
}

async function getCharacterFaction(realm, name, accessToken) {
  try {
    const response = await request.get(
      `https://us.api.blizzard.com/profile/wow/character/${realm}/${name}?namespace=profile-us`,
      {
        auth: {
          bearer: accessToken,
        },
      }
    );
    const json = JSON.parse(response);
    return json.faction.type;
  } catch (error) {
    logger.debug("FACTION");
    logger.debug(error);
  }
}

async function getEquippedItems(realm, name, accessToken) {
  try {
    const response = await request.get(
      `https://us.api.blizzard.com/profile/wow/character/${realm}/${name}/equipment?namespace=profile-us`,
      {
        auth: {
          bearer: accessToken,
        },
      }
    );

    const json = JSON.parse(response);
    return json.equipped_items;
  } catch (error) {
    logger.debug("ITEMS");
    logger.debug(error.error);
  }
}

async function addToBirbList(author, charName, serverName) {
  try {
    const character = charName.toLowerCase();
    await request.post(`${process.env.API}api/users.json`, {
      auth: {
        bearer: process.env.elroy,
      },
      form: {
        user: {
          discord_name: author.tag,
          discord_id: author.id,
          wow_name: character,
          wow_server: serverName,
          status: "active",
          status_date: new Date(),
        },
      },
    });
    return 201;
  } catch (error) {
    logger.debug(error);
    return 422;
  }
}

function buildFields(errorBuilder) {
  let fields = [];
  const charErrors = errorBuilder.errors.character;
  const serverErrors = errorBuilder.errors.server;
  const birbErrors = errorBuilder.errors.birb;

  if (charErrors.length > 0) {
    let str = "";
    charErrors.forEach((error) => (str += `${error}\n`));
    fields.push({ name: "❌ Character", value: str });
  } else {
    fields.push({
      name: "✅ Character",
      value: "I found your character\nIt is HORDE\nIt is not a duplicate",
    });
  }

  if (serverErrors.length > 0) {
    let str = "";
    serverErrors.forEach((error) => (str += `${error}\n`));
    fields.push({ name: "❌ Server", value: str });
  } else {
    fields.push({
      name: "✅ Server",
      value: "I found your server",
    });
  }

  if (birbErrors.length > 0) {
    let str = "";
    birbErrors.forEach((error) => (str += `${error}\n`));
    fields.push({ name: "❌ Birb status", value: str });
  } else {
    fields.push({
      name: "✅ AOTC status",
      value: "You do not currently have the AOTC mount",
    });
  }

  if (errorBuilder.status === "ok") {
    fields.push({
      name: "✅ All set",
      value: "You are good to go buddy! Hang out and wait for the lottery.",
    });
  }
  return fields;
}
