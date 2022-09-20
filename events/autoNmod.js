module.exports = {
    name: 'messageCreate',
    execute(message, client) {
      if(message.channel.id === "1013929685379461311") {
      

    if(isNaN(message.content)) {
            message.author.send(`${message.content}تم حذف رسالتك يجب أن تكون رسالتك رقما انجليزيا و ان لا تحتوي على كلمات`)
      return message.delete()
      }
      return
      let channel = message.channel
channel.messages.fetch({limit: 2}).then(res => {
let lm = res.last()
if(lm.content.length > 1) console.log("d")
return 
const lastWord = lm.split(' ').pop();
  var x = lastWord*1;
var y = x + 1
    if(message.content !== `${y}`) {
      message.delete()
      message.author.send(`${message.content}تم حذف رسالتك
      بسبب انها لا تأتي بعد رقم ${lm}`)
    }
})
      }
    }
}