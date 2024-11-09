import type { Bot, Emoji, Member, User } from "@discordeno/bot";

export async function handleAddReaction(
  bot: Bot,
  reaction: {
    userId: bigint;
    channelId: bigint;
    messageId: bigint;
    guildId?: bigint | undefined;
    member?: Member | undefined;
    user?: User | undefined;
    emoji: Emoji;
    messageAuthorId?: bigint | undefined;
  }
) {
  const messageAuthor = await bot.helpers.getUser(
    reaction.messageAuthorId!.toString()
  );

  bot.helpers.sendMessage(reaction.channelId, {
    content: `<@${reaction.member?.user?.id}> sent ${reaction.emoji.name} on <@${messageAuthor.id}>s message`,
  });
}
