class BotState {
  constructor({ lotteryEnabled = false, inviteMessage = "" }) {
    this.lotteryStatus = lotteryEnabled;
    this.currentMessage = inviteMessage;
  }

  get inviteMessage() {
    return this.currentMessage;
  }

  get lotteryEnabled() {
    return this.lotteryStatus;
  }

  set inviteMessage(message) {
    this.currentMessage = message;
    // TODO: save new message to db
  }

  set lotteryEnabled(enabled) {
    this.lotteryStatus = enabled;
    // TODO: save new status to db
  }
}

module.exports = BotState;
