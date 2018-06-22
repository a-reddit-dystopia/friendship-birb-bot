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
    drawWinner(message, number);
  }
};

function drawWinner(message, number) {
  request.post(
    "https://friendship-birb-api.herokuapp.com/api/lotteries.json",
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
        users.forEach(user => {
          msg.push(
            `<@${user.attributes.discord_id}> (${user.attributes.wow_name} of ${
              user.attributes.wow_server
            })`
          );
          sendDM(user.attributes.discord_id, message);
        });
        const text = msg.join(", ");
        message.channel.send(
          `Congrats ${text} are the winner(s)! Follow directions to get your birb!`
        );
      } else if (response.statusCode === 422) {
        message.channel.send(`We have drawn all the birbs! Congrats fam!`);
      } else {
        message.channel.send(`Arf! Something went horribly wrong.`);
      }
    }
  );
}

async function sendDM(discordId, message) {
  const member = await message.guild.fetchMember(discordId);
  logger.info(member);
  if (member) {
    const msg = `Congratulations! You have won the ARD AOTC/FriendshipBirb Lottery! Please join the "FriendshipBirb Winners" Voice Channel so you can get added to the next group. If you do not join that channel within
    the next few minutes then we will skip you and draw someone elses name.

    Some things to remember for the actual run

    ${459512160696008714} On Pull, stand in front of the boss and die to the frontal cleave. This ensures that mechanics are targted onto our people so there are no unnecessary wipes.
    ${459512455836729344} When the boss kills the entire raid team, Release Spirit and avoid the Sha creatures. Do NOT walk into the tree.
    ${459512530834817044} while in the ghost phase, collect small orbs to give the raid team a damage buff.
    ${459512606512644097} Once you have your mount, we would appreciate it if you send a screenshot of you on your new mount to us on Twitter @WoW_ARD with the hashtag #FriendshipBirb.`;
    member.send(msg);
  }
}
