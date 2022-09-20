
const { Client, Intents, Interaction, MessageEmbed, Collection, MessageActionRow, MessageButton, MessageSelectMenu,Modal ,TextInputComponent } = require('discord.js');
const fs = require('fs')
const mongoose = require("mongoose")
const db = require("quick.db")
const { token, prefix,monogolink } = require('./config.json');

const mdb = require("./Modal/clanapply.js")



const cdb = require("./Modal/clanCreate.js")



const nr = require("./Modal/notification.js")



const clans = {};
const collectorD = {}
const client = new Client({
    intents: [
       Intents.FLAGS.GUILDS,
       Intents.FLAGS.GUILD_MESSAGES,
       Intents.FLAGS.GUILD_MEMBERS,
       Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
       Intents.FLAGS.GUILD_PRESENCES,
       Intents.FLAGS.GUILD_INVITES,
       Intents.FLAGS.GUILD_BANS,
       Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
       Intents.FLAGS.GUILD_INTEGRATIONS,
       Intents.FLAGS.GUILD_MESSAGE_TYPING,
       Intents.FLAGS.GUILD_VOICE_STATES,
       Intents.FLAGS.GUILD_WEBHOOKS,
       Intents.FLAGS.DIRECT_MESSAGES,
       Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
       Intents.FLAGS.DIRECT_MESSAGE_TYPING,

     
   ],
} );
module.exports = {
   client
}
const ts = require('@iamtraction/google-translate')

client.translate = async(text,interaction) => {
  const lang = await db.has(`lang-${interaction.guild.id}`) ? await db.get(`lang-${interaction.guild.id}`) : 'ar';
  const translated = await ts(text,{to: lang})
  return translated.text;
}


