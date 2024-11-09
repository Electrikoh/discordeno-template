import { createBot, Intents } from "@discordeno/bot";
import modifyDesiredProperties from "./helpers/desiredProperties.js";
import { handleCommand, loadCommands } from "./helpers/commandHandler.js";
import { handleMessage } from "./helpers/messageHandler.js";
import { handleAddReaction } from "./helpers/reactionHandler.js";
import { loadHelpCommand } from "./commands/help.js";
import dotenv from "dotenv";
dotenv.config();

export const bot = createBot({
  token: process.env.TOKEN as string,
  intents:
    Intents.Guilds |
    Intents.GuildMessages |
    Intents.MessageContent |
    Intents.GuildMessageReactions |
    Intents.GuildMembers,
  events: {
    ready: async (data) => {
      console.log(`Bot is running ! Shard ${data.shardId}`);
      loadCommands();
      loadHelpCommand();
    },
    async interactionCreate(interaction) {
      await handleCommand(bot, interaction);
    },
  },
});

modifyDesiredProperties(bot);

bot.events.messageCreate = (message) => {
  if (message.author.bot) return;
  handleMessage(bot, message);
};

bot.events.reactionAdd = (reaction) => {
  handleAddReaction(bot, reaction);
};

await bot.start();
