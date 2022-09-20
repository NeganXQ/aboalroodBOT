const { MessageEmbed, Message} = require("discord.js");
const {SlashCommandBuilder} = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('🛫 Ban a member')
    .addUserOption(option => 
        option
        .setName('member')
        .setDescription('User to ban him')
        .setRequired(true)
    )
    .addStringOption(option => 
        option
        .setName('reason')
        .setDescription('The ban reason')
        .setRequired(false)
    )   ,

  async execute(interaction, client)  {

    if(!interaction.inGuild()) return    interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(`❌ - This command can not run in DM`)], ephemeral: true })
    if (!interaction.guild.me.permissions.has("BAN_MEMBERS")) return    interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(`❌ - I need **BAN_MEMBERS** permission to use this command`)], ephemeral: true })              

    if (!interaction.member.permissions.has("BAN_MEMBERS")) return    interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(`❌ - You need **BAN_MEMBERS** permission to use this command`)], ephemeral: true })              
      let user = interaction.options.getUser('member');
       const botuser = client.user.id

        const reason = interaction.options.getString('reason') || 'No reason'
            const member =  interaction.guild.members.cache.get(user.id)

        if(!member) return         interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(await client.translate(`❌ - This member is not in the server`,interaction))], ephemeral: true })
              if(member.id == botuser) return interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(`🙄 -  لا يمكنني إعطاء حظر من السيرفر لي`)], ephemeral: true })              

             if(member.id === interaction.member.id) return interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(await client.translate(`🙄 - لا يمكنك إعطاء حظر من الخادم لنفسك`,interaction))], ephemeral: true })              


              if(member.id === interaction.guild.ownerId) return interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(await client.translate(`🙄 - لا يمكنك إعطاء حظر لمالك السيرفر`,interaction))], ephemeral: true })              



 if(interaction.guild.me.roles.highest.position <= member.roles.highest.position) return interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(  await client.translate(`🙄 - لا يمكنني إعطاء حظر من الخادم لعضو أعلى من رتبتي`,interaction))], ephemeral: true })  

 if(interaction.member.roles.highest.position <= member.roles.highest.position) return interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(  await client.translate(`🙄 - لا يمكنك إعطاء حظر من السيرفر لعضو أعلى من رتبتك`,interaction))], ephemeral: true })  
    
    if(member.bannable) {

      
      member.ban({ reason: `${interaction.member}: reason` })
interaction.reply ({ embeds: [new MessageEmbed().setColor('GREEN').setDescription(  await client.translate(`✅ - ${member} banned from the server by ${interaction.member} for ${reason}
`,interaction))] })
    } else {
      return interaction.reply({content:`I can't ban them, make sure that my role is above of theirs`, ephemeral:true}).catch()
    }
  }
}