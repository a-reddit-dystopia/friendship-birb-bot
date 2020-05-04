class BotState {
  constructor({ lotteryEnabled = false, inviteMessage = "", apiToken = "" }) {
    this.lotteryStatus = lotteryEnabled;
    this.currentMessage = inviteMessage;
    this.apiToken = apiToken;
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

  get apiToken() {
    return this.apiToken;
  }

  set apiToken(token) {
    this.apiToken = token;
  }
}

module.exports = BotState;
