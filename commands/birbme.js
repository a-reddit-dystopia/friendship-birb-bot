module.exports = {
  name: "birbme",
  description: "Add me to the list motherlover",
  execute(client, message, args) {
    message.react("🤔");

    if (args.length === 2) {
      message.channel.send(`${args}`, { reply: message });
      const embed = {
        color: 3447003,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        description: "HERE IS MY RESPONSE",
        fields: [
          {
            name: "Server",
            value: "✅ I found yo server"
          }
        ]
      };
      message.reply({ embed });
    } else {
      message.channel.send(
        `I need you to send me your character name, then server name in dash-case, ie bleeding-hollow not Bleeding Hollow`,
        { reply: message }
      );
    }
  }
};
