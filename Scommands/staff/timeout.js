const { MessageEmbed, Message} = require("discord.js");
const ms = require('ms')
const {SlashCommandBuilder} = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('time-out')
    .setDescription('⏱ Give time out for a member')
    .addUserOption(option => 
        option
        .setName('member')
        .setDescription('User to give him timeot')
        .setRequired(true)
    )
      .addStringOption(option => 
        option
        .setName('time')
        .setDescription('The time-out time')
        .setRequired(true)
    )   
    .addStringOption(option => 
        option
        .setName('reason')
        .setDescription('The time-out reason')
        .setRequired(false)
    )   ,

  async execute(interaction, client)  {

    if(!interaction.inGuild()) return    interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(`❌ - This command can not run in DM`)], ephemeral: true })
    if (!interaction.guild.me.permissions.has("MODERATE_MEMBERS")) return    interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(`❌ - I need **MODERATE_MEMBERS** permission to use this command`)], ephemeral: true })              

    if (!interaction.member.permissions.has("MODERATE_MEMBERS")) return    interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(`❌ - You need **MODERATE_MEMBERS** permission to use this command`)], ephemeral: true })              
      let user = interaction.options.getUser('member');
       const botuser = client.user.id

         var timeoutTime = interaction.options.getString('time')


              if (
          !timeoutTime.endsWith("d") &&
          !timeoutTime.endsWith("h") &&
          !timeoutTime.endsWith("m") &&
          !timeoutTime.endsWith("s") 
      )
return interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(await client.translate(`❌ - Time must end by [d],[h],[m],[s]`, interaction))], ephemeral: true })              
    
         var time = ms(timeoutTime);
    if(isNaN(time))  return    interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(await client.translate(`❌ - ${timeoutTime} is not a valid time!`,interaction))], ephemeral: true })              

        const reason = interaction.options.getString('reason') || 'No reason'
            const member =  interaction.guild.members.cache.get(user.id)

        if(!member) return         interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(await client.translate(`❌ - This member is not in the server`,interaction))], ephemeral: true })
              if(member.id == botuser) return interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(`🙄 - لا يمكنني اعضاء وقت مستقطع لي`)], ephemeral: true })              

             if(member.id === interaction.member.id) return interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(await client.translate(`🙄 - لا يمكنك إعطاء وقت مستقطع لنفسك`,interaction))], ephemeral: true })              


              if(member.id === interaction.guild.ownerId) return interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(await client.translate(`🙄 - لا يمكنك إعطاء وقت مستقطع لمالك السيرفر`,interaction))], ephemeral: true })              

       if(member.user.bot)  return interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(await client.translate(`🙄 - لا يمكنك إعطاء بوت وقتا مستقطعا`,interaction))], ephemeral: true })              


 if(interaction.guild.me.roles.highest.position <= member.roles.highest.position) return interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(  await client.translate(`🙄 - لا يمكنني إعطاء وقت مستقطع لعضو أعلى من رتبتي`,interaction))], ephemeral: true })  

 if(interaction.member.roles.highest.position <= member.roles.highest.position) return interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(  await client.translate(`🙄 - لا يمكنك إعطاء وقت مستقطع لعضو أعلى من رتبتك`,interaction))], ephemeral: true })  
    

try {
      member.timeout(time, reason)
    interaction.reply(({ embeds: [new MessageEmbed().setColor('GREEN').setDescription(  await client.translate(`تم اعطاء ${member} وقتا مستقطع لمدة ${timeoutTime} بسبب ${reason}`, interaction))]})).catch()

} catch (err) {
interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(`ERROR`)], ephemeral: true }) 
}



  }
  }
