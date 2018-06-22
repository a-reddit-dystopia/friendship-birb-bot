module.exports = {
  name: "move",
  description: "Move members into the winners channel",
  execute(client, message, args) {
    if (!message.member.roles.find("name", "Elroy Admin")) {
      return message.reply("Sorry you cannot execute this command.");
    }
    const taggedUsers = message.mentions.users;
    const channel = message.guild.channels.find(
      "name",
      "FriendshipBirb Winners"
    );

    taggedUsers.forEach(async function(user) {
      const member = await message.guild.fetchMember(user);
      member.setVoiceChannel(channel);
    });

    message.reply("Arf! Done!");
  }
};
