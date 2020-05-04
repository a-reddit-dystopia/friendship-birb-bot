class BotState {
  constructor({ lotteryEnabled = false, inviteMessage = "", apiToken = "" }) {
    this.lotteryStatus = lotteryEnabled;
    this.currentMessage = inviteMessage;
    this.token = apiToken;
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

  get token() {
    return this.apiToken;
  }

  set token(token) {
    this.apiToken = token;
  }
}

module.exports = BotState;
