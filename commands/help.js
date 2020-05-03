module.exports = {
  name: "help",
  description: "help command",
  execute(client, message, args) {
    if (message.member.roles.find("name", "Elroy Admin")) {
      const adminMsg = `Elroy Admin help command!
** Add ** - adds the 'Dragon Winner' role to discord user(s)
elroy add @biebear (you can tag multiple people)
** Yank ** - removes the 'Dragon Winner role from discord user(s)
elroy yank @pip (you can tag multiple people)
** Remove ** - takes a discord user off the contestant list
elroy remove @sharrq (you can tag multiple people)
** Lottery ** - announces N users as winners
elroy lottery 3 (announces 3 winners)
** Set ** - sets elroy config options
elroy set lottery enabled
elroy set lottery disabled
elroy set inviteMessage '/w piprunetotem-bleeding-hollow pirate'`;
      message.author.send(adminMsg);
    }
    const msg = `Elroy help command!
** Fetch ** - retrieve the contestant link
elroy fetch
** Enter ** - get yourself on the friendship dragon list
elroy enter *character name* *server name* (be sure to use dashes instead of spaces on server name!)`;
    message.reply(msg);
  }
};
