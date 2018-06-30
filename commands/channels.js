const CHANNELS_TITLE = "Channels";

module.exports = {
  name: "channels",
  description: "ARD core channels",
  async execute(client, message, args) {
    // chans
    const generalChannel = message.guild.channels
      .find(channel => channel.name === "general")
      .toString();
    const ardChat = message.guild.channels
      .find(channel => channel.name === "ardchat")
      .toString();
    const raidChat = message.guild.channels
      .find(channel => channel.name === "raid")
      .toString();
    const pvpChat = message.guild.channels
      .find(channel => channel.name === "pvp")
      .toString();
    const nsfwChat = message.guild.channels
      .find(channel => channel.name === "nsfw-shitposting")
      .toString();

    const CHANNELS_BODY = `${generalChannel}: Will be kept roughly PG in order to maintain a more welcoming public facing channel for people that might be checking out the guild for the first time or who may not have decided to take the plunge into ARD yet. It will be a good place for people new to ARD to ask questions and get to know people here. This channel is also where you will find advertising for any ARD sponsored content. These groups are run under ARD rules, within the ARD Discord.

${ardChat}: It is now visible to everyone green and up, meaning everyone that has chosen to become a part of the ARD community and are thus willing to accept all that comes with it. ARD rules will still apply in there, so keep it classy and don't be a douche canoe. Moderators will still be keeping an eye on things in there, but the reins will be a bit looser than general.

${raidChat} & ${pvpChat}: This category contains a raid and pvp channel. These channels are for advertising content groups that are not ARD affiliated. Typically they will be run through a platform other than the ARD Discord. We do not moderate these groups for atmosphere or recruitment, and any experiences, whether positive or negative, are not our responsibility. However, we will absolutely forbid runs with consistent negative experiences from advertising here.

${nsfwChat}: This channel should be fairly self-explanatory. It is opt-in only and will be minimally moderated, so enter at your own risk. Please keep it legal. Please don't go out of your way to suck. And understand that ARD does still have rules, so at the very least, keep politics, religion, and general douche-canoery either to yourself or in consensual private chats.11`;
    const embed = {
      color: 3447003,
      title: CHANNELS_TITLE,
      description: CHANNELS_BODY
    };
    await message.channel.send({ embed });
  }
};
