const { MessageEmbed } = require('discord.js');
const {SlashCommandBuilder} = require('@discordjs/builders');
const db = require("quick.db")

module.exports = {
    data: new SlashCommandBuilder()
    .setName('set-language')
    .setDescription('💭 set the language for your server to ar or en')
    .addStringOption(option => 
        option
        .setName('language')
        .setDescription('The languages choices')
              .setRequired(true)
      .addChoices( 				{ name: 'English', value: 'en' }, 				{ name: 'Arabic', value: 'ar' }
    )),
                       async execute(interaction, client) {
      
         if(!interaction.inGuild()) return    interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(`❌ - This command can not run in DM`)], ephemeral: true })
  if (!interaction.member.permissions.has("ADMINISTRATOR")) return    interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(`❌ - You need **ADMINISTRATOR** permission to use this command`)], ephemeral: true })

const value = interaction.options.getString("language")
                         await db.set(`lang-${interaction.guild.id}`, value)

                      interaction.reply ({ embeds: [new MessageEmbed().setColor('GREEN').setDescription(`✅ - language now is **${value}**`)], ephemeral: true })     

}

}