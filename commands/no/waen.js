const { MessageEmbed}= require('discord.js')
const db = require('../../Modal/Warn.js')
const d = require('../../Modal/Server.js')

module.exports = {
    name : 'warn',
  
     async execute(client, message, args,prefix)  {

        let Embed =  new MessageEmbed()

        if(!message.member.permissions.has('MUTE_MEMBERS')) return message.channel.send({ embeds: [Embed.setColor('RED').setDescription('❌ - You do not have **MUTE_MEMBERS** permissions to use this command')]})
        if(!args[0]) return message.channel.send({ embeds: [Embed.setColor('GOLD').setDescription(`**⚠️ Command: warn**\n\nWarn a member so this warn will add to his warn list in the server.\n\n**Usage:**\n\n\`${prefix}warn\` \`[user]\` \`[reason]\``)] })

       let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

             if(member.id === message.author.id) return message.channel.send({ embeds: [Embed. setColor("GOLD").setDescription(`🙄 - You can't warn your self`)] })

     if(member.user.bot)  return message.channel.send({ embeds: [Embed.setColor('GOLD').setDescription(`🙄 - You can't warn a bot`)] }) 
   
     if(message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send({ embeds: [Embed.setColor("GOLD").setDescription(`🙄 - You can't warn someone with a role higher than you`)] })       
  
               let time = Math.floor( message.createdTimestamp / 1000)


       
       let ID = MakeID(12)
    const reason = args.slice(1).join(" ")
if(!member)     return      message.channel.send({ embeds: [Embed.setColor('GOLD').setDescription(`🙄 - I can't find this member`)] })
 if(!reason)      return message.channel.send({ embeds: [Embed.setColor('GOLD').setDescription(`🙄 - Put a reason for this warn`)] })

db.findOne({guild:message.guild.id, user:member.id}, async (err,data) => {
  if(err) throw err;
  if(!data) {
data = new db({

guild:message.guild.id,
user: member.id,
 userTag:member.user.tag,
content:[
  {
    ID: ID,
  staffID:message.author.id,
  staffTag: message.author.tag,
  reason:reason, 
  time:time
  }]
  })
} else {

const obj = {
    ID: ID,
  staffID:message.author.id,
  staffTag: message.author.tag,
  reason:reason, 
  time:time
}
   data.content.push(obj) 
}
  data.save()
})

message.channel.send({embeds:[Embed.setColor("GREEN").setTitle(`⚠️ ${member.user.tag} warned!`).setDescription(`✅ - ${member} has been warned for \`${reason}\` by \`${message.author.tag}\``)]})
       member.send({embeds:[Embed.setColor("GOLD").setDescription(`⚠️ - You have warned for \`${reason}\``)]}).catch()
         const log = await d.findOne({guild:message.guild.id})
    if(log)  {

        const channelid = await log.log
        const channel1 = message.guild.channels.cache.get(channelid)
        if(!channel1) return
        channel1.send({ embeds: [Embed.setColor("GOLD").setTitle(`⚠️ Warn Log`).setDescription(`Warned Member: \`${member.user.tag}\` | \`${member.id}\`
by Staff: \`${message.author.tag} | ${message.author.id}\`
Reason: \`${reason}\``).setTimestamp()
    ] }).catch()

}      
     }}
function MakeID(I) {
          var t = "";
          var possible = "0123456789";
        
          for (var i = 0; i < I; i++)
            t += possible.charAt(Math.floor(Math.random() * possible.length));
        
          return t;
        }
//creating random token for warn id
