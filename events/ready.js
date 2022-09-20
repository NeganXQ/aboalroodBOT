const m =  require("../Modal/Mute.js")

module.exports = {
                            name: 'ready',
                            once: true,
                           async execute(client) {
                            
                                
await m.find().then(async (documentsArray) => {
    documentsArray.forEach(async (d) => {
     
    const TimeNow = Date.now();
  
      if(d.time < TimeNow){ 
       
    const guild = await client.guilds.cache.get(d.guild)
        
              const member = guild.members.cache.get(d.member)
                if(!member) return
  
  
          const role = guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')
  if(!role) return
  
  await member.roles.remove(role.id)
              await m.deleteOne({member :member.id})
        
    return 
  }
  
  
            if(d.time > TimeNow) {

      const Exp = d.time - Date.now();
  
      setTimeout(async () => {
  
    const guild = await client.guilds.cache.get(d.guild)
  
  
              const member = guild.members.cache.get(d.member)
                if(!member) return
  
  
          const role = guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')
  if(!role) return
  
  await member.roles.remove(role.id)
        await m.deleteOne({member: member.id})
      }, Exp )   }  })
  
  
      
      
                           
    
                           })
                            },
                        };