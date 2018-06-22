module.exports = {
  name: "add",
  description: "Give a discord user the birb role",
  execute(client, message, args) {
    if (!message.member.roles.find("name", "Elroy Admin")) {
      return message.reply("Sorry you cannot execute this command.");
    }
    const taggedUsers = message.mentions.users;
    const role = message.guild.roles.find("name", "AOTC Winner");

    taggedUsers.forEach(user => user.addRole(role));

    message.reply("Arf! Done!");
  }
};
