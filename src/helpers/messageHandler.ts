import { type Bot, type Message } from "@discordeno/bot";
import messageResponses from "../messages/messageResponses.js";

interface MessageResponses {
  [key: string]: string;
}
const responses: MessageResponses = messageResponses as MessageResponses;

export function handleMessage(bot: Bot, message: Message) {
  randomFunction(bot, message);
  checkForMessages(bot, message);
}

function randomFunction(bot: Bot, message: Message) {
  let amogus = Math.random() < 0.2;
  if (amogus) {
    bot.helpers.sendMessage(message.channelId, {
      content: "This message appears 20% of the time",
    });
  }
}

/** Responds to respective messages in /src/messages/messageResponses.ts */
function checkForMessages(bot: Bot, message: Message) {
  if (!message.content) return;

  for (const item in messageResponses) {
    if (message.content == item) {
      bot.helpers.sendMessage(message.channelId, {
        content: responses[item],
        messageReference: {
          messageId: message.id,
          failIfNotExists: false,
        },
      });
    }
  }
}
