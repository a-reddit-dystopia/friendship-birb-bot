module.exports = {
  name: "birbme",
  description: "Add me to the list motherlover",
  execute(message, args) {
    message.react("🤔");

    if (args.length === 2) {
      message.channel.send(`${args}`, { reply: message });
    } else {
      message.channel.send(
        `I need you to send me your character name, then server name in dash-case, ie bleeding-hollow not Bleeding Hollow`,
        { reply: message }
      );
    }
  }
};
