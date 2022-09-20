const { MessageEmbed}= require('discord.js')


module.exports = {
    name : 'help',
  
     async execute(client, message, args,prefix)  {

        let Embed =  new MessageEmbed()

        if(!message.member.permissions.has('MUTE_MEMBERS')) return message.channel.send({ embeds: [Embed.setColor('RED').setDescription('❌ - You do not have **MUTE_MEMBERS** permissions to use this command')]})

     message.channel.send({embeds:[Embed.setDescription(`
${prefix}mute => لاعطاء ميوت لشخص
${prefix}unmute => لفك الميوت عن شخص 
${prefix}warn => لاعطاء شخص وورن 
${prefix}delwarn => لمسح وورن محدد بكتابة الوورن ايدي
${prefix}clwarn => لمسح جميع الوورنات الي عند شخص
${prefix}warns => لاظهار الوورنات الي عند شخص معين
${prefix}ping => بنق البوت 
${prefix}ban => لتبنيد شخص من السيرفر
${prefix}set-log => لوضع شات اللوقات

     لمزيد من المعلومات عن امر من الاوامر اكتب الامر فقط بدون اي اضافات
     `)]})
     }}