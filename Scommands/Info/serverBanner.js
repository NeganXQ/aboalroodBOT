const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('server-banner')
        .setDescription('🎴 Get the server banner'),

    async execute(interaction, client) {

  if(!interaction.inGuild()) return    interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(`❌ - This command can not run in DM`)], ephemeral: true })
      
const config = process.env
const token = config.token;
  axios.get(`https://discord.com/api/guilds/${interaction.guild.id}`, {
        headers: {
          Authorization: `Bot ${token}`,
        },
      }).then(async (res) => {
        const { banner } = res.data

        const extension = banner.startsWith("a_") ? ".gif" : ".png";
        const url = `https://cdn.discordapp.com/banners/${interaction.guild.id}/${banner}${extension}?size=2048`
const row = new MessageActionRow()
                .addComponents(          new MessageButton()
              .setLabel('Banner Link')
              .setStyle('LINK')
              .setURL(url))
        interaction.reply({
          embeds: [new MessageEmbed()
        .setTitle("Server Banner")
        .setImage(url)
        .setURL(url)
        ]
        ,components:[row]})
      }).catch((e) => {
      interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(`❌ - ${interaction.guild.id} Does not have a banner !`)], ephemeral: true })
      })
      
    }

}