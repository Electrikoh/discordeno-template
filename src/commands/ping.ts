import { type Bot, type Interaction } from "@discordeno/bot";

export default {
  name: "ping",
  description: "Responds with pong!",
  execute: async (bot: Bot, interaction: Interaction) => {
    await interaction.respond("Pong!");
  },
};
