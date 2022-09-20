const { MessageEmbed } = require('discord.js');
const {SlashCommandBuilder} = require('@discordjs/builders');
const nr = require("../../Modal/notification.js")


module.exports = {
    data: new SlashCommandBuilder()
    .setName('embed')
    .setDescription('💬 Create simple embed message in the current channel')
      .addStringOption(option => 
        option
        .setName('description')
        .setDescription('The Embed Descriptions')
        .setRequired(true)
    )
    .addStringOption(option => 
        option
        .setName('title')
        .setDescription('The Embed Title')
        .setRequired(false)
    )  
   .addStringOption(option => 
        option
        .setName('content')
        .setDescription('The message content')
        .setRequired(false)
    )
     .addStringOption(option => 
        option
        .setName('image_url')
        .setDescription('Put an image link to make it in the embed')
        .setRequired(false)
    )
,
  
  async execute(interaction, client) {
      
         if(!interaction.inGuild()) return    interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(`❌ - This command can not run in DM`)], ephemeral: true })

    if (!interaction.member.permissions.has("ADMINISTRATOR")) return    interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(`❌ - You need **ADMINISTRATOR** permission to use this command`)], ephemeral: true })              
const link = interaction.options.getString('image_url')
      if(link)  {
        if (!link.includes("https://")) {
               return    interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(`❌ - The image link should be https link`)], ephemeral: true })                     }

        
        if (link.endsWith(".mov") || link.endsWith(".mp4")) {
     return    interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(`❌ - The image link can not be a video link`)], ephemeral: true })                     }
          }
           
interaction.reply({ embeds: [new MessageEmbed().setColor('GREEN').setDescription(`✅ - Embed sent successfully`)], ephemeral: true })
    const content = interaction.options.getString('content') || " "
        interaction.channel.send({ content:content, embeds: [new MessageEmbed().setColor(interaction.guild.me.displayHexColor).setTitle(`${interaction.options.getString('title') || " "}`).setDescription(interaction.options.getString('description')|| "").setThumbnail(interaction.guild.iconURL({ dynamic: true, size: 1024,})).setImage(link || null)          
] })  

    }
  }