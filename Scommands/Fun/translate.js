const { MessageEmbed } = require('discord.js');
const {SlashCommandBuilder} = require('@discordjs/builders');
const db = require("quick.db")

module.exports = {
    data: new SlashCommandBuilder()
    .setName('translate')
    .setDescription('💭 translate a text to Arabic or English')
    .addStringOption(option => 
        option
        .setName('language')
        .setDescription('The languages choices')
              .setRequired(true)
      .addChoices( 				{ name: 'English', value: 'en' }, 				{ name: 'Arabic', value: 'ar' }
    ))
       .addStringOption(option => 
        option
        .setName('text')
        .setDescription('Text to translate')
        .setRequired(true)
      
    ),

async execute(interaction, client) {
  
  
}
}