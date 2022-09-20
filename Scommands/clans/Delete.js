const { Client, Intents, Interaction, MessageEmbed, Collection, MessageActionRow, MessageButton, MessageSelectMenu,Modal ,TextInputComponent } = require('discord.js');
const { Constants: { ChannelTypes } } = require('discord.js')
const {SlashCommandBuilder} = require('@discordjs/builders');
const cdb = require("../../Modal/clanCreate.js")
const mdb = require("../../Modal/clanapply.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName('delete-clan')
    .setDescription('🗑 Delete a clan from your server'),



    async execute(interaction, client) { 
       if(!interaction.inGuild()) return    interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(`❌ - This command can not run in DM`)], ephemeral: true })
  
      if (!interaction.member.permissions.has("ADMINISTRATOR")) return    interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(`❌ - You need **ADMINISTRATOR** permission to use this command`)], ephemeral: true })              


  const data = await cdb.find({Gid: interaction.guild.id})

      if(data.length <= 0 || !data) return interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(`⁉️ - I can't find any clan data for this server.
||EROR CODE: 5_CLAN_DATA_NULL_${interaction.guild.id}||`)], ephemeral: true })        
                          const row = new MessageActionRow()
        .addComponents(
    menu = new MessageSelectMenu()
    .setCustomId('clans')
    .setPlaceholder('Choose Clan ')

  )
  data.forEach(c => {
    menu.addOptions([
      {
        label: c.ClanN,
        value: `${c.ClanId}-list`,
      },
    ])
  })
    const rowB = new MessageActionRow().addComponents(
  new MessageButton() 
  .setCustomId("good1")
                .setLabel("Yes")
                .setStyle("SUCCESS"),

                
  new MessageButton() 
  .setCustomId("bad1")
                .setLabel("No")
                .setStyle("DANGER"),
                )       

 const   roleid = []
      const search = data.forEach( (cdb) => {
        roleid.push(cdb.ClanN)
      })
let embed = new MessageEmbed()
     .setTitle("Choose a clan from the select menu to delete")
     .setDescription(roleid.map((i) => `${roleid.indexOf(i)+1}. ${i}`).join("\n"))



   const msg = await   interaction.reply({embeds:[embed],components:[row],fetchReply:true})
      
    let colector = await msg.createMessageComponentCollector({
                componentType: "SELECT_MENU",    
      time: 20000,
    });
    colector.on("collect", async (i) => {
        await i.deferUpdate().catch((e) => {});
 var ret = i.values[0].replace('-list','');
const data = await cdb.findOne({Gid:i.guild.id, ClanId:ret })

let clan_name = await data.ClanN
        
msg.edit({content:`Are you sure about deleting \`${clan_name}\`?`,embeds:[],components:[rowB]})



       const collector = msg.createMessageComponentCollector({ componentType: "BUTTON", max:1, time: 10000});
        collector.on("collect", async i => {
            if (i.user.id === interaction.user.id) {
              i.deferUpdate()
           if(i.customId === 'good1') { 
             

  const data = await cdb.findOneAndDelete({Gid:interaction.guild.id, ClanN:clan_name})
            
             
 try{
if(data)       {
  const data = await mdb.deleteMany({guild: interaction.guild.id, Clan:clan_name})
  msg.edit({content: `Clan \`${clan_name}\` successfully deleted`, components:[]})
               } else {
  msg.edit('error i can not find data')
               }  }catch {
   
               }
                                     }
           if(i.customId === 'bad1')  {
              msg.edit({content: `Operation cancelled`, components:[]})
           }
            }
            })

    })
} 
} 