const {Message, MessageEmbed}= require('discord.js')
const ms = require('ms')
const Schema = require('../../Modal/Mute.js')
const db = require('../../Modal/Server.js')
module.exports = {
    name : 'mute',
  
     async execute(client, message, args,prefix)  {


        let Embed =  new MessageEmbed()

        if(!message.member.permissions.has('MUTE_MEMBERS')) return message.channel.send({ embeds: [Embed.setColor('RED').setDescription('❌ - You do not have **MUTE_MEMBERS** permissions to use this command')]})

        if(!message.guild.me.permissions.has('MANAGE_ROLES')) return message.channel.send({ embeds: [Embed.setColor('RED').setDescription('❌ - I do not have **MANAGE_ROLES** permissions to use this command')]})

        

        if(!args[0]) return message.channel.send({ embeds: [Embed.setColor('RED').setDescription(`**🔇 Command: mute**\n\nMute a member from text channels so they cannot type.\n\n**Usage:**\n\n\`${prefix}mute\` \`[user]\` \`[time]\` \`[reason]\``)] })

        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const time = args[1]
        const reason = args.slice(2).join(" ") || "No Reason Provided"

        if(!Member) return message.channel.send({ embeds: [Embed.setColor('GOLD').setDescription(`🙄・I didnt find this member`)] }) 
        if(!time) return message.channel.send({ embeds: [Embed.setColor('WHITE').setDescription('⏳ - Please specify a time.')]})
        if (
        !args[1].endsWith("d") &&
        !args[1].endsWith("h") &&
        !args[1].endsWith("m") &&
        !args[1].endsWith("s") 
    ) return message.channel.send({ embeds: [Embed.setColor('WHITE').setDescription('⏳ - Time of mute must ends by[d],[h],[m],[s] ')]})

    const time2 = Date.now() + ms(time)
    if(Member.user.bot)  return message.channel.send({ embeds: [Embed.setColor('GOLD').setDescription(`🙄 - You can't mute a bot`)] }) 
    if(Member.id === message.author.id) return message.channel.send({ embeds: [Embed.setColor('GOLD').setDescription(`🙄 - You can't mute your self `)] })
    if(Member.id === message.guild.ownerId) return message.channel.send({ embeds: [Embed.setColor('GOLD').setDescription(`🙄 - You can't mute the server owner`)] })
    if(message.member.roles.highest.position <= Member.roles.highest.position) return message.channel.send({ embeds: [Embed.setColor('RED').setDescription(`🙄 - You can't mute someone with a role higher than you`)] })       

    const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')
    
    const check =await Schema.findOne({guild: message.guild.id, member:Member.id}) 

    if(check)      return  message.channel.send({embeds:[Embed.setColor('RED').setDescription(`❌ - This member is already muted`)]})

    if(!role) {
        let mutedrole =  await message.guild.roles.create({name: "muted"})

        message.guild.channels.cache.filter(c => c.type == "GUILD_TEXT").map(c => {
        c.permissionOverwrites.edit(mutedrole,  { SEND_MESSAGES: false })
      })   
    }  

    let role2 = message.guild.roles.cache.find(r => r.name.toLowerCase()  === 'muted')

    try {
         await Member.roles.add(role2)
       
     } catch {
         return  message.channel.send({embeds:[Embed.setColor('RED').setDescription(`❌ - I can't give him a mute. Please check my role position and my permissions`)]})
     }

    await Schema.create({guild: message.guild.id, member:Member.id ,  time: time2 })

    message.channel.send({embeds:[Embed.setColor('GREEN').setTitle(`🔇 ${Member.user.tag} has been Muted!`).setDescription(`✅ - ${Member.user.username} is now muted for \`${time}\` because of \`${reason}\``)]}).catch()
    Member.send({embeds:[Embed.setColor('RED').setDescription(`🔇 - You are now muted for \`${time}\` because of \`${reason}\` by ${message.author.id}`)]}).catch()

    setTimeout(async () => {
        const user = await Schema.findOneAndDelete({guild:message.guild.id, member:Member.id})
        if(user) { 
            Member.roles.remove(role2).catch()
            Member.send({embeds:[Embed.setColor('GREEN').setDescription(`🔇 - You are now un-muted because of \`mute time ended\``)]}).catch()
        }
    }, ms(time))

    const log = await db.findOne({guild:message.guild.id})
    if(log)  {

        const channelid = await log.log
        const channel1 = message.guild.channels.cache.get(channelid)
        if(!channel1) return
        channel1.send({ embeds: [Embed.setTitle(`🔇 Mute Log`).setDescription(`Muted Member: \`${Member.user.tag}\` | \`${Member.id}\`
by Staff: \`${message.author}\` | \`${message.author.id}\`
Time: \`${time}\`
Reason: \`${reason}\``).setTimestamp()
    ] }).catch()

}    

    }
}