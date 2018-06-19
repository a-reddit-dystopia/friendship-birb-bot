module.exports = {
  name: "birbme",
  description: "Add me to the list motherlover",
  execute(client, message, args) {
    message.react("🤔");

    if (args.length === 2) {
      const embed = {
        color: 3447003,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        description: "HERE IS MY RESPONSE",
        fields: [
          {
            name: "✅ All set",
            value: "You are good to go buddy!"
          },
          {
            name: "Server",
            value: "✅ I found yo server"
          },
          {
            name: "Character",
            value: "✅ I found yo character"
          },
          {
            name: "Birb status",
            value: "✅ You do not currently have the friendship birb"
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "woof I am a dog"
        }
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
