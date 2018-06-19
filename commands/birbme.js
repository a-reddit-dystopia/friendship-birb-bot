module.exports = {
  name: "birbme",
  description: "Add me to the list motherlover",
  execute(message, args) {
    message.react("🤔");

    if (args.length === 3) {
    } else {
      message.channel.send(`${args.length} \n ${args}`, { reply: message });
    }
  }
};
