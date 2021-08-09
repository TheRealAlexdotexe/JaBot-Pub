const DiscordJS = require('discord.js')

module.exports = {
    commands: ['ping', 'pong'],
    description: 'Pong!',
    callback: (message, arguments, text, client) => {
        message.channel.send('_Loading..._').then((resultMessage) => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp
        
            const successEmbed = new DiscordJS.MessageEmbed()
            .setColor("#E9A822")
            .setTitle("Ping Results:")
            .addFields(
                { name: 'Bot Latency:', value: `${ping}` },
                { name: 'API Latency:', value: `${client.ws.ping}`}
            )

            resultMessage.edit('_ _')
            resultMessage.edit(successEmbed)
        })
    }
}