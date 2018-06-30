const ard = require("./ard.js");
const rules = require("./rules.js");
const links = require("./links.js");
const channels = require("./channels.js");
const roles = require("./roles.js");
const raids = require("./raids.js");

module.exports = {
  name: "welcome",
  description: "Welcome ARD Message",
  async execute(client, message, args) {
    await ard.execute(client, message, args);
    await rules.execute(client, message, args);
    await links.execute(client, message, args);
    await channels.execute(client, message, args);
    await roles.execute(client, message, args);
    await raids.execute(client, message, args);
  }
};
