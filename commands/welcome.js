const WELCOME_TITLE = "Welcome to a Reddit Dystopia!";
const WELCOME_BODY = `We are a cross-realm US-Horde community that was founded from a single Reddit post early in the Legion expansion. We pride ourselves on being an open and inclusive laid back group of gamers. We have an official guild on Horde-Bleeding Hollow. You DO NOT have to transfer or join our guild, but if you are interested in doing so, just speak to one of the Officers/MVPs and they will point you in the right direction.
`;

const RULES_TITLE = "Community Rules";
const RULES_FOOTER = `The rules are not inclusive and detailed so they are subject to officer discretion. Not being able to follow these rules will result in consequences decided by officers.`;
const LINKS_TITLE = `Helpful Links`;
const LINKS_BODY = `[Our subreddit](https://www.reddit.com/r/WoWARD/)
[ARD FAQ](https://www.buzzfeed.com/mjs538/the-25-cutest-corgi-puppies-currently-online?utm_term=.fpX77bMnOA#.hnkdd6xZrM)`;

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
    const generalChannel = await message.guild.channels
      .find(channel => channel.name === "general")
      .toString();
    const officers = await message.guild.roles
      .find(role => role.name === "Officer")
      .toString();
    const mvps = await message.guild.roles
      .find(role => role.name === "MVP")
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
  }
};
