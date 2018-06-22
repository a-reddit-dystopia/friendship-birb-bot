module.exports = {
  name: "help",
  description: "help command",
  execute(client, message, args) {
    if (message.member.roles.find("name", "Elroy Admin")) {
      const adminMsg = `Elroy Admin help command!
** Add ** - adds the 'AOTC Winner' role to discord user(s)
elroy add @biebear (you can tag multiple people)
** Yank ** - removes the 'AOTC Winner role from discord user(s)
elroy yank @pip (you can tag multiple people)
** Remove ** - takes a discord user off the contestant list
elroy remove @sharrq (you can tag multiple people)
** Lottery ** - announces N users as winners
elroy lottery 3 (announces 3 winners)`;
      message.author.send(adminMsg);
    }
    const msg = `Elroy help command!
** Fetch ** - retrieve the contestant link
elroy fetch
** Birbme ** - get yourself on the friendship birb list
elroy birbme *character name* *server name* (be sure to use dashes instead of spaces on server name!)`;
    message.reply(msg);
  }
};
