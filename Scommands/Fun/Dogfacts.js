const dogFacts = require('dog-facts');

 
const { Client, Message, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('dog-facts')
    .setDescription('🐶 Get fun facts about dogs'),
    async execute(interaction, client) {




let randomFact = dogFacts.random();
let tr = await client.translate(randomFact,interaction)
      
      interaction.reply ({ embeds: [new MessageEmbed().setColor('RANDOM').setDescription(`Dog fun facts: ${tr}`)]})
 
    }
}