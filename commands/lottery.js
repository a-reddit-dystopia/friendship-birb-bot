const request = require("request");
const logger = require("winston");

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});
logger.level = "debug";

module.exports = {
  name: "lottery",
  description: "Make a birb drawing",
  async execute(client, message, args) {
    if (!message.member.roles.find("name", "Elroy Admin")) {
      return message.reply("Sorry you cannot execute this command.");
    }
    const number = args[0] || 1;
    if (number <= 10) {
      drawWinner(message, number);
    } else {
      message.reply("I can only draw ten people at once!");
    }
  }
};

async function drawWinner(message, number) {
  let winners = [];
  const filter = msg => {
    logger.debug("filter");
    logger.debug(msg.author.id);
    logger.debug(msg.content);
    return (
      winners.includes(msg.author.id) &&
      msg.content.toLowerCase().startsWith("here")
    );
  };
  request.post(
    `${process.env.API}api/lotteries.json`,
    {
      auth: {
        bearer: process.env.elroy
      },
      form: {
        amount: number
      }
    },
    (error, response, body) => {
      logger.debug(response.statusCode);
      const json = JSON.parse(body);
      logger.debug(json);

      if (response.statusCode === 201) {
        const users = json.data;
        let msg = [];
        users.forEach(async function(user) {
          msg.push(
            `<@${user.attributes.discord_id}> (${user.attributes.wow_name} of ${
              user.attributes.wow_server
            })`
          );
          const member = await message.guild.fetchMember(
            user.attributes.discord_id
          );
          sendDM(member);
          //addRole(member, message.guild);
          //setVoice(member, message.guild);
          winners.push(user.attributes.discord_id);
          try {
            const collected = await message.channel.awaitMessages(filter, {
              maxMaches: winners.legnth,
              time: 90000
            });
            collected.forEach(msg => logger.debug(msg.content));
            logger.debug("oh yeah");
          } catch (error) {
            logger.debug(error);
          }
        });
        const text = msg.join(", ");
        message.channel.send(
          `Congrats ${text} are the winner(s)! I've sent you a PM with instructions! Please check the message.`
        );
      } else if (response.statusCode === 422) {
        message.channel.send(`We have drawn all the birbs! Congrats fam!`);
      } else {
        message.channel.send(`Arf! Something went horribly wrong.`);
      }
    }
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
    "\u0039\u20E3"
  ];
  if (member) {
    const msg = `Congratulations! You have won the ARD AOTC/FriendshipBirb Lottery! Please join the "FriendshipBirb Winners" Voice Channel so you can get added to the next group. If you do not join that channel within
the next few minutes then we will skip you and draw someone elses name.

Some things to remember for the actual run

${
      reactionNumbers[1]
    } On Pull, stand in front of the boss and die to the frontal cleave. This ensures that mechanics are targted onto our people so there are no unnecessary wipes.
${
      reactionNumbers[2]
    } When the boss kills the entire raid team, Release Spirit and avoid the Sha creatures. Do NOT walk into the tree.
${
      reactionNumbers[3]
    } while in the ghost phase, collect small orbs to give the raid team a damage buff.
${
      reactionNumbers[4]
    } Once you have your mount, we would appreciate it if you send a screenshot of you on your new mount to us on Twitter @WoW_ARD with the hashtag #FriendshipBirb.`;
    member.send(msg);
  }
}

async function addRole(member, guild) {
  const role = guild.roles.find("name", "AOTC Winner");
  if (member && role) {
    member.addRole(role, "I am dog");
  }
}

function setVoice(member, guild) {
  const channel = guild.channels.find("name", "FriendshipBirb Winners");
  if (member && channel) {
    member.setVoiceChannel(channel);
  }
}
