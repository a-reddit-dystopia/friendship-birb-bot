const RULES_TITLE = "Community Rules";

module.exports = {
  name: "rules",
  description: "The rules of toombz",
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
    const generalChannel = message.guild.channels
      .find(channel => channel.name === "general")
      .toString();

    //prettier-ignore
    const RULES_BODY = `${reactionNumbers[1]} **We do not tolerate abusive behavior of any type.**
Many of our members are casual players, and everyone was new at one point. If you arenít here to have a good time, help people learn, and make a few jokes along the way, it may be best if you move along.  **NO OFFENSIVE DISCORD PICTURES OR NAMES**

${reactionNumbers[2]} **No politics.  No religion.**
Just not worth the headache. We try and keep all interactions positive.  Respect other people's opinions.

${reactionNumbers[3]} We have two different type of Raids here: Community Raid and Progression Raid.  Community Raids are listed below (that list is subject to change).  To join you just have to respond to the raid leader when the raid starts, which will be by a ping in the ${generalChannel} channel.  These raids typically have minimum requirements and are teaching/learning runs.  If you are interested in a more permanent team, you can check out our recruitment section (currently being updated) to find a Progression raid team.

${reactionNumbers[4]} **We do not allow for the sale of any runs in this discord.**

${reactionNumbers[5]} Lastly, don't be a Douche Canoe.  What's a Douche Canoe?  Please read the ARD Code of Conduct: https://docs.google.com/document/d/1mHKf22YcLGtZDdfdfpm40d3TRmKpoH2KDDAq4hcdc3Y/edit#heading=h.mlgqvaf9t7qd

🌟 Welcome to ARD, we love you! 🌟
`;
    const embed = {
      color: 3447003,
      title: RULES_TITLE,
      description: RULES_BODY
    };
    await message.channel.send({ embed });

    await message.channel.send(
      `https://docs.google.com/document/d/1mHKf22YcLGtZDdfdfpm40d3TRmKpoH2KDDAq4hcdc3Y/edit#heading=h.mlgqvaf9t7qd`
    );
  }
};
