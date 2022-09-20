const { MessageEmbed, Message} = require("discord.js");
const {SlashCommandBuilder} = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('un-ban')
    .setDescription('🛬 un ban a member')
    .addStringOption(option => 
        option
        .setName('member')
        .setDescription('The baned member id')
        .setRequired(true)
    )
    .addStringOption(option => 
        option
        .setName('reason')
        .setDescription('The un ban member reason')
        .setRequired(false)
    )   ,

  async execute(interaction, client)  {

    if(!interaction.inGuild()) return    interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(`❌ - This command can not run in DM`)], ephemeral: true })
    if (!interaction.guild.me.permissions.has("BAN_MEMBERS")) return    interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(`❌ - I need **BAN_MEMBERS** permission to use this command`)], ephemeral: true })              

    if (!interaction.member.permissions.has("BAN_MEMBERS")) return    interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(`❌ - You need **BAN_MEMBERS** permission to use this command`)], ephemeral: true })              
      let member = interaction.options.getString('member');
        const reason = interaction.options.getString('reason') || 'No reason'


    if(isNaN(member)) return interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(  await client.translate(`❌ - ID يلزم ان يكون بالأرقام فقط`,interaction))], ephemeral: true })

    interaction.guild.bans.fetch().then(async bans => {
        if(bans.size === 0) return interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(  await client.translate(`🙄 - لا يوجد اعضاء محظورين في هذا الخادم`,interaction))]})
        let BannedUser = bans.find(ban => ban.user.id == member)
        if(!BannedUser) return interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(  await client.translate(`🙄 - لا يوجد عضو محظور بهذا ID`,interaction))] })
     try {
      await interaction.guild.members.unban(BannedUser.user, reason)
        
interaction.reply ({ embeds: [new MessageEmbed().setColor('GREEN').setDescription(  await client.translate(`✅ - تمت عملية إزالة حظر ${member} بواسطة ${interaction.member}  بسبب ${reason}بنجاح`,interaction))] })    

     } catch  {
                   return interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(  await client.translate(`❌ -حصل خطأ أثناء عملية إزالة الباند`,interaction))], ephemeral: true })

     }    

    })
    
}
}
