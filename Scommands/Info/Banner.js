const axios = require('axios');
const {  MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { token } = require('../../config.json') 
module.exports = {
    data: new SlashCommandBuilder()
    .setName('banner')
    .setDescription('🎴 Gets a user banner')
    .addUserOption(option => 
        option
        .setName('member')
        .setDescription('User to get banner from')
        .setRequired(false)
    ),

    async execute(interaction) {
        let user = interaction.options.getUser('member');
        if (!user) user = interaction.user;

        axios.get(`https://discord.com/api/users/${user.id}`, {
            headers: {
                Authorization: `Bot ${token}`,
            },
        }).then((res) => {
            const { banner, accent_color } = res.data

            if (banner) {
                const extension = banner.startsWith("a_") ? ".gif" : ".png";
                const url = `https://cdn.discordapp.com/banners/${user.id}/${banner}${extension}?size=4096`;


            const bannerEmbed = new MessageEmbed()
                .setAuthor({ name: `${user.tag}`, iconURL: `${user.displayAvatarURL({dynamic: true})}` })
                .setImage(url)  
                .setColor("RANDOM")

                const row = new MessageActionRow()
                .addComponents(          new MessageButton()
              .setLabel('Banner Link')
              .setStyle('LINK')
              .setURL(url))
              
                interaction.reply({ embeds: [bannerEmbed], components: [row] })
            } else {
                if (!accent_color) {
                    const noBanner = new MessageEmbed()
                    .setColor('RANDOM')
                    .setDescription('This user has no banner')

                    interaction.reply({
                        embeds: [noBanner]
                    })
                }
            }
        })
    }
}