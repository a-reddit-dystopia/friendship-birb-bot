const OPT_IN_TITLE = "Opt-in Roles and Channels";
const ard = require("./ard.js");
const rules = require("./rules.js");
const links = require("./links.js");
const channels = require("./channels.js");

module.exports = {
  name: "welcome",
  description: "Welcome ARD Message",
  async execute(client, message, args) {
    // chans
    const mythicPlusChat = await message.guild.channels
      .find(channel => channel.name === "lfg")
      .toString();

    //roles
    const tank = await message.guild.roles
      .find(role => role.name === "Tank")
      .toString();
    const healer = await message.guild.roles
      .find(role => role.name === "Healer")
      .toString();
    const mdps = await message.guild.roles
      .find(role => role.name === "MDPS")
      .toString();
    const rdps = await message.guild.roles
      .find(role => role.name === "RDPS")
      .toString();
    const casual = await message.guild.roles
      .find(role => role.name === "M+Casual")
      .toString();
    const pushing = await message.guild.roles
      .find(role => role.name === "M+Pushing")
      .toString();
    const ladyRaid = await message.guild.roles
      .find(role => role.name === "Ladyraid")
      .toString();
    const bh = await message.guild.roles
      .find(role => role.name === "Bleeding Hollow")
      .toString();
    const cm = await message.guild.roles
      .find(role => role.name === "Community Member")
      .toString();
    const beta = await message.guild.roles
      .find(role => role.name.toLowerCase() === "beta")
      .toString();

    const OPT_IN_BODY = `**World of Warcraft**

- ${mythicPlusChat} (and: ${tank}, ${healer}, ${mdps}, ${rdps},  ${casual}, ${pushing})
- ${ladyRaid}
- ${bh}
- ${cm}
- PVP -- dunno what it is
- ${beta}

**Other Games**
- Destiny 2
- PUBG
- Overwatch
- DND

**Community**
- Streamers
- Nerd
- Doge
- NSFW
- Spoiled`;
    await ard.execute(client, message, args);
    await rules.execute(client, message, args);
    await links.execute(client, message, args);
    await channels.execute(client, message, args);

    const roles = {
      color: 3447003,
      title: OPT_IN_TITLE,
      description: OPT_IN_BODY
    };
    await message.channel.send({ embed: roles });
  }
};
