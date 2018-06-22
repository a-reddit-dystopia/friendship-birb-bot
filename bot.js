const Discord = require("discord.js");
const logger = require("winston");
const request = require("request");
const fs = require("fs");

const prefix = "elroy ";
const otherPrefix = "Elroy ";

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});
logger.level = "debug";
// Initialize Discord Bot
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("ready", function(evt) {
  logger.info("Connected");
});

client.on("message", async message => {
  const prefixRegex = new RegExp(
    `^(<@!?${client.user.id}>|\\${prefix}|\\${otherPrefix})\\s*`
  );
  if (
    !prefixRegex.test(message.content) ||
    !(
      message.channel.id === process.env.channel ||
      message.channel.id === process.env.TESTCHAN
    )
  )
    return;

  const [, matchedPrefix] = message.content.match(prefixRegex);
  const args = message.content
    .slice(matchedPrefix.length)
    .trim()
    .split(/ +/);
  const command = args.shift();
  logger.debug(command.toLowerCase());

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(client, message, args);
  } catch (error) {
    console.info(error);
    message.reply("arf! There was an error!");
  }
});

client.login(process.env.TOKEN);
