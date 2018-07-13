const check = require("../utils/authorization-check");

module.exports = {
  name: "raids",
  description: "ARD community raids",
  async execute(client, message, args) {
    if (check.isNotAuthorized(message)) {
      return;
    }
    const NORMAL_ILVL = "920";
    const HEROIC_ILVL = "930";
    const TITLE = "🌟 ARD Community Raids 🌟";
    const BODY = `The only requirement we have for community raids is ilvl - You should be at ilvl ${NORMAL_ILVL} or higher for normal, and ilvl ${HEROIC_ILVL} or higher for heroic. All times are Eastern.`;
    const fields = [
      { name: "Sunday 8pm", value: "FuT Beer run (Normal ABT)" },
      { name: "Monday 8pm", value: `Denny's (Heroic ABT)` },
      { name: "Wednesday 3:30pm", value: `Afternoon Delight (Normal ABT)` },
      { name: "Thursday 3:30pm", value: `Afternoon Delight (Heroic ABT)` },
      { name: "Friday 7pm", value: `Pregame Raid (Normal WB>Agg>Argus)` },
      {
        name: "Friday 10pm",
        value: `The drunk Raid (fun random shenanigans) aka "ARD After Dark" -- attend at your own risk`
      },
      { name: "Saturday 10:30pm", value: `Pip n Sharrq (Normal ABT)` }
    ];
    const embed = {
      color: 3447003,
      title: TITLE,
      description: BODY,
      fields: fields
    };
    //await message.channel.send({ embed });
  }
};
