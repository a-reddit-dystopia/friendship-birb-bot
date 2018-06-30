const WELCOME_TITLE = "Welcome to a Reddit Dystopia!";

module.exports = {
  name: "ard",
  description: "Welcome to ARD message",
  async execute(client, message, args) {
    // roles
    const officers = await message.guild.roles
      .find(role => role.name === "Officer")
      .toString();
    const mvps = await message.guild.roles
      .find(role => role.name === "MVP")
      .toString();

    const WELCOME_BODY = `We are a cross-realm US-Horde community that was founded from a single Reddit post early in the Legion expansion. We pride ourselves on being an open and inclusive laid back group of gamers. We have an official guild on Horde-Bleeding Hollow. You DO NOT have to transfer or join our guild, but if you are interested in doing so, just speak to one of the ${officers}/${mvps}s and they will point you in the right direction.
`;

    const embed = {
      color: 3447003,
      title: WELCOME_TITLE,
      description: WELCOME_BODY
    };
    await message.channel.send({ embed });
  }
};
