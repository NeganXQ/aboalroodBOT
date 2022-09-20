const { MessageEmbed}= require('discord.js')
const db = require('../../Modal/Warn.js')

module.exports = {
    name : 'warns',
  
     async execute(client, message, args, prefix)  {
   let Embed = new MessageEmbed()

       if(!message.member.permissions.has('MUTE_MEMBERS')) return message.channel.send({ embeds: [Embed.setColor('RED').setDescription('❌ - You do not have **MUTE_MEMBERS** permissions to use this command')]})
        if(!args[0]) return message.channel.send({ embeds: [Embed.setColor('RED').setDescription(`**📃 Warn: List**\n\Show the Warns that a member has.\n\n**Usage:**\n\n\`${prefix}warns\` \`[user]\``)] })

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
               if(!member) return message.channel.send({ embeds: [Embed.setColor('RED').setDescription(`🙄 - I didn't find this member`)] }) 

       const emojiList = ['⏮', '⏭']

const data = await db.findOne({guild:message.guild.id,user:member.id}).catch()
if (!data || data.content.length < 1) {
  return message.channel.send({ embeds: [Embed.setColor('WHITE').setDescription(`📃 - ${member} has no warns`)] }) 
}
       let pagesNum = Math.ceil(data.content.length / 5);
 if(pagesNum === 0) pagesNum = 1;
       		const warnStrings = [];
		for (let i = 0; i < data.content.length; i++) {
			const w = data.content[i];
			warnStrings.push(
				`**${i + 1}.**#${w.ID} at: <t:${(w.time)}:R> 
by:\`${w.staffTag}\` | \`(${w.staffID})\`
reason: \`${w.reason}\`\n\n`);
		}

  	const pages = [];
		for (let i = 0; i < pagesNum; i++) {
			const str = warnStrings.slice(i * 5, i * 5 + 5).join('');

			const embed = new MessageEmbed()
                .setAuthor({ name: `Warnings - ${member.id}`, iconURL: message.guild.iconURL({ dynamic: true }) })
				.setColor('#000001')
				.setDescription(`${str == '' ? '  Nothing' : '\n' + str}`)
				.setFooter({ text: `Page • ${i + 1}/${pagesNum}`});

			pages.push(embed);
		}
       const msg = await message.reply({ embeds: [pages[0]]})

         if (!pages) throw new Error('Pages are not given.');
    if (emojiList.length !== 2) throw new Error('Need two emojis.');
    let page = 0;
    const curPage = await msg.edit({ embeds: [pages[page].setFooter({ text: `Page • ${page + 1}/${pages.length} | ${data.content.length} • Warns`})]});
    if(pages.length == 0) return;
    for (const emoji of emojiList) await curPage.react(emoji);
    const filter = (reaction, user) => emojiList.includes(reaction.emoji.name) && !user.bot;
    const reactionCollector = curPage.createReactionCollector({ filter, time: 120000 });
    reactionCollector.on('collect', (reaction, user) => {


      reaction.users.remove(user)
        switch (reaction.emoji.name) {
            case emojiList[0]:
                page = page > 0 ? --page : pages.length - 1;
                break;
            case emojiList[1]:
                page = page + 1 < pages.length ? ++page : 0;
                break;
            default:
                break;
        }
        curPage.edit({ embeds: [pages[page].setFooter({ text: `Page • ${page + 1}/${pages.length} | ${data.content.length} • Warns`})]});
    });
    reactionCollector.on('end', () => curPage.reactions.removeAll());
    return curPage;
     
     }
}