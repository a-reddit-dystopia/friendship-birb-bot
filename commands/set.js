module.exports = {
  name: "set",
  description: "Set config options",
  execute(client, message, args, state) {
    const actionType = args[0];
    const actionValue = args.shift().join(" ");

    if (actionType === "lottery") {
      state.lotteryEnabled = actionValue === "enabled" ? true : false;
    }

    if (actionType === "inviteMessage") {
      state.inviteMessage = actionValue;
    }
  }
};
