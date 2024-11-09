import type { Bot } from "@discordeno/bot";

/** Everything you use within the bot must be added here.
 *
 * This is done to decrease bloat incredibly, it's great !
 *
 * If you're getting some variable as undefined, make sure you've got it added here first c: */

export default function modifyDesiredProperties(bot: Bot) {
  const desiredProperties = bot.transformers.desiredProperties;
  const interaction = desiredProperties.interaction;
  const member = desiredProperties.member;
  const user = desiredProperties.user;
  const message = desiredProperties.message;
  const attachment = desiredProperties.attachment;

  interaction.type = true;
  interaction.data = true;
  interaction.guildId = true;
  interaction.token = true;
  interaction.id = true;
  interaction.message = true;
  interaction.member = true;
  interaction.user = true;

  member.id = true;
  member.roles = true;
  member.nick = true;
  member.user = true;
  member.guildId = true;

  user.id = true;
  user.username = true;

  attachment.contentType = true;

  desiredProperties.role.id = true;
  desiredProperties.role.name = true;
  desiredProperties.guild.id = true;
  desiredProperties.guild.name = true;

  message.components = true;
  message.embeds = true;
  message.attachments = true;
  message.content = true;
  message.channelId = true;
  message.author = true;
  message.guildId = true;
  message.id = true;
  message.member = true;
  message.reactions = true;

  desiredProperties.emoji.name = true;
  desiredProperties.guild.members = true;

  desiredProperties.user.avatar = true;
}
