const WELCOME_TITLE = "Welcome to a Reddit Dystopia!";
const WELCOME_BODY = `We are a cross-realm US-Horde community that was founded from a single Reddit post early in the Legion expansion. We pride ourselves on being an open and inclusive laid back group of gamers. We have an official guild on Horde-Bleeding Hollow. You DO NOT have to transfer or join our guild, but if you are interested in doing so, just speak to one of the Officers/MVPs and they will point you in the right direction.
`;

const RULES_TITLE = "Community Rules";
const RULES_FOOTER = `The rules are not inclusive and detailed so they are subject to officer discretion. Not being able to follow these rules will result in consequences decided by officers.`;
const LINKS_TITLE = `Helpful Links`;
const LINKS_BODY = `[Our subreddit](https://www.reddit.com/r/WoWARD/)
[ARD FAQ](https://www.buzzfeed.com/mjs538/the-25-cutest-corgi-puppies-currently-online?utm_term=.fpX77bMnOA#.hnkdd6xZrM)`;
const CHANNELS_TITLE = "Channels";
const OPT_IN_TITLE = "Opt-in Roles and Channels";

module.exports = {
  name: "welcome",
  description: "Welcome ARD Message",
  async execute(client, message, args) {
    const reactionNumbers = [
      "\u0030\u20E3",
      "\u0031\u20E3",
      "\u0032\u20E3",
      "\u0033\u20E3",
      "\u0034\u20E3",
      "\u0035\u20E3",
      "\u0036\u20E3",
      "\u0037\u20E3",
      "\u0038\u20E3",
      "\u0039\u20E3"
    ];

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

    // roles
    const officers = await message.guild.roles
      .find(role => role.name === "Officer")
      .toString();
    const mvps = await message.guild.roles
      .find(role => role.name === "MVP")
      .toString();
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
    const WELCOME_BODY = `We are a cross-realm US-Horde community that was founded from a single Reddit post early in the Legion expansion. We pride ourselves on being an open and inclusive laid back group of gamers. We have an official guild on Horde-Bleeding Hollow. You DO NOT have to transfer or join our guild, but if you are interested in doing so, just speak to one of the ${officers}/${mvps}s and they will point you in the right direction.
    `;
    //prettier-ignore
    const RULES_BODY = `${reactionNumbers[1]} **We do not tolerate abusive behavior of any type.**
Many of our members are casual players, and everyone was new at one point. If you arenít here to have a good time, help people learn, and make a few jokes along the way, it may be best if you move along.

${reactionNumbers[2]} **No politics.  No religion.**
Just not worth the headache.

${reactionNumbers[3]} **No inappropriate names or profile pictures**.
Our ${generalChannel} channel is PG-13. We do not allow for lewd or inflammatory user names or discord profile pictures.

${reactionNumbers[4]} **Zero tolerance for sales**
We do not allow for the sale, for either in-game currency, or real world money, of any runs in this discord.  Please do not advertise any raids or groups that partake in these practices. Advertising sales in thsi discord will result in an immediate and permanent ban.

${reactionNumbers[5]} **Rules and Guidelines Documents** (these will eventually link to something)
Community Raid Guidelines
Progression Raid Guidelines
Outside Guild Recruitment Rules`;

    const CHANNELS_BODY = `${generalChannel}: Will be kept roughly PG in order to maintain a more welcoming public facing channel for people that might be checking out the guild for the first time or who may not have decided to take the plunge into ARD yet. It will be a good place for people new to ARD to ask questions and get to know people here. This channel is also where you will find advertising for any ARD sponsored content. These groups are run under ARD rules, within the ARD Discord.

${ardChat}: It is now visible to everyone green and up, meaning everyone that has chosen to become a part of the ARD community and are thus willing to accept all that comes with it. ARD rules will still apply in there, so keep it classy and don't be a douche canoe. Moderators will still be keeping an eye on things in there, but the reins will be a bit looser than general.

${raidChat} & ${pvpChat}: This category contains a raid and pvp channel. These channels are for advertising content groups that are not ARD affiliated. Typically they will be run through a platform other than the ARD Discord. We do not moderate these groups for atmosphere or recruitment, and any experiences, whether positive or negative, are not our responsibility. However, we will absolutely forbid runs with consistent negative experiences from advertising here.

${nsfwChat}: This channel should be fairly self-explanatory. It is opt-in only and will be minimally moderated, so enter at your own risk. Please keep it legal. Please don't go out of your way to suck. And understand that ARD does still have rules, so at the very least, keep politics, religion, and general douche-canoery either to yourself or in consensual private chats.11`;

    const OPT_IN_BODY = `**World of Warcraft**

- ${mythicPlusChat} (and: ${tank}, ${healer}, ${mdps}, ${rdps},  ${casual}, ${pushing})
- Lady Raid
- Bleeding Hollow
- Community Member
- PVP
- Beta

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

    const welcome = {
      color: 3447003,
      title: WELCOME_TITLE,
      description: WELCOME_BODY
    };
    await message.channel.send({ embed: welcome });

    const rules = {
      color: 3447003,
      title: RULES_TITLE,
      description: RULES_BODY,
      footer: {
        text: RULES_FOOTER
      }
    };
    await message.channel.send({ embed: rules });

    const links = {
      color: 3447003,
      title: LINKS_TITLE,
      description: LINKS_BODY
    };
    await message.channel.send({ embed: links });
    await message.channel.send(`https://discord.gg/ebG2wBv`);

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
