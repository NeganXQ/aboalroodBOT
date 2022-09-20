const { MessageEmbed}= require('discord.js')
const db = require('../../Modal/Warn.js')
const d = require('../../Modal/Server.js')

module.exports = {
    name : 'delwarn',
  
     async execute(client, message, args,prefix)  {

        let Embed =  new MessageEmbed()

        if(!message.member.permissions.has('MUTE_MEMBERS')) return message.channel.send({ embeds: [Embed.setColor('RED').setDescription('❌ - You do not have **MUTE_MEMBERS** permissions to use this command')]})
        if(!args[0]) return message.channel.send({ embeds: [Embed.setColor('GOLD').setDescription(`**⚠️ Command: Delete Warn**\n\nDelete a warn a member has in the server.\n\n**Usage:**\n\n\`${prefix}delwarn\` \`[user]\` \`[warnID]\``)] })

       let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

             if(member.id === message.author.id) return message.channel.send({ embeds: [Embed. setColor("GOLD").setDescription(`🙄 - You can't delete warn your have`)] })

   
     if(message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send({ embeds: [Embed.setColor("GOLD").setDescription(`🙄 - You can't delete a warn someone has with a role higher than you`)] })       
     
    const IDs = args[1]
if(!IDs) return      message.channel.send({ embeds: [Embed.setColor('GOLD').setDescription(`🙄 - You should provide a warn ID`)] })

if(!member)     return      message.channel.send({ embeds: [Embed.setColor('GOLD').setDescription(`🙄 - I can't find this member`)] })


 
        
  
    const data = await  db.findOne({guild:message.guild.id, user:member.id, content: {$elemMatch: {ID:IDs}}})
    if(!data || data.content.length < 0)  return   message.channel.send({ embeds: [Embed.setColor('GOLD').setDescription(`🙄 - I can't find Data for this member in this server or this warn ID is invalid`)] })
    const data2 = await db.updateOne(  {guild:message.guild.id, user:member.id}, {$pull :{content: {ID :IDs}}})
    if(!data2)  return   message.channel.send({ embeds: [Embed.setColor('GOLD').setDescription(`🙄 - I can't find Data with this ID,make sure of the id of the warn`)] })

    message.channel.send({embeds:[Embed.setColor("GREEN").setTitle(`🗑️ ${member.user.tag} delete warned!`).setDescription(`✅ - \`${message.author.tag}\` deleted a warn with id: \`${IDs}\` for \`${member.user.tag} | ${member.id}\``)]})
    
  
      
     }}