const { Client, Intents, Interaction, MessageEmbed, Collection, MessageActionRow, MessageButton, MessageSelectMenu,Modal ,TextInputComponent } = require('discord.js');
const { Constants: { ChannelTypes } } = require('discord.js')
const {SlashCommandBuilder} = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('notification')
    .setDescription('🔔 notification role message')
    .addChannelOption(option =>
        option.setName('notification_channel')
            .setDescription(`Channel that the bot will send notification role  message there`)
     .addChannelTypes(ChannelTypes.GUILD_TEXT)
            .setRequired(false)),
      

  async execute(interaction, client)  {
        if(!interaction.inGuild()) return    interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(`❌ - This command can not run in DM`)], ephemeral: true })
    if (!interaction.guild.me.permissions.has("ADMINISTRATOR")) return    interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(`❌ - I need **ADMINISTRATOR** permission to use this command`)], ephemeral: true })              

    if (!interaction.member.permissions.has("ADMINISTRATOR")) return    interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(`❌ - You need **ADMINISTRATOR** permission to use this command`)], ephemeral: true })              

  let channel = interaction.options.getChannel('apply_channel') || interaction.channel
    
    let Embed = new MessageEmbed()
            .setColor('#0004f1')
         .setTitle('**رتب الإشعارات - Notifications roles**')
.setDescription(`**هنا تستطيع الحصول على رتب الإشعارات الخاصة بالسيرفر**



>  📃 رتبة <@&893217948653727784> اخبار السيرفر

> 🎊 رتبة <@&893217959412113458> اخبار  الفعاليات العامة

> 🎉 رتبة <@&999013372483878993> اخبار  فعاليات الشات
`) 
        .setImage("https://images-ext-1.discordapp.net/external/cBbkRnURxZ95HoVGTEehQIcGdhS0zBzqEV4bc7gqLhU/%3Fwidth%3D1056%26height%3D594/https/media.discordapp.net/attachments/903374742780772362/905428945795682354/--.jpg")
  const row = new MessageActionRow()
        .addComponents(
    menu = new MessageSelectMenu()
    .setCustomId('not')
    .setPlaceholder('Choose role')
.setMinValues(1)
.setMaxValues(3)

  
    .addOptions([
      {

        label: 'رتبة إشعارات اخبار السيرفر',
        value: '893217948653727784',
        emoji: '📰'

      },

      {
        label: 'رتبة إشعارات الفعاليات العامة',
        value: '893217959412113458',
        emoji: '🎊'
      },
      {        label: 'رتبة إشعارات فعاليات الشات',
        value: '999013372483878993',
        emoji: '🎉'
      },

    ])
         
)
const row1 = new MessageActionRow().addComponents(
  new MessageButton() 
  .setCustomId("removeN")
                .setLabel('ازالة جميع رتب الإاشعارات')
                .setStyle("DANGER")
.setEmoji("🔖")
  )
interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(`✅ - تم ارسال رسالة الرول النوتفكيشن في ${channel}`)], ephemeral:true})


     channel.send({embeds:[Embed], components:[row,row1]})     

}

  }

