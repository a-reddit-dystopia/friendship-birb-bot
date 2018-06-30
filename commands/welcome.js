const CHANNELS_TITLE = "Channels";
const OPT_IN_TITLE = "Opt-in Roles and Channels";
const ard = require("./ard.js");
const rules = require("./rules.js");
const links = require("./links.js");

module.exports = {
  name: "welcome",
  description: "Welcome ARD Message",
  async execute(client, message, args) {
    // chans
    const generalChannel = await message.guild.channels
      .find(channel => channel.name === "general")
      .toString();
    const ardChat = await message.guild.channels
      .find(channel => channel.name === "ardchat")
      .toString();
    const raidChat = await message.guild.channels
      .find(channel => channel.name === "raid")
      .toString();
    const pvpChat = await message.guild.channels
      .find(channel => channel.name === "pvp")
      .toString();
    const nsfwChat = await message.guild.channels
      .find(channel => channel.name === "nsfw-shitposting")
      .toString();
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

    const CHANNELS_BODY = `${generalChannel}: Will be kept roughly PG in order to maintain a more welcoming public facing channel for people that might be checking out the guild for the first time or who may not have decided to take the plunge into ARD yet. It will be a good place for people new to ARD to ask questions and get to know people here. This channel is also where you will find advertising for any ARD sponsored content. These groups are run under ARD rules, within the ARD Discord.

${ardChat}: It is now visible to everyone green and up, meaning everyone that has chosen to become a part of the ARD community and are thus willing to accept all that comes with it. ARD rules will still apply in there, so keep it classy and don't be a douche canoe. Moderators will still be keeping an eye on things in there, but the reins will be a bit looser than general.

${raidChat} & ${pvpChat}: This category contains a raid and pvp channel. These channels are for advertising content groups that are not ARD affiliated. Typically they will be run through a platform other than the ARD Discord. We do not moderate these groups for atmosphere or recruitment, and any experiences, whether positive or negative, are not our responsibility. However, we will absolutely forbid runs with consistent negative experiences from advertising here.

${nsfwChat}: This channel should be fairly self-explanatory. It is opt-in only and will be minimally moderated, so enter at your own risk. Please keep it legal. Please don't go out of your way to suck. And understand that ARD does still have rules, so at the very least, keep politics, religion, and general douche-canoery either to yourself or in consensual private chats.11`;

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

    const channels = {
      color: 3447003,
      title: CHANNELS_TITLE,
      description: CHANNELS_BODY
    };
    await message.channel.send({ embed: channels });

    const roles = {
      color: 3447003,
      title: OPT_IN_TITLE,
      description: OPT_IN_BODY
    };
    await message.channel.send({ embed: roles });
  }
};
