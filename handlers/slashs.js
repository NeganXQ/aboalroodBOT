const fs = require("fs");

module.exports = (client) => {
    client.slashCommands = async (slashsFolders, path) => {
  client.commandArray = [];
  try {
    client.on("ready", async () => {
      await client.application.commands.set([]);
      
      for (folder of slashsFolders) {
        const commandFiles = fs.readdirSync(`${path}/${folder}`).filter((file) => file.endsWith(".js"));
        for (const file of commandFiles) {
          const commandData = require(`../Scommands/${folder}/${file}`);
          client.slashs.set(commandData.data.name, commandData);
          client.commandArray.push(commandData.data.toJSON());
        }
      }
      try {
        client.application.commands.set(client.commandArray);
      } catch (err) {
        console.log(err);
      } 
    });
    console.log("\nStarted refreshing application (/) commands.\nSuccessfully reloaded application (/) commands.\n");
  } catch (error) {
    console.log(error);
  }
}; 
}