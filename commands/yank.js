module.exports = {
  name: "yank",
  description: "Remove a role from a discord user",
  execute(client, message, args) {
    if (!message.member.roles.find("name", "Elroy Admin")) {
      return message.reply("Sorry you cannot execute this command.");
    }
    const taggedUsers = message.mentions.users;
    const role = message.guild.roles.find("name", "AOTC Winner");

    taggedUsers.forEach(async function(user) {
      const member = await message.guild.fetchMember(user);
      member.removeRole(role, "I am a vengeful dog");
    });

    message.reply("Arf! Done!");
  }
};
