const {Message, MessageEmbed}= require('discord.js')
const ms = require('ms')
const Schema = require('../../Modal/Mute.js')
const db = require('../../Modal/Server.js')
module.exports = {
    name : 'unmute',
  
     async execute(client, message, args,prefix)  {


        let Embed =  new MessageEmbed()

        if(!message.member.permissions.has('MUTE_MEMBERS')) return message.channel.send({ embeds: [Embed.setColor('RED').setDescription('❌ - You do not have **MUTE_MEMBERS** permissions to use this command')]})

        if(!message.guild.me.permissions.has('MANAGE_ROLES')) return message.channel.send({ embeds: [Embed.setColor('RED').setDescription('❌ - I do not have **MANAGE_ROLES** permissions to use this command')]})

        

        if(!args[0]) return message.channel.send({ embeds: [Embed.setColor('RED').setDescription(`**🔇 Command: un-mute**\n\nUn mute a member from text channels so they can type.\n\n**Usage:**\n\n\`${prefix}mute\` \`[user]\` \`[time]\` \`[reason]\``)] })

        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    
        const reason = args.slice(1).join(" ") || "No Reason Provided"

        if(!Member) return message.channel.send({ embeds: [Embed.setColor('GOLD').setDescription(`🙄- I didnt find this member`)] }) 
     

    if(Member.id === message.author.id) return message.channel.send({ embeds: [Embed.setColor('GOLD').setDescription(`🙄 - You can't un-mute your self `)] })

    if(message.member.roles.highest.position <= Member.roles.highest.position) return message.channel.send({ embeds: [Embed.setColor('RED').setDescription(`🙄 - You can't un-mute someone with a role higher than you`)] })       

    const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')
    
    const check = await Schema.findOne({guild: message.guild.id, member:Member.id}) 
    
    if(!check) return message.channel.send({ embeds: [Embed.setColor('GOLD').setDescription(`🙄 - This member is not muted`)] })       


    try {
         await Member.roles.remove(role)
       
     } catch (error){
        console.log(error)
        return  message.channel.send({embeds:[Embed.setColor('RED').setDescription(`❌ - I can't take the mute. Please check my role position and my permissions`)]})
     }


    message.channel.send({embeds:[Embed.setColor('GREEN').setTitle(`🔇 ${Member.user.tag} has been unMuted!`).setDescription(`✅ - ${Member.user.username} is now un-muted because of \`${reason}\``)]}).catch()
    Member.send({embeds:[Embed.setColor('GREEN').setDescription(`🔇 - You are now un-muted for because of \`${reason}\` by ${message.author.id}`)]}).catch()
    await Schema.deleteOne({guild: message.guild.id, member:Member.id}) 

    const log = await db.findOne({guild:message.guild.id})
    if(log)  {

        const channelid = await log.log
        const channel1 = message.guild.channels.cache.get(channelid)
        if(!channel1) return
        channel1.send({ embeds: [Embed.setTitle(`🔇 Un Mute Log`).setDescription(`Un Muted Member: \`${Member.user.tag}\` | \`${Member.id}\`
by Staff: \`${message.author}\` | \`${message.author.id}\`
Reason: \`${reason}\``).setColor('WHITE').setTimestamp()
    ] }).catch()

}    

    }
}