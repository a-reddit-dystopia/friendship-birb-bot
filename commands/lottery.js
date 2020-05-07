const request = require("request-promise-native");
const logger = require("winston");
const check = require("../utils/authorization-check");
const config = require("./../config.json");

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true,
});
logger.level = "debug";

module.exports = {
  name: "lottery",
  description: "Make an AOTC drawing",
  async execute(client, message, args, state) {
    if (check.isNotAuthorized(message)) {
      return;
    }
    if (!state.lotteryEnabled) {
      return message.reply(
        "The lottery is not currently enabled. Please enable with 'elroy set lottery enabled'"
      );
    }
    const number = args[0] || 1;
    if (number <= 10) {
      drawWinner(message, number);
    } else {
      message.reply("I can only draw ten people at once!");
    }
  },
};

async function drawWinner(message, number) {
  try {
    const body = await request.post(`${process.env.API}api/lotteries.json`, {
      auth: {
        bearer: process.env.elroy,
      },
      form: {
        amount: number,
      },
    });
    const json = JSON.parse(body);
    const users = json.data;
    await makeTheLotteryHappen(message, users);
  } catch (error) {
    message.channel.send(
      `We have drawn all the AOTC contestants! Congrats fam!`
    );
  }
}

function makeTheLotteryHappen(message, users) {
  let winners = [];
  const filter = (msg) => {
    return (
      winners.includes(msg.author.id) &&
      msg.content.toLowerCase().includes("here")
    );
  };
  let msg = [];
  users.forEach(async function (user) {
    msg.push(
      `<@${user.attributes.discord_id}> (${user.attributes.wow_name} of ${user.attributes.wow_server})`
    );
    const member = await message.guild.fetchMember(user.attributes.discord_id);
    sendDM(member);
    winners.push(user.attributes.discord_id);
  });
  const collector = message.channel.createMessageCollector(filter, {
    time: config.winningTimeout,
    maxMatches: winners.length,
  });
  collector.on("collect", (m) => {
    addRole(m.member, m.guild);
    setVoice(m.member, m.guild);
    m.reply(
      "I've got you down! Make sure you have joined the AOTC Winners voice channel to receive the next phase of instructions!"
    );
  });
  collector.on("end", async function (collected) {
    const ids = collected.map((msg) => msg.author.id);
    const missing = winners.filter((x) => !ids.includes(x));
    missing.forEach((id) =>
      message.channel.send(
        `Whoops <@${id}> did not respond in time and was removed from the lottery.`
      )
    );
    if (missing.length > 0) {
      drawWinner(message, missing.length);
    }
  });
  const text = msg.join(", ");
  message.channel.send(
    `Congrats ${text} are the winner(s)! I've sent you a PM with instructions! Please check the message. **Also, please respond in this channel with the word "here" to reserve your place.**`
  );
}

function sendDM(member) {
  const reactionNumbers = [
    "\u0030\u20E3",
    "\u0031\u20E3",
    "\u0032\u20E3",
    "\u0033\u20E3",
    "\u0034\u20E3",
    "\u0035\u20E3",
    "\u0036\u20E3",
    "\u0037\u20E3",
    "\u0038\u20E3",
    "\u0039\u20E3",
  ];
  if (member) {
    const msg = `Congratulations! You have won the ARD AOTC Lottery! **If you do not respond to Elroy within three minutes in the ${process.env.aotcChannel} channel he will remove you from the lottery. He expects you to say "here" to move along. ** Please join the "AOTC Winners" Voice Channel so you can get added to the next group after you have reserved your place.

Some things to remember for the actual run

${reactionNumbers[1]} On Pull, junmp off the edge of the room. This ensures that mechanics are targted onto our people so there are no unnecessary wipes.
${reactionNumbers[2]} Once you have your mount, we would appreciate it if you send a screenshot of you on your new mount to us on Twitter @WoW_ARD with the hashtag #FriendshipBirb.`;
    member.send(msg);
  }
}

async function addRole(member, guild) {
  const role = guild.roles.find("name", process.env.winnerRole);
  if (member && role) {
    member.addRole(role, "I am dog");
  }
}

function setVoice(member, guild) {
  const channel = guild.channels.get(process.env.onDeckChannel);
  if (member && channel) {
    member.setVoiceChannel(channel);
  }
}
