module.exports = {
  name: "fetch",
  description: "Stop trying to make fetch happen",
  execute(client, message, args) {
    const embed = {
      color: 3447003,
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
      },
      title: "Listing of Friendship birb contestants",
      description: "The link has the most recent contestant information",
      url: `${process.env.API}`,
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL,
        text: "woof I am dog"
      }
    };
    message.channel.send({ embed });
  }
};
