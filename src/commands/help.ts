import { type Bot, type Interaction } from "@discordeno/bot";
import { readdirSync } from "fs";
import { join } from "path";
import { getDirname } from "../helpers/dirNameHelper.js";
let commands: {
  name: string;
  description: string;
  options: [
    {
      name: string;
      description: string;
      type: number;
      required: boolean;
    }
  ];
}[] = [];

let embed = {};

export async function loadHelpCommand() {
  const __dirname = getDirname(import.meta.url);
  const commandFiles = readdirSync(join(__dirname, "../commands")).filter(
    (file) => file.endsWith(".js")
  );

  for (const file of commandFiles) {
    const commandFile = await import(`../commands/${file}`);

    commands.push({
      name: commandFile.default.name,
      description: commandFile.default.description,
      options: commandFile.default.options,
    });
  }

  embed = {
    title: "List of commands :",
    color: 0xaf139a,
    fields: commands.map((command) => {
      return {
        name: `\`/${command.name} ${
          command.options ? "[" + command.options[0].name + "]" : ""
        }\``,
        value: `${command.description}`,
        inline: false,
      };
    }),
  };
}

export default {
  name: "help",
  description: "Shows all commands",

  execute: async (bot: Bot, interaction: Interaction) => {
    // Send the embed as a response to the interaction
    await bot.helpers.sendInteractionResponse(
      interaction.id,
      interaction.token,
      {
        type: 4,
        data: {
          embeds: [embed],
        },
      }
    );
  },
};
