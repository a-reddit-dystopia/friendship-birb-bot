const check = require("../utils/authorization-check");

const LINKS_TITLE = `Helpful Links`;
const LINKS_BODY = `[Code of Conduct](https://docs.google.com/document/d/1mHKf22YcLGtZDdfdfpm40d3TRmKpoH2KDDAq4hcdc3Y/edit#heading=h.mlgqvaf9t7qd)
[Our subreddit](https://www.reddit.com/r/WoWARD/)
[ARD FAQ](https://www.reddit.com/r/WoWARD/comments/5jna3s/a_reddit_dystopia_frequently_asked_questions/)`;

module.exports = {
  name: "links",
  description: "List ARD links",
  async execute(client, message, args) {
    if (check.isNotAuthorized(message)) {
      return;
    }
    const embed = {
      color: 3447003,
      title: LINKS_TITLE,
      description: LINKS_BODY
    };
    await message.channel.send({ embed });
    await message.channel.send(`https://discord.gg/ebG2wBv`);
  }
};
