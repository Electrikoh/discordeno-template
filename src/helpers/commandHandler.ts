// src/commandHandler.ts
import { type Bot, type Interaction } from "@discordeno/bot";
import { readdirSync } from "fs";
import { join } from "path";
import { getDirname } from "./dirNameHelper.js";

const commands = new Map<string, any>();
const __dirname = getDirname(import.meta.url);

export const loadCommands = async () => {
  const commandFiles = readdirSync(join(__dirname, "../commands")).filter(
    (file) => file.endsWith(".js")
  );

  for (const file of commandFiles) {
    const commandModule = await import(`../commands/${file}`);
    const command = commandModule.default; // Handle default export

    commands.set(command.name, command);
  }
};

export const handleCommand = async (bot: Bot, interaction: Interaction) => {
  if (!interaction.data?.name) return;

  const command = commands.get(interaction.data.name);

  console.log(`Executing command: ${interaction.data.name}`);
  await command.execute(bot, interaction);
};
