const RULES_TITLE = "Community Rules";
const RULES_FOOTER = `The rules are not inclusive and detailed so they are subject to officer discretion. Not being able to follow these rules will result in consequences decided by officers.`;
const config = require("./../config.json");

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
      .find(channel => channel.name === config.generalChannel)
      .toString();

    //prettier-ignore
    const RULES_BODY = `${reactionNumbers[1]} **We do not tolerate abusive behavior of any type.**
Many of our members are casual players, and everyone was new at one point. If you aren't here to have a good time, help people learn, and make a few jokes along the way, it may be best if you move along.

${reactionNumbers[2]} **No politics.  No religion.**
Just not worth the headache.

${reactionNumbers[3]} **No inappropriate names or profile pictures**.
Our ${generalChannel} channel is PG-13. We do not allow for lewd or inflammatory user names or Discord profile pictures.

${reactionNumbers[4]} **Zero tolerance for sales**
We do not allow for the sale, for either in-game currency, or real world money, of any runs in this Discord. Please do not advertise any raids or groups that partake in these practices. Advertising sales in this Discord will result in an immediate and permanent ban.

${reactionNumbers[5]} **Rules and Guidelines Documents**
[Code of Conduct](https://docs.google.com/document/d/1copKh7h-CqkLa3oSTDEm_JFD-uWZCfCC0QwMdHjoDe4/edit)
[Community Raid Guidelines](https://docs.google.com/document/d/1_cUgNi-moXRzbAkgeNrrBw6jQNoJrVcTamftTX-CFPY/edit)
[ARD Raid Leader Guidelines](https://docs.google.com/document/d/1r4r_ZYZ0lVSY6N4CCkLYoBISA4edhcY8sjUG1_3n6zQ/edit)
[Outside Guild Recruitment Rules](https://docs.google.com/document/d/11298J1ud-LkpKWzw2ZzM-_J6O8dCvUOKY7LwP6quhlQ/edit)`;
    const embed = {
      color: 3447003,
      title: RULES_TITLE,
      description: RULES_BODY,
      footer: {
        text: RULES_FOOTER
      }
    };
    await message.channel.send({ embed });
  }
};
