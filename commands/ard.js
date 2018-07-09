const WELCOME_TITLE = "Welcome to a Reddit Dystopia!";

module.exports = {
  name: "ard",
  description: "Welcome to ARD message",
  async execute(client, message, args) {
    // roles
    const officers = message.guild.roles
      .find(role => role.name === "Officer")
      .toString();
    const mvps = message.guild.roles
      .find(role => role.name === "MVP")
      .toString();
    const mods = message.guild.roles
      .find(role => role.name === "Moderator")
      .toString();

    const WELCOME_BODY = `Welcome to A Reddit Dystopia! We are a cross-realm US-Horde community that prides ourselves on being open and inclusive. We have an official guild on Bleeding Hollow that anyone can join at any time. There is no requirement to join the guild or server transfer to participate in any event that can be done cross-realm. If you have questions that are not covered below, please speak to one of the ${officers}/${mods}/${mvps}s and they will point you in the right direction.`;
    const embed = {
      color: 3447003,
      title: WELCOME_TITLE,
      description: WELCOME_BODY
    };
    await message.channel.send({ embed });
  }
};
