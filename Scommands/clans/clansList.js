const { Client, Intents, Interaction, MessageEmbed, Collection, MessageActionRow, MessageButton, MessageSelectMenu,Modal ,TextInputComponent, Permissions } = require('discord.js');
const {SlashCommandBuilder} = require('@discordjs/builders');
const cdb = require("../../Modal/clanCreate.js")
module.exports = {
    data: new SlashCommandBuilder()
    .setName('list-clans')
    .setDescription('📑 The List  for the current clans in the server'),
  async execute(interaction, client) { 
     if(!interaction.inGuild()) return    interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(`❌ - This command can not run in DM`)], ephemeral: true })

      if (!interaction.member.permissions.has("ADMINISTRATOR")) return    interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(`❌ - You need **ADMINISTRATOR** permission to use this command`)], ephemeral: true })              

                      const data = await cdb.find({Gid: interaction.guild.id})

                    if(data.length <= 0)  return    interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(`❌ - There is no clans in this server`)], ephemeral: true })
                   
       interaction.reply ({ embeds: [new MessageEmbed().setColor('RANDOM').setDescription(`✅ - Clans list have been sended`)], ephemeral: true })              

    
    const rowE = new MessageActionRow()
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
         

 const   roleid = []
      const search = data.forEach( (cdb) => {
        roleid.push(cdb.ClanN)
      })
