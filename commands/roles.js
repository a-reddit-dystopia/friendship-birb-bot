const OPT_IN_TITLE = "Opt-in Roles and Channels";

module.exports = {
  name: "roles",
  description: "Opt-in roles and channels",
  async execute(client, message, args) {
    // chans
    const mythicPlusChat = message.guild.channels
      .find(channel => channel.name === "lfg")
      .toString();
    const d2Chan = message.guild.channels
      .find(channel => channel.name === "destiny2")
      .toString();

    //roles
    const tank = message.guild.roles
      .find(role => role.name === "Tank")
      .toString();
    const healer = message.guild.roles
      .find(role => role.name === "Healer")
      .toString();
    const mdps = message.guild.roles
      .find(role => role.name === "MDPS")
      .toString();
    const rdps = message.guild.roles
      .find(role => role.name === "RDPS")
      .toString();
    const casual = message.guild.roles
      .find(role => role.name === "M+Casual")
      .toString();
    const pushing = message.guild.roles
      .find(role => role.name === "M+Pushing")
      .toString();
    const ladyRaid = message.guild.roles
      .find(role => role.name === "Ladyraid")
      .toString();
    const bh = message.guild.roles
      .find(role => role.name === "Bleeding Hollow")
      .toString();
    const cm = message.guild.roles
      .find(role => role.name === "Community Member")
      .toString();
    const beta = message.guild.roles
      .find(role => role.name.toLowerCase() === "beta")
      .toString();
    const d2role = message.guild.roles
      .find(role => role.name.toLowerCase() === "destiny 2")
      .toString();
    const pubgRole = message.guild.roles
      .find(role => role.name.toLowerCase() === "pubg")
      .toString();
    const overwatchRole = message.guild.roles
      .find(role => role.name.toLowerCase() === "overwatch")
      .toString();
    const dndRole = message.guild.roles
      .find(role => role.name.toLowerCase() === "dnd")
      .toString();

    const OPT_IN_BODY = `**World of Warcraft**

- ${mythicPlusChat} (and: ${tank}, ${healer}, ${mdps}, ${rdps},  ${casual}, ${pushing})
- ${ladyRaid}
- ${bh}
- ${cm}
- PVP -- dunno what it is
- ${beta}

**Other Games**
- ${d2role} & ${d2Chan}
- ${pubgRole}
- ${overwatchRole}
- ${dndRole}

**Community**
- Streamers
- Nerd
- Doge
- NSFW
- Spoiled`;
    const embed = {
      color: 3447003,
      title: OPT_IN_TITLE,
      description: OPT_IN_BODY
    };
    await message.channel.send({ embed });
  }
};
