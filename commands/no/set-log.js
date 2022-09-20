const { MessageEmbed}= require('discord.js')
const db = require('../../Modal/Server.js')
module.exports = {
    name : 'set-log',
  
     async execute(client, message, args, prefix)  {
let Embed = new MessageEmbed()
if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({ embeds: [Embed.setColor('RED').setDescription('❌ - You do not have **ADMINISTRATOR** permissions to use this command')]})


       if(!args[0]) return              message.channel.send({ embeds: [Embed.setDescription(`**⚒ Command: set-logs**\n\nTo set Logs for your server in specific text channel.\n\n**Usage:**\n\n\`${prefix}set-log\` \`[@channel]\``)] })

     let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])


       if(!channel)  return              message.channel.send({ embeds: [Embed.setDescription(`This is not a valid channel`)] })

const check = await db.findOne({guild: message.guild.id})

if(check){ 
  await db.update({guild: message.guild.id },  {log:channel})
   return              message.channel.send({ embeds: [Embed.setDescription(`Log channel has been set to ${channel}`)] })
         } else {

await db.create({guild: message.guild.id, log:channel.id})

   return              message.channel.send({ embeds: [Embed.setDescription(`Log channel has been set to ${channel}`)] })

  
         }

     }


}