let embed = new MessageEmbed()
     .setTitle("Clans List")
     .setDescription(roleid.map((i) => `${roleid.indexOf(i)+1}. ${i}`).join("\n"))
        
     const raw = new MessageActionRow().addComponents(

   new MessageButton() 
  .setCustomId("infoC")
                .setLabel("Clan Info")
                .setStyle("SUCCESS")
.setEmoji("📃"),

                
  new MessageButton() 
  .setCustomId("editCl")
                .setLabel("Edit Clan")
                .setStyle("SUCCESS")
.setEmoji("🔨"),
       
       
new MessageButton() 

  .setCustomId("RemoveC")
                .setLabel("Delete Clan")
                .setStyle("DANGER")
.setEmoji("🗑️"),
                           )
      
 const msg = await     interaction.channel.send({components: [raw], embeds: [embed], fetchReply:true})




    let filter = (interaction) => interaction.user.id === interaction.member.id;
    let colector = await msg.createMessageComponentCollector({
      filter: filter,
      time: 20000,
max: 1

    });
    colector.on("collect", async (interaction) => {
    if (interaction.isButton()) {
 interaction.deferUpdate()
                 if(interaction.customId === "editCl") {
msg.edit({ components:[msg.components[0], rowE]})

              const editselect = msg.createMessageComponentCollector({
          componentType: "SELECT_MENU",
          filter: filter,
          max: "1",
          time: 15000
        })
                   editselect.once("collect", async (interaction) => {
 var ret = interaction.values[0].replace('-list','');
                     console.log(ret)
                     interaction.deferUpdate()
const data = await cdb.findOne({Gid:interaction.guild.id, ClanId:ret })

let clan_name = await data.ClanN
let clan_role = await data.ClanR   
let clan_inv = await data.ClanINV
let clan_id = await data.ClanId  

let check_role
let check_inv
          if(interaction.guild.roles.cache.get(clan_role)) { check_role = "✅" } else { check_role = "❌"}
          if(              interaction.guild.channels.cache.get(clan_inv)) {
            check_inv = "✅"
          } else {
            check_inv = "❌"
          }


let claE = new MessageEmbed()
          .setTitle(`${clan_name} clan`)
.setDescription(`
> **clan name:** ${clan_name}
> **clan role: ID:**${clan_role} • <@&${clan_role}> • ${check_role}
> **clan invite chat:** ID:${clan_inv} • <#${clan_inv}> • ${check_inv}
> **clan owner:** ...
`
)
        const row1 = new MessageActionRow()
          .addComponents(
            new MessageSelectMenu()
              .setCustomId("select")
              .setPlaceholder("Select what you will change in the clan")
              .addOptions([
                {
                  label: "Clan Name",
                  emoji: "💳",
description: 'Change the clan name',

                  value: "1"
                },
                {
                  label: "Clan Role",
                  emoji: "🏷",
description: 'Change the clan role',
                  value: "2"
                },
                {
                  label: "Clan Invite Channel",
                  emoji: "📨",
description: 'Change the clan invite channel',

                  value: "3"
                },
                {
                  label: "Clan Owner",
                  emoji: "👑",
description: 'Change the clan owner',

                  value: "4"
                },
                {
                  label: "Cancel Editing",
                  emoji: "↩",
description: 'Canceling this changing',

                  value: "5"
                },


              ])
          )              
msg.edit({embeds:[claE],components:[row1]})
   const collector2 = msg.createMessageComponentCollector({
          componentType: "SELECT_MENU",
          max: 1,
          time: 40000
        })
                     
                   collector2.on("collect", async (c) => {
         

                     const value = c.values[0]
 c.deferUpdate()
if(value === "1") {
const msg = await  c.channel.send("Write the new name for clan in 15 second")
const filter = m => m.author.id === interaction.member.id;
const collector = c.channel.createMessageCollector({ filter, time: 15000 , max:1});

collector.on('collect',async m => {
  const row = new MessageActionRow().addComponents(
  new MessageButton() 
  .setCustomId("good")
                .setLabel("Yes")
                .setStyle("SUCCESS"),

                
  new MessageButton() 
  .setCustomId("bad")
                .setLabel("No")
                .setStyle("DANGER"),
                )
const s = await m.channel.send({  embeds: [new MessageEmbed().setColor('RANDOM').setDescription(`❔ - Are you sure to change the clan **NAME** for \`${m.content}\``)], components:[row]})
 const collector = m.channel.createMessageComponentCollector({ componentType: "BUTTON", max:1, time: 10000});
        collector.on("collect", async i => {
            if (i.user.id === m.author.id) {
              i.deferUpdate()
           if(i.customId === 'good') { 
             

  const data = await cdb.findOneAndUpdate({Gid:c.guild.id, ClanId:clan_id}, {ClanN:m.content})
 try{
if(data)       {       s.edit({content: `Clan role changed successfully to ${m.content}`, components:[],embeds:[]}).then(msg.delete())
               } else {
  s.edit('error i can not find data')
               }  }catch {
   
               }
                                     }
           if(i.customId === 'bad')  {
              s.edit({content: `Operation cancelled`, components:[],embeds:[]}).then(msg.delete())
           }
            }
            })
})
  }


                     if(value === "2") {
const msg = await c.channel.send("mention the new role or write the role id or write the name for the clan in 15 second")
const filter = m => m.author.id === interaction.member.id;
const collector = c.channel.createMessageCollector({ filter, time: 15000 , max:1});

collector.on('collect',async m => {

const args = m.content.trim().split(/ +/g);

let role = m.mentions.roles.first() || m.guild.roles.cache.find(role => role.name === args.join(" ")) || m.guild.roles.cache.get(m.content)     
  if(!role) return c.channel.send("I can't find this role")
  const row = new MessageActionRow().addComponents(
  new MessageButton() 
  .setCustomId("good")
                .setLabel("Yes")
                .setStyle("SUCCESS"),

                
  new MessageButton() 
  .setCustomId("bad")
                .setLabel("No")
                .setStyle("DANGER"),
                )
const s = await m.channel.send({  embeds: [new MessageEmbed().setColor('RANDOM').setDescription(`❔ - Are you sure to change the clan **ROLE** for \`${role}\``)], components:[row]})
 const collector = m.channel.createMessageComponentCollector({ componentType: "BUTTON", max:1, time: 10000});
        collector.on("collect", async i => {
            if (i.user.id === m.author.id) {
              i.deferUpdate()
           if(i.customId === 'good') { 
             

const data = await cdb.findOneAndUpdate({Gid:c.guild.id, ClanId:clan_id}, {ClanR:role.id})
 
if(data)       {       s.edit({content: `Clan role changed successfully to ${role}`, components:[],embeds:[]}).then(msg.delete())
               } else {
  s.edit('error i can not find data')
               }
                                     }
           if(i.customId === 'bad')  {
              s.edit({content: `Operation cancelled`, components:[],embeds:[]}).then(msg.delete())
           }

            } else {
               i.reply({ content: "These buttons aren't for you!", ephemeral: true });
            }
        });

});        
  }
                     if(value === "3") {
                       const msg = await c.channel.send("mention the new invite chat or write the invite chat id or write the name of it for the clan in 15 second")
const filter = m => m.author.id === interaction.member.id;
const collector = c.channel.createMessageCollector({ filter, time: 15000 , max:1});

collector.on('collect',async m => {

const args = m.content.trim().split(/ +/g);
  let channel = m.mentions.channels.first() || m.guild.channels.cache.get(m.content)
  if(!channel || !channel.isText()) return c.channel.send("I can't find this channel or this channel is a voice channel")
  const row = new MessageActionRow().addComponents(
  new MessageButton() 
  .setCustomId("good")
                .setLabel("Yes")
                .setStyle("SUCCESS"),

                
  new MessageButton() 
  .setCustomId("bad")
                .setLabel("No")
                .setStyle("DANGER"),
                )
const s = await m.channel.send({  embeds: [new MessageEmbed().setColor('RANDOM').setDescription(`❔ - Are you sure to change the clan **INVITE CHAT** for \`${channel}\``)], components:[row],})
 const collector = m.channel.createMessageComponentCollector({ componentType: "BUTTON", max:1, time: 10000});
        collector.on("collect", async i => {
            if (i.user.id === m.author.id) {
              i.deferUpdate()
           if(i.customId === 'good') { 
             

const data = await cdb.findOneAndUpdate({Gid:c.guild.id, ClanId:clan_id}, {ClanINV:channel.id})
 
if(data)       {       s.edit({content: `Clan role changed successfully to ${channel}`, components:[],embeds:[]}).then(msg.delete())
               } else {
  s.edit('error i can not find data')
               }
                                     }
           if(i.customId === 'bad')  {
              s.edit({content: `Operation cancelled`, components:[],embeds:[]}).then(msg.delete())
           }

            } else {
               i.reply({ content: "These buttons aren't for you!", ephemeral: true });
            }
        });

});        
                     }
                   })
                                  })  
                     editselect.on("end", async (c, i) => {
   if(i === "time")   {       
                       rowE.components.forEach((c) => c.setDisabled(true));
      msg.edit({ components: [msg.components[0],rowE] }).catch((e) => {});

   }           })
                 }
       }
    })
    colector.on("end", async (c, i) => {
     raw.components.forEach((c) => c.setDisabled(true));
setTimeout( function() { msg.edit({ components: [ raw, msg.components[1]] }).catch((e) => {}); }, 500);    
    });
}
}