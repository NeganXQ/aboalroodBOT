module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
   //     if (!interaction.isChatInputCommand()) return;
let color = "#51ebff"


  const command = client.slashs.get(interaction.commandName);
        if (!command) return // delete command;
        try {
            await command.execute(interaction, client, color);
        } catch (error) {
            console.log(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
        
    }
                        }