client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`)
  client.user.setActivity("AboAlrood", {
    type: "STREAMING",
    url: "https://www.youtube.com/watch?v=rjJ_O9bI1tA"
  });

      setInterval(() => {
    client.guilds.cache.forEach(guild => {
        const role = guild.roles.cache.get('987774662236844102')
        if(role) {
      role.edit({color : "RANDOM"})
        }
      })
  }, 230000)


    


});

client.commands = new Collection();
client.events = new Collection();

['commands', 'events'].forEach(handler => {
    require(`./handlers/${handler}`)(client);
})
client.slashs = new Collection();
const handlers = fs.readdirSync('./handlers').filter(file => file.endsWith('.js'));
const slashsFolders = fs.readdirSync('./Scommands');
for (file of handlers) {
    require(`./handlers/slashs.js`)(client);
}
client.slashCommands(slashsFolders, './Scommands');
client.on('messageCreate', message => {

    if(message.author.id === "557628352828014614" && message.content.includes("855534333204103210")){
       message.channel.send({content:`سيرد عليك الاداري قريبا`, components:[new MessageActionRow().addComponents(
        new MessageButton() 
        .setCustomId("press")
                      .setLabel('امياو')
                      .setStyle("SUCCESS")
      .setEmoji("✨")
        ) ]})
}

    if(message.author.bot) return; //returns doesn't respond to bot or webhook messages.
  
    if (message.content === prefix + 'autohelpembed123') {
       if (!message.member.permissions.has("ADMINISTRATOR"))  return 
   if (!message.guild.me.permissions.has("ADMINISTRATOR"))  return 
    const embed1 = new MessageEmbed()
    .setTitle('المساعدة التلقائية - Auto help')
    .setDescription('اهلا بكم في روم المساعدة \n \n قبل فتح اي تذكرة فالخادم تأكد من وجود مشكلتك هنا, إذا لم يكن سؤالك موجود يمكنك حينها فتح تذكرة')
    .setFooter({ text: 'ABO ALROOD', iconURL: message.guild.iconURL({ dynamic: true})})
    .setColor('#0004f1')

    const select1 = new MessageSelectMenu()
    .setPlaceholder("اختر سؤال")
    .setCustomId("Select")
    .addOptions([
        {
            label: 'كيفية التقديم على الإدارة',
            value: 'first'
        },
        {
            label: 'كيف اسوي كلان',
            value: 'second',
        },
        {
            label: 'التبليغ عن مشكلة او عضو',
            value: 'third'
        }, 
        {
            label: 'ماهي مميزات البوستر و الترستد و السيرفر سبورتر و الايفنت وينر',
            value: 'fourth'
        }, 
      /**  {
            label: 'كيف احصل رتبة ديزاينر',
            value: 'fifth'
        }, **/
        {
            label: 'كيف احصل رتبة البنات',
            value: 'sixth'
        }, 
        {
            label: 'كيف احصل رتبة رسام',
            value: 'seventh'
        },
      {
            label: 'كيف اقترح لعبة جديدة',
            value: 'eighth'
        }
    ])

    const row = new MessageActionRow()
    .addComponents([ select1 ])

    message.channel.send({ components: [row], embeds: [embed1] })
        }
  if(message.content.includes('برب')) {
          message.reply('تيت لا تطول علينا <a:red_heart:995003439966867526>')
          message.react("<a:pepo_shsmh:896842080071082014>")

  }
     if (message.content === 'السلام عليكم') {
      message.reply('و عليكم السلام منور <a:red_heart:995003439966867526>')
      message.react("<a:pepo_shsmh:896842080071082014>")
    }
   if (message.content === 'باك') {
      message.reply('ولكم منور <a:red_heart:995003439966867526>')
      message.react("<a:pepo_shsmh:896842080071082014>")
    }
  if(message.channel.id === "987049732843118642"){
message.channel.send("https://media.discordapp.net/attachments/870200349762400296/989118655734382632/gif-line.gif")
      message.react("<a:Yes1:856242488930729984>"); // do anything here
          message.react(" <a:No1:856242475148378112>"); // do anything here

    }
    if(message.channel.id === "988486539526942750"){
      message.react(" <a:hhhhhhh:926468708082257990>"); // do anything here
          message.react(" <a:weird:958737247849549854>"); // do anything here

  }     })





client.on('interactionCreate', async interaction => {
    if (!interaction.isSelectMenu()) return
    if (interaction.isSelectMenu()) {
        if (interaction.customId === "Select") {
            let values = "";
            await interaction.values.forEach(async value => {
                if (value === "first") {
                    interaction.reply({ content: '**كيف اقدر اصير إداري في سيرفر ابو الرود؟** \n \n ما بين كل فترة يتم فتح التقديم على الإدارة في الخادم, وطبعا سوف يتم تنبيهك في روم <#987040443978121267>', ephemeral: true })
                } else if (value === "second") {
                    interaction.reply({ content: `**كيف اسوي كلان**
                    لعمل كلان و سيتم ابلاغك بمتطلبات عمل كلان [من هنا](https://discord.com/channels/759523053842858034/987052400672120912/1000411964901687348)`, ephemeral: true})
                } else if (value === "third") {
                    interaction.reply({ content: '**كيفية التبليغ عن مشكلة او عضو فالسيرفر** \n\n [من هنا](https://discord.com/channels/759523053842858034/987052400672120912/1000411964901687348) يمكنك التبليغ عن اي مشكلة حدثت لك فالسيرفر سواء كانت مع عضو او إداري, تأكد من إرسال جميع الدلائل مع ID الشخص ', ephemeral: true})
                } else if (value === "fourth") {
                    interaction.reply({ content: `**ماهي مميزات البوستر و الترستد و السيرفر سبورتر و الايفنت وينر؟**
-الرياكشنات في الشات العام
-مشاركة الشاشة في الرومات الصوتية
- تغيير الاسم
-ارسال ملفات في الشات العام
-الوان الداعمين
-فتح رومات الداعمين
-ايقونة خاصة`, ephemeral: true})
                } else if (value === "fifth") {
                    interaction.reply({ content: '**كيف اخذ رتبة ديزاينر؟** \n \n قم بفتح تذكرة [من هنا](https://discord.com/channels/759523053842858034/987052400672120912/1000411964901687348) وارسل تصاميمك وانتظر مسؤول الديزاينرز', ephemeral: true })
                } else if (value === "sixth") {
                    interaction.reply({ content: '**كيف اخذ رتبة البنات؟** \n \n يمكنك فتح تذكرة [من هنا](https://discord.com/channels/759523053842858034/987052400672120912/1000411964901687348) وطلب رتبة البنات, بتجي وحدة من الإداريات وتتبع معاك خطوات الحصول عليها', ephemeral: true })
                 } else if (value === "seventh") {

                    interaction.reply({ content: `التقديم على رتبة ارتست 

١) رسم حلو 
٢) رسمتين مع دليل 

الدليل بالنسبة للرقمي الطبقات او فيديو مسرع للرسمة
بالنسبة للورقي تكتب اسمك بديسكورد او abo alrood على الرسمة
ثم قم بفتح تذكرة [من هنا](https://discord.com/channels/759523053842858034/987052400672120912/1000411964901687348)`, ephemeral: true })

                
                } else if (value === "eighth") {
                    interaction.reply({ content: `كيف اقترح لعبة جديدة؟
                يمكنك اقتراح لعبة جديدة عن طريق فتح تذكرة [من هنا](https://discord.com/channels/759523053842858034/987052400672120912/1000411964901687348)`, ephemeral: true })
                }
            })
        }
    }
})
client.on('interactionCreate', async (interaction) => {
  let Imember = interaction.member 

    if(interaction.isSelectMenu()) {

if(interaction.customId === "not") {
  

    for (let value of interaction.values) {
    let role = await nr.findOne({Rid: value})
   
      if (interaction.member.roles.cache.has(value)) {
 await interaction.member.roles.remove(value)
 } else { 
await interaction.member.roles.add(value) 
   
    }

    }
 await  interaction.reply({content:`تم تحديث رتبك بنجاح`, ephemeral: true})

    } }

    if(interaction.isModalSubmit()) {

  let data = await cdb.findOne({Gid: interaction.guild.id, ClanId: interaction.customId})
        const clanname = data.ClanN
  
      const ap2name = interaction.fields.getTextInputValue('Name1');

            const ap2age = interaction.fields.getTextInputValue('Age1');

                        const ap2mic = interaction.fields.getTextInputValue('Mic1');

let embed = new MessageEmbed()
      .setTitle("تقديم كلان")
      .setDescription(`تقديم من ${Imember.user.username } | ${Imember}
الايدي: ${Imember.id}
الكلان : ${clanname}
`)
      .addFields( 		{ name: 'الاسم', value: ap2name, inline: true }, 		{ name: 'العمر', value: ap2age, inline: true }, 		{ name: 'المايك', value: ap2mic, inline: true }, { name: 'حالة التقديم', value : 'حالة انتظار القبول او الرفض', inline: true} )
                //.setThumbnail(interaction.guild.iconURL({dynamic:true}))

                         const rb = new MessageActionRow().addComponents(

   new MessageButton() 
  .setCustomId("join2")
                .setLabel("قبول")
                .setStyle("SUCCESS")
.setEmoji("✅"),

                
  new MessageButton() 
  .setCustomId("leave2")
                .setLabel("رفض")
                .setStyle("DANGER")
.setEmoji("❌")
                           )
    
      if(data.length <= 0 || !data) return interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(`⁉️ - I can't find any clan data for this server or there is no clan with this ID ${interaction.customId}
||EROR CODE: 4_CLAN_DATA_NULL_${interaction.guild.id}_${interaction.customId}||`)], ephemeral: true })
     const clanrole = data.ClanR
      const channel = client.channels.cache.get(data.ClanINV)
      if(!channel) return interaction.reply({content: ":x: لا يمكنني ايجاد روم الطلبات الخاص بالكلان قد يكون انحذف,يرجى إبلاغ الإدارة لحل المشكلة", ephemeral: true})
