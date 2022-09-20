const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const {SlashCommandBuilder} = require('@discordjs/builders');
const { Constants: { ChannelTypes } } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('apply-clans')
    .setDescription('📮 The Apply message for the clans in the server')
    .addChannelOption(option =>
        option.setName('apply_channel')
            .setDescription(`Channel that the bot will send apply message there`)
     .addChannelTypes(ChannelTypes.GUILD_TEXT)
            .setRequired(false)),
  
  async execute(interaction, client) {
     if(!interaction.inGuild()) return    interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(`❌ - This command can not run in DM`)], ephemeral: true })
    
    
    if (!interaction.member.permissions.has("ADMINISTRATOR")) return    interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(`❌ - You need **ADMINISTRATOR** permission to use this command`)], ephemeral: true })              

 

let channel = interaction.options.getChannel('apply_channel') || interaction.channel
let embed = new MessageEmbed()
       .setTitle('التقديم على كلان-Join Clan')
.setDescription(await client.translate(`  
يرجى كتابة معلومات التقديم وانتظار موافقتك او رفضك من مسؤولين الكلان

الاسم :
العمر :
المايكروفون : 
للخروج من الكلان او إلغاء طلب دخول الكلان اضغط على زر الخروج
     `, interaction))
                     const row = new MessageActionRow().addComponents(
  new MessageButton() 
  .setCustomId("join")
                .setLabel(await client.translate("اضغط للتقديم", interaction))
                .setStyle("SUCCESS")
.setEmoji("📝"),

                
  new MessageButton() 
  .setCustomId("leave")
                .setLabel(await client.translate("اضغط للخروج من الكلان", interaction))
                .setStyle("DANGER")
.setEmoji("📤")
                )
   interaction.reply ({ embeds: [new MessageEmbed().setColor('RANDOM').setDescription(`✅ - Clans Apply Message sent in ${channel}`)], ephemeral: true })              
 channel.send({components: [row], embeds: [embed]})


  }
}