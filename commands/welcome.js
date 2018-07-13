const ard = require("./ard.js");
const rules = require("./rules.js");
const links = require("./links.js");
const raids = require("./raids.js");
const check = require("../utils/authorization-check");

module.exports = {
  name: "welcome",
  description: "Welcome ARD Message",
  async execute(client, message, args) {
    if (check.isNotAuthorized(message)) {
      return;
    }

    await ard.execute(client, message, args);
    await rules.execute(client, message, args);
    await links.execute(client, message, args);
    //await raids.execute(client, message, args);
  }
};
