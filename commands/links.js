const check = require("../utils/authorization-check");

const LINKS_TITLE = `Helpful Links`;
const LINKS_BODY = `[Code of Conduct](https://docs.google.com/document/d/1copKh7h-CqkLa3oSTDEm_JFD-uWZCfCC0QwMdHjoDe4/edit)
[Our subreddit](https://www.reddit.com/r/WoWARD/)
[ARD FAQ](https://docs.google.com/document/d/1yX7U1z2svFpuDgjNvq4Y92MrSXvMRujPiTcja-kYcGA/edit)`;

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
    await message.channel.send(`** Our Alliance Guild's Discord **`);
    await message.channel.send(`https://discord.gg/ebG2wBv`);
  }
};
