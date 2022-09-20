const { MessageEmbed } = require('discord.js');
const { Constants: { ChannelTypes } } = require('discord.js')
const {SlashCommandBuilder} = require('@discordjs/builders');
const cdb = require("../../Modal/clanCreate.js")


module.exports = {
    data: new SlashCommandBuilder()
    .setName('create-clan')
    .setDescription('➕ Create a new clan for your server')
    .addStringOption(option => 
        option
        .setName('clan_name')
        .setDescription('The Name for the clan')
        .setRequired(true)
    )
    .addUserOption(option =>
        option.setName('clan_owner')
            .setDescription('The Owner of the clan')
            .setRequired(true))
    .addUserOption(option =>
        option.setName('clan_co-owner')
            .setDescription('The Co-Owner of the clan')
            .setRequired(true))
  .addRoleOption(option =>
        option.setName('clan_role')
            .setDescription(`The Role for the clan *If you didn't put role the bot will make it automaticly`)
            .setRequired(false))
  .addChannelOption(option =>
        option.setName('clan_invite-chat')
            .setDescription(`The invite chat for the clan *If you didn't put it the bot will make clan channels automaticly`)
     .addChannelTypes(ChannelTypes.GUILD_TEXT)
            .setRequired(false)),
  
  async execute(interaction, client) { 
    
        if(!interaction.inGuild()) return    interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(`❌ - This command can not run in DM`)], ephemeral: true })
 
    
    if (!interaction.member.permissions.has("ADMINISTRATOR")) return    interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(`❌ - You need **ADMINISTRATOR** permission to use this command`)], ephemeral: true })              

    let newc
const name = interaction.options.getString('clan_name')
    if (isCommunity(interaction.guild)) {
      newc = "GUILD_NEWS"
    } else {
      newc = "GUILD_TEXT"
    }

    
            let owner = interaction.options.getMember('clan_owner');
            let co = interaction.options.getMember('clan_co-owner');

    const role = interaction.options.getRole('clan_role') ||  await interaction.guild.roles.create({name: name})
if(interaction.guild.me.roles.highest.position <= role.position)  return interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(`🙄 - You can't put a clan role higher than me`)], ephemeral: true })        

    let channel = interaction.options.getChannel('clan_invite-chat')
    let cha
    if(channel) cha = channel.id
    if(!channel) {
  let createUnder = await interaction.guild.channels.create(name, {
    type: "GUILD_CATEGORY",
    permissionOverwrites: [{
      id: role.id,
      allow: ['SEND_MESSAGES',  'VIEW_CHANNEL'],

    },
                           {
                      id: interaction.guild.id,
                             deny: ['VIEW_CHANNEL']
                           }]
  })  
      
let invite = await interaction.guild.channels.create(`${name}-invite`, {
    type: "GUILD_TEXT",
parent: createUnder.id,
permissionOverwrites:[{
//owner permissions
  id:owner.id,
      allow: ['VIEW_CHANNEL',  'SEND_MESSAGES'],
},
               //co owner permissions
                      {id: co.id,      allow: ['VIEW_CHANNEL','SEND_MESSAGES'],
}, 
                      { 
                        //every one permissions
                        id:interaction.guild.id,
               deny: ['VIEW_CHANNEL']       
                      }
                     ]

  }) 
cha = invite.id      
let news = await interaction.guild.channels.create(`${name}-news`, {
    type: newc,
parent: createUnder.id,
permissionOverwrites:[{
//owner permissions
  id:owner.id,
      allow: ['SEND_MESSAGES',  'MENTION_EVERYONE', 'MANAGE_MESSAGES'],
},
               //co owner permissions
                      {id: co.id,  
      allow: ['SEND_MESSAGES',  'MENTION_EVERYONE', 'MANAGE_MESSAGES'],
}, 
                      {
id:role.id,
 allow: ['VIEW_CHANNEL'],          
                        deny:['SEND_MESSAGES']
                      },{
                        //every one permissions
                        id:interaction.guild.id,
               deny: ['VIEW_CHANNEL']       
                      }
                     ]

  }) 

      
let chat = await interaction.guild.channels.create(`${name}-chat`, {
    type: "GUILD_TEXT",
parent: createUnder.id,
permissionOverwrites:[{
//owner permissions
  id:owner.id,
      allow: ['SEND_MESSAGES',  'MENTION_EVERYONE', 'MANAGE_MESSAGES'],
},
               //co owner permissions
                      {id: co.id,  
      allow: ['SEND_MESSAGES',  'MENTION_EVERYONE', 'MANAGE_MESSAGES'],
}, 
                      {
id:role.id,
 allow: ['VIEW_CHANNEL','SEND_MESSAGES'],          
                      },{
                        //every one permissions
                        id:interaction.guild.id,
               deny: ['VIEW_CHANNEL']       
                      }
                     ]

  }) 
            
let cmd = await interaction.guild.channels.create(`${name}-cmd`, {
    type: "GUILD_TEXT",
parent: createUnder.id,
permissionOverwrites:[{
//owner permissions
  id:owner.id,
      allow: ['SEND_MESSAGES',  'MENTION_EVERYONE', 'MANAGE_MESSAGES'],
},
               //co owner permissions
                      {id: co.id,  
      allow: ['SEND_MESSAGES',  'MENTION_EVERYONE', 'MANAGE_MESSAGES'],
}, 
                      {
id:role.id,
 allow: ['VIEW_CHANNEL','SEND_MESSAGES','USE_APPLICATION_COMMANDS'],          
                      },{
                        //every one permissions
                        id:interaction.guild.id,
               deny: ['VIEW_CHANNEL']       
                      }
                     ]

  }) 
                
let voice = await interaction.guild.channels.create(`${name}`, {
    type: "GUILD_VOICE",
parent: createUnder.id,
permissionOverwrites:[{
//owner permissions
  id:owner.id,
      allow: ['SEND_MESSAGES',  'MENTION_EVERYONE', 'MANAGE_MESSAGES'],
},
               //co owner permissions
                      {id: co.id,  
      allow: ['SEND_MESSAGES',  'MENTION_EVERYONE', 'MANAGE_MESSAGES'],
}, 
                      {
id:role.id,
 allow: ['VIEW_CHANNEL','SEND_MESSAGES','USE_APPLICATION_COMMANDS','CONNECT','SPEAK'],          
                      },{
                        //every one permissions
                        id:interaction.guild.id,
                        allow:['VIEW_CHANNEL'],
               deny: ['CONNECT']       
                      }
                     ]

  }) 
    
    
    }
owner.roles.add(role.id)
co.roles.add(role.id)
  
      

function MakeID(I) {
          var t = "";
          var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        
          for (var i = 0; i < I; i++)
            t += possible.charAt(Math.floor(Math.random() * possible.length));
        
          return t;
        }
//creating random token for clan id
    let ID = MakeID(8)
    console.log(ID)

     let saveID = cdb.create({
       Gid: interaction.guild.id,
      ClanN: name, 
        ClanINV: cha,
       ClanR:  role.id,
      ClanId: ID, 
      })

  interaction.reply ({ embeds: [new MessageEmbed().setColor('GREEN').setDescription(`✅ - Clan \`${name}\`  successfully created by ${interaction.member}
To show the apply message for clan write /clan-apply  
`)] }) 

    
   }}


function isCommunity(guild) { return guild.features?.includes('COMMUNITY');
                            }
