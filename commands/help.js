module.exports = {
  name: "help",
  description: "help command",
  execute(client, message, args) {
    if (message.member.roles.find("name", "Elroy Admin")) {
      // admin help
    }
    const msg = `Elroy help command!
** Fetch ** - retrieve the contestant link
elroy fetch
** Birbme ** - get yourself on the friendship birb list
elroy birbme *character name* *server name* (be sure to use dashes instead of spaces on server name!)`;
    message.reply(msg);
  }
};
