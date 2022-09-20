const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("🖼 Gets avatar from a user")
    .addUserOption((option) =>
      option
      .setName("user")
      .setDescription("User to get avatar from")
      .setRequired(false)
    ),
  async execute(interaction,color) {
    let user = interaction.options.getUser("user")
    if (!user) user = interaction.user
                const bannerButton = new MessageButton()
              .setLabel('Avatar Link')
              .setStyle('LINK')
              .setURL(user.displayAvatarURL({ dynamic: true, size: 2048}) )
    let embed = new MessageEmbed()
.setAuthor(`${user.tag}`,`${user.displayAvatarURL({dynamic: true})}` , `${user.displayAvatarURL({dynamic: true})}`)

.setColor("RANDOM")
    .setImage(`${user.displayAvatarURL({ dynamic: true, size: 1024 })}`)
    .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true})}`})

                    const row = new MessageActionRow()
                .addComponents([ bannerButton ])
    interaction.reply({
        embeds: [embed],
components: [row],

        ephemeral: false
    })
} 
      }