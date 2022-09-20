const {  MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('need help? here is all my commands')
 ,

    async execute(interaction, client) {


let embed = new MessageEmbed()
.setTitle("Help command")
.setDescription(`

/create-clan لصنع كلان
/list لاظهار قائمة الكلانات
/delete-clan لحذف كلان
/apply-clans لرسالة التقديم على الكلانات

/avatar لاظهار افتار شخص
/banner لاظهار بنر شخص
/user معلومات عن شخص
/server-info لاظهار معلومات عن السيرفر
/server-avatar لاظهار صورة السيرفر
/server-banner لاظهار بنر السيرفر ان وجد
/info لمعلومات عن البوت

/time-out لاعطاء تايم اوت لشخص بحيث لا يتكلم و لا يدخل فويسات لمدة معينه
/ban لحظر شخص من السيرفر 
/un-ban لإلغاء حظر شخص من السيرفر
/embed لارسال رسالة امبيد
/notification لارسال رسالة اختيار رتب الإشعارات

`)
      interaction.reply({embeds: [embed]})
    }

}