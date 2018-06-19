module.exports = {
  name: "ping",
  description: "Ping!",
  execute(client, message, args) {
    message.channel.send("pong", { reply: message });
    message.react("🙌");
  }
};
