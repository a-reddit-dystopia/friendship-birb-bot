const check = require("../utils/authorization-check");
module.exports = {
  name: "invite",
  description: "Sends winners an invite DM",
  execute(client, message, args) {
    if (check.isNotAuthorized(message)) {
      return;
    }
  }
};
