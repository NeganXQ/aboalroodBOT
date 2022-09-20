const { MessageEmbed}= require('discord.js')
const db = require('../../Modal/Warn.js')
const d = require('../../Modal/Server.js')

module.exports = {
    name : 'clwarn',
  
     async execute(client, message, args,prefix)  {

        let Embed =  new MessageEmbed()

        if(!message.member.permissions.has('MANAGE_ROLES')) return message.channel.send({ embeds: [Embed.setColor('RED').setDescription('❌ - You do not have **MANAGE_ROLES** permissions to use this command')]})
        if(!args[0]) return message.channel.send({ embeds: [Embed.setColor('GOLD').setDescription(`**⚠️ Command: Clear Warn**\n\nClear all warns a member has in the server.\n\n**Usage:**\n\n\`${prefix}clwarn\` \`[user]\``)] })

       let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

             if(member.id === message.author.id) return message.channel.send({ embeds: [Embed. setColor("GOLD").setDescription(`🙄 - You can't clear warns your have`)] })

   
     if(message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send({ embeds: [Embed.setColor("GOLD").setDescription(`🙄 - You can't clear warns someone has with a role higher than you`)] })       
     

if(!member)     return      message.channel.send({ embeds: [Embed.setColor('GOLD').setDescription(`🙄 - I can't find this member`)] })


const data = await db.findOne({guild:message.guild.id, user:member.id})

    if(!data || data.content.length < 0)  return   message.channel.send({ embeds: [Embed.setColor('GOLD').setDescription(`🙄 - I can't find Data for this member in this server`)] })
   await data.delete()
        
    message.channel.send({embeds:[Embed.setColor("GREEN").setTitle(`🗑️ ${member.user.tag} cleared warns!`).setDescription(`✅ - \`${message.author.tag}\` clears all warns for \`${member.user.tag} | ${member.id}\``)]})
    
  
      
     }}