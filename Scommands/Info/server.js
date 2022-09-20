const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('server-info')
        .setDescription('📄 Get the server info'),

    async execute(interaction, client) {
 
      if(!interaction.inGuild()) return    interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(`❌ - This command can not run in DM`)], ephemeral: true })

        if (interaction.guild.memberCount !== interaction.guild.members.cache.size) await interaction.guild.members.fetch()
        const members = interaction.guild.members.cache;
        const channels = interaction.guild.channels.cache;
        const emojis = interaction.guild.emojis.cache.size;
              const stickers = interaction.guild.stickers.cache.size;
const firstFiveEmojis = interaction.guild.emojis.cache.map(emoji => emoji).slice(0, 5).join(' ');
const bots = interaction.guild.members.cache.filter(member => member.user.bot).size; 
      const human = interaction.guild.members.cache.filter(member => !member.user.bot).size; 

let onlineMembers = interaction.guild.members.cache.filter(member => member.presence?.status == "online").size

      let dndMembers = interaction.guild.members.cache.filter(member => member.presence?.status == "dnd").size

            let idelMembers = interaction.guild.members.cache.filter(member => member.presence?.status == "idle").size


      
  let Embed = new MessageEmbed()            .setColor('BLUE')            .setAuthor({ name: `${interaction.guild.name}'s Info`, iconURL: interaction.guild.iconURL({ dynamic: true, size: 1024, format: 'png' }) })            .setThumbnail(interaction.guild.iconURL({ dynamic: true, size: 1024, format: 'png' }))            .addFields(               
    { name: '🆔 Server ID:', value: `${interaction.guildId}`, inline: true },                { name: '📆 Created On:', value: `**<t:${Math.floor(interaction.guild.createdTimestamp / 1000)}:R>**`, inline: true },               
    { name: '👑 Owned by:', value: `<@!${interaction.guild.ownerId}>`, inline: true },                     { name: `👥  Members (${interaction.guild.memberCount}):`, value: ` **${onlineMembers + dndMembers + idelMembers}** Online | **${bots}** Bots | **${human}** Humans  `, inline: true}, 
    { name: `💬 Channels (${interaction.guild.channels.cache.size}) & Roles:`, value: `** ${channels.filter(channel => channel.type === 'GUILD_TEXT').size}** Text |  **${channels.filter(channel => channel.type === 'GUILD_VOICE').size} ** Voice | ** ${interaction.guild.roles.cache.size} **Roles `, inline: true }, { name: '⭐ Emojies & stickers:', value: `** ${stickers} ** Stickers | ** ${emojis} **Emojies\n ${firstFiveEmojis} `, inline: true },
    { name: `💎 Boost Tier(${interaction.guild.premiumTier.replace("TIER_", "")}) state : `, 
 value: `Boost Tier(** ${interaction.guild.premiumTier.replace("TIER_", "")} **)  |   ** ${interaction.guild.premiumSubscriptionCount} ** Boosts `},
    //{ name: `Other`, value:`${interaction.guild.roles.cache.size}`},
    { name: `🌐 Region: `, value: `${interaction.guild.preferredLocale}`, inline: true },
        { name: `🔒 Verification: `, value: `${interaction.guild.verificationLevel}`, inline: true }

    ) 
            

        await interaction.reply({ embeds: [Embed] });

    }

} 
/**
await interaction.guild.members.fetch();
const members = interaction.guild.members.cache;
const channels = interaction.guild.channels.cache;
const emojis = interaction.guild.emojis.cache.size;

const boostCount = interaction.guild.premiumSubscriptionCount;
const verificationLevel = interaction.guild.verificationLevel;
const rolesCount = interaction.guild.roles.cache.size;

await interaction.reply({
    embeds: [
        new EmbedBuilder()
            .setColor(EmbedColor)
            .setAuthor({ name: `${interaction.guild.name}'s Information`, iconURL: interaction.guild.iconURL({ dynamic: true, size: 1024, format: 'png' }) })
            .setThumbnail(interaction.guild.iconURL({ dynamic: true, size: 1024, format: 'png' }))
            .addFields(
                { name: '🆔 Server ID:', value: `${interaction.guildId}`, inline: true },
                { name: '📆 Created On:', value: `**<t:${Math.floor(interaction.guild.createdTimestamp / 1000)}:R>**`, inline: true },
                { name: '👑 Owned by:', value: `<@!${interaction.guild.ownerId}>`, inline: true },
                { name: `👥  Members (${interaction.guild.memberCount}):`, value: `**${members.filter(member => member.presence?.status === 'online').size + members.filter(member => member.presence?.status === 'idle').size + members.filter(member => member.presence?.status === 'dnd').size}** Online | Idle | DND\n**${members.filter(member => !['online', 'idle', 'dnd'].includes(member.presence?.status)).size}** Offline\n**${members.filter(member => member.user.bot).size}** Bot`, inline: true },
                { name: `💬 Channels (${interaction.guild.channels.cache.size}):`, value: `**${channels.filter(channel => channel.type === 0).size}** Text | **${channels.filter(channel => channel.type === 2).size}** Voice\n**${channels.filter(channel => channel.type === 4).size}** Category`, inline: true },
                { name: `🌐 Others:`, value: `Verification Level: **${verificationLevel}**\nBoosts: **${boostCount}** <:boost:966837290896855070>\nRoles: **${rolesCount}**`, inline: true },
                { name: `🛡️ Emojis (${emojis}):`, value: `**${firstFiveEmojis}**`, inline: true },
            )
    ], ephemeral: true
}); 


أمر معلومات السيرفر افضل من برو بوت ، فداكم الكود ولكن لو تبي تنشره لا تنسى تقدر التعب وتكتب انه كودي
البوت يضيف 5 ايموجيات فقط ، لو تبي تغيرها يمديك تقرا الكود مكتوب 5 غيرها وحطها العدد الي تبيه ، ولكن لا تحط كثير لأن الامبد ما يتحمل عدد رسائل كثيره و اسم الايموجي ينحسب مع عدد رسائل الايموجي
لو تبيه يشتغل على اوامر بريفكس غير كلمة interaction الى message
و لا تنسى تضيف GuildPresences
في ملف index.js
**/