try {
    const M = await  channel.send({embeds: [embed], components: [rb]})
                                mdb.create({guild: interaction.guild.id,Clan: clanname ,ClanId: clanrole, MessageId: M.id, MemberId: Imember.id})
  interaction.reply({content: "تم ارسال تقديمك بنجاح ✅", ephemeral: true})


} catch {return interaction.reply({content: ":x لا يمكنني ارسال الرسالة", ephemeral: true}) }

    
        }
    if (interaction.isButton()) {
      /**
      if (interaction.customId === 'removeN') {
         const data = await nr.find({Rguild: interaction.guild.id})
      if(data.length <= 0 || !data) return interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(`⁉️ - I can't find any clan data for this server.
||EROR CODE: 5_CLAN_DATA_NULL_${interaction.guild.id}||`)], ephemeral: true })
        const   roleid = []
      const search = data.forEach( (nr) => {
        roleid.push(nr.Rid)
      })
      //  console.log(roleid)
        try{
Imember.roles.remove(roleid)

await  interaction.reply({content:`تمت إزالة جميع رتب الإشعارات منك`, ephemeral: true})
     
        } catch {}
      }**/
      if (interaction.customId === 'press') {
        if (!interaction.member.roles.cache.has('855534333204103210')) return interaction.reply({content:`يمكن فقط اصحاب رتبة سبورت الضغط على هذا الزر`, ephemeral: true})
interaction.message.edit({content:`${interaction.member}: استلم التكت`, components:[]})

      }
      if (interaction.customId === 'removeN') {


Imember.roles.remove(['893217948653727784','999013372483878993','893217959412113458'])
 await  interaction.reply({content:`تم إزالة جميع رتب الإشعارات منك بنجاح`, ephemeral: true})


      }


      if (interaction.customId === 'join') {

const data = await cdb.find({Gid: interaction.guild.id})
      if(data.length <= 0 || !data) return interaction.reply({ embeds: [new MessageEmbed().setColor('RED').setDescription(`⁉️ - I can't find any clan data for this server.
||EROR CODE: 5_CLAN_DATA_NULL_${interaction.guild.id}||`)], ephemeral: true })                      
  const   roleid = []
  let list = []   
      const search = data.forEach( (cdb) => {
        roleid.push(cdb.ClanR)
      })

const mrid = interaction.member.roles.cache.map(role => role.id)
const intersection = mrid.filter(element => roleid.includes(element));
if(intersection.length >= 1)  return interaction.reply({content: "عليك الخروج من كلانك الحالي من أجل التقديم لكلان اخر،اذا اردت الخروج اضغط على زر خروج", ephemeral: true})  
  
const check4 = await mdb.findOne({guild:interaction.guild.id, MemberId:Imember.id})

        if(check4) return interaction.reply({content: "لقد قدمت من قبل لإحدى الكلانات، لإلغاء التقديم اضغط على زر الخروج", ephemeral: true}) 
        
  const row1 = new MessageActionRow()
        .addComponents(
    menu = new MessageSelectMenu()
    .setCustomId('clans_join')
    .setPlaceholder('Choose Clan ')

  )
  data.forEach(c => {
    menu.addOptions([
      {
        label: c.ClanN,
        value: c.ClanId,
      },
    ])
  })

          
  const msg = await interaction.reply({ content: "اختر الكلان الذي تريد التقديم له ✏", components: [row1], ephemeral: true })


        const collector = interaction.channel.createMessageComponentCollector({
          componentType: "SELECT_MENU",
          max: "1",
          idle: 10000
        })
        collector.on("collect", async (collected) => {

  if(collected.customId ==="clans_join") { 
                                           const modal = new Modal()
              .setCustomId(collected.values[0])
              .setTitle('تقديم كلان'); 		const Name2text = new TextInputComponent() 		
              .setCustomId('Name1') 
              .setLabel("اسمك") 		
            .setStyle('SHORT')
                        .setPlaceholder('اسمك - Name')
              .setMinLength('1') 
              .setMaxLength('25')
              .setRequired(true)
            const Age2text = new TextInputComponent() 			
              .setCustomId('Age1')
              .setLabel("عمرك") 		
            .setStyle('SHORT') 	
            .setPlaceholder('عمرك - Your age')
              .setMinLength('1') 
              .setMaxLength('2')
              .setRequired(true)
                        const Mic2text = new TextInputComponent() 			
              .setCustomId('Mic1')
              .setLabel("المايك") 		
            .setStyle('SHORT')
                        .setPlaceholder('مايك - Mic')
              .setMinLength('1') 
              .setMaxLength('15')
              .setRequired(true)
            const firstM1 = new MessageActionRow().addComponents(Name2text); 	
            const SecondM1 = new MessageActionRow().addComponents(Age2text); 		
                        const ThirdM1 = new MessageActionRow().addComponents(Mic2text); 		

            modal.addComponents(firstM1, SecondM1, ThirdM1); 		
            collected.showModal(modal);
      
            

  }
          
        })

      }
            if (interaction.customId === 'leave') {
              const m = await mdb.findOne({guild:interaction.guild.id, MemberId:Imember.id})
     const data = await cdb.find({Gid: interaction.guild.id})
      if(data.length <= 0 || !data) return interaction.reply ({ embeds: [new MessageEmbed().setColor('RED').setDescription(`⁉️ - I can't find any clan data for this server.
||EROR CODE: 5_CLAN_DATA_NULL_${interaction.guild.id}||`)], ephemeral: true }) 
        const   roleid = []
      const search = data.forEach( (cdb) => {
        roleid.push(cdb.ClanR)
      })

const mrid = interaction.member.roles.cache.map(role => role.id)
const intersection = mrid.filter(element => roleid.includes(element));
if(intersection.length >= 1) {  
   interaction.reply({content:"تم اخراجك من الكلان", ephemeral: true})  
 return Imember.roles.remove(roleid).catch()

                             }else if(m)   {

   const messid  = await m.MessageId

  const data2 = await cdb.findOne({Gid:interaction.guild.id,ClanN:m.Clan})
        if(data2.length <= 0 || !data2) return interaction.reply({ embeds: [new MessageEmbed().setColor('RED').setDescription(`⁉️ - I can't find any clan data with this name.Maby the last clan you applied has been deleted or the invite channel has been changed.
||EROR CODE: 3_CLAN_DATA_NULL_${interaction.guild.id}_DATA<=0||`)], ephemeral: true })
    const channel = await data2.ClanINV
if(!channel) return interaction.reply({content: ":x: لا يمكنني ايجاد روم الطلبات الخاص بالكلان قد يكون انحذف,يرجى إبلاغ الإدارة لحل المشكلة", ephemeral: true})
  const message = await client.guilds.cache.get(interaction.guild.id).channels.cache.get(channel).messages.fetch(messid)
if(!message) return interaction.reply({content: ":x: لا يمكنني ايجاد رسالة طلبك ربما حذفت او ان صلاحياتي غير كافية,يرجى إبلاغ الإدارة لحل المشكلة", ephemeral: true})
  const Embed = message.embeds[0]

            if(!Embed) return 

            Embed.fields[3] = {name: "حالة التقديم",  value: "تم الغاء التقديم"}
  try {
                    message.edit({embeds: [Embed.setColor('WHITE')], components: []})
  } catch {
    return interaction.reply({content: ":x:لا يمكنني تعديل الرسالة يرجى التأكد نت صلاحياتي و ابلاغ الادارة بذلك", ephemeral: true})
  }
  
return  interaction.reply({content: "تم الغاء طلب تقديمك", ephemeral: true}) 


} else {
  return interaction.reply({content:"انت لست باي كلان، للتقديم اضغط على زر التقديم", ephemeral: true})                         
}
                                   
}

      if (interaction.customId === 'join2') {

 const data = await mdb.findOne({guild:interaction.guild.id, MessageId: interaction.message.id }) 
      if(!data || data.length <= 0) return interaction.reply({ embeds: [new MessageEmbed().setColor('RED').setDescription(`⁉️ - I can't find any clan data / member request clan for this server.
||EROR CODE: 7MEMBER__CLAN_DATA_NULL_${interaction.guild.id}||`)], ephemeral: true })       
        const clan  =  data.Clan
const role = data.ClanId

        const me  = await interaction.guild.members.cache.get(data.MemberId)
         if(!me)  { 
                    interaction.message.edit({embeds: [Embed.setColor('RED').setDescription(`This is deleted request\n Member ID:${data.MemberId}`)], components: []})

           interaction.reply({content:`لا يمكنني ايجاد المتقدم,قد يكون غير  موجود بالسيرفر. الايدي:${data.MemberId}`, ephemeral: true})             
                      await mdb.deleteOne({guild:interaction.guild.id ,MessageId: interaction.message.id})  
                  
               return   }
                   if(!interaction.guild.me.permissions.has("MANAGE_ROLES")) return interaction.reply({ embeds: [new MessageEmbed().setColor('RED').setDescription(`⁉️ - I can't give role for this member because I do not have MANAGE_ROLES **permission**.
||EROR CODE: 1_MISSING_PERMISSION_MANAGE_ROLES_${interaction.guild.id}||`)], ephemeral: true })       
                         
        try {
me.roles.add(role)
        } catch {
return interaction.reply({ embeds: [new MessageEmbed().setColor('RED').setDescription(`⁉️ - I can't give role for this member because I do not have MANAGE_ROLES **permission** or the clan role is unavilabel.
||EROR CODE: 1_5_MISSING_PERMISSION_ROLES_${interaction.guild.id}||`)], ephemeral: true })     
        }
const message = interaction.message
const Embed = message.embeds[0]

            if(!Embed) return 

            Embed.fields[3] = {name: "حالة التقديم",  value: "تم قبولها"}
        try {
                    message.edit({embeds: [Embed.setColor('GREEN')], components: []})
me.send(`تم قبولك طلبك في كلان ${clan}`)
        } catch { return interaction.reply({content: ":x: فشلت عملية القبول يرجى التاكد من صلاحياتي", ephemeral: true})}
interaction.reply(`تم قبول ${me} بواسطه ${interaction.member}`)
      await mdb.deleteOne({ MessageId: interaction.message.id})


           
                                    



                }
            if (interaction.customId === 'leave2') {

 const data = await mdb.findOne({guild:interaction.guild.id, MessageId: interaction.message.id }) 

  if(!data || data.length <= 0) return interaction.reply({ embeds: [new MessageEmbed().setColor('RED').setDescription(`⁉️ - I can't find any clan data / member request clan for this server.
||EROR CODE: 7MEMBER__CLAN_DATA_NULL_${interaction.guild.id}||`)], ephemeral: true })       
              
        const me  = await interaction.guild.members.cache.get(data.MemberId)
              if(!me)  {
                    interaction.message.edit({embeds: [Embed.setColor('RED').setDescription(`This is deleted request\n Member ID:${data.MemberId}`)], components: []})

                interaction.reply({content:`لا يمكنني ايجاد المتقدم,قد يكون غير  موجود بالسيرفر. الايدي:${me}`, ephemeral: true})                      
                      await mdb.deleteOne({guild:interaction.guild.id ,MessageId: interaction.message.id})   

                        return
                       }  

const message = interaction.message
const Embed = message.embeds[0]

            if(!Embed) return 

            Embed.fields[3] = {name: "حالة التقديم",  value: "تم رفضها"}
                    message.edit({embeds: [Embed.setColor('RED')], components: []})

interaction.reply("تم رفض" + me)
      await mdb.deleteOne({guild:interaction.guild.id ,MessageId: interaction.message.id})


           

me.send("تم رفض طلب الكلان الخاص بك")
      await mdb.deleteOne({ MessageId: interaction.message.id})

                                      }
           
    }
})



