import { createBot } from "@discordeno/bot";
import { type CreateApplicationCommand } from "@discordeno/types";
import { readdirSync } from "fs";
import { join, resolve } from "path";
import { getDirname } from "./dirNameHelper.js";
import dotenv from "dotenv";

dotenv.config();

const __dirname = getDirname(import.meta.url);
export const bot = createBot({
  token: process.env.TOKEN as string,
});

let commands: CreateApplicationCommand[] = [];

const commandFiles = readdirSync(join(__dirname, "../commands")).filter(
  (file) => file.endsWith(".js")
);

for (const file of commandFiles) {
  const commandPath = resolve(join(__dirname, "../commands", file));

  const commandFile = await import(`file://${commandPath}`);

  if (
    commandFile.default &&
    commandFile.default.name &&
    commandFile.default.description
  ) {
    commands.push({
      name: commandFile.default.name,
      description: commandFile.default.description,
      options: commandFile.default.options || [],
    });
  } else {
    console.error(`Command file ${file} is missing required properties.`);
  }
}

console.log(commands);

bot.helpers.upsertGlobalApplicationCommands(commands);
// This is pretty much just for testing since global upsert takes some time
bot.helpers.upsertGuildApplicationCommands(
  process.env.GUILD_ID as string,
  commands
);

console.log("Registered commands.");

bot.shutdown();
