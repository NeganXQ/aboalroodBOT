const { MessageEmbed, Message} = require("discord.js");
const {SlashCommandBuilder} = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('bot-list')
    .setDescription('Show bots in the server'),
  async execute(interaction) {  

  if(!interaction.inGuild()) return    interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(`❌ - This command can not run in DM`)], ephemeral: true })
    if (!interaction.guild.me.permissions.has("ADMINISTRATOR")) return    interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(`❌ - I need **ADMINISTRATOR** permission to use this command`)], ephemeral: true })              

    if (!interaction.member.permissions.has("ADMINISTRATOR")) return    interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(`❌ - You need **ADMINISTRATOR** permission to use this command`)], ephemeral: true })            

    let member_count = interaction.guild.members.cache.filter(member => member.user.bot)
    const   roleid = []
      const search = member_count.forEach( (cdb) => {
        roleid.push(cdb.id)
  //  console.log(roleid)
      })
    let embed = new MessageEmbed()
     .setTitle("Clans List")
     .setDescription(roleid.map((i) => `${roleid.indexOf(i)+1}. <@${i}>`).join("\n"))
        
interaction.reply({ embeds: [embed]})

      
      
      
}
                                          }