client.on("messageDelete", async (message) => {

    const Dchannel = message.guild.channels.cache.get("987055731293429790")

    message.attachments.forEach(attachment => {
      const ImageLink = attachment.proxyURL;

      const embed = new MessageEmbed()
        .setDescription(`**Attachment Sent By: <@${message.author.id}>
Deleted In: <#${message.channel.id}> \n Content Of The Message: ${message.content}**`)
        .setColor("#0128ff")
        .setThumbnail(message.member.user.displayAvatarURL({ dynamic: true }))
        .setFooter(`Time: ${message.createdAt.toLocaleString()}`)

      const embed2 = new MessageEmbed()
        .setDescription(`**Attachment Sent By: <@${message.author.id}>
Content Of The Message: ${message.content}
Deleted In: <#${message.channel.id}>**`)
        .setColor("#0128ff")
        .setThumbnail(message.member.user.displayAvatarURL({ dynamic: true }))
        .setFooter(`Time: ${message.createdAt.toLocaleString()}`)

      if (ImageLink.endsWith(".mov") || ImageLink.endsWith(".mp4")) {

        Dchannel.send({
          embeds: [embed2],
          files: [
          `${ImageLink}`
          ] 
        })
      } else {
        Dchannel.send({
          embeds: [embed],
           files: [
          `${ImageLink}`
          ] 
        })
      }
      Dchannel.send('https://media.discordapp.net/attachments/870200349762400296/989118655734382632/gif-line.gif')
    });
  }) 



    const  mongooseConnectionString  = monogolink
    if (!mongooseConnectionString) return;

    mongoose.connect(mongooseConnectionString).then(() => console.log('Connected to mongodb'));

client.login(token)

process.on("unhandledRejection", (reason, p) => {

  console.log(" [Error_Handling] :: Unhandled Rejection/Catch");
  console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
  console.log(" [Error_Handling] :: Uncaught Exception/Catch");
  console.log(err, origin);
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
  console.log(" [Error_Handling] :: Uncaught Exception/Catch (MONITOR)");
  console.log(err, origin);
});
process.on("multipleResolves", (type, promise, reason) => {
  // console.log(" [Error_Handling] :: Multiple Resolves");
  // console.log(type, promise, reason);
});