module.exports = {
  name: "Authorization Check",
  description: "Check to see if a user is authorized to make this command.",
  isNotAuthorized(message) {
    const isNotAdmin = !message.member.roles.find("name", "Elroy Admin");
    if (isNotAdmin) {
      message.reply("Sorry you cannot execute this command.");
    }
    return isNotAdmin;
  }
};
