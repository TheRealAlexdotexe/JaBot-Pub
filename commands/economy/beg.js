const random = require('random')
const DiscordJS = require('discord.js')
const economy = require('../../economy')

module.exports = {
    commands: ['beg', 'plsmoney'],
    description: 'Beg for money',
    cooldown: 30,
    callback: async (message) => {
        let coinsToGive = 0
        const msgs = require('../../json/beg.json')

        if (random.boolean() === false) {
            var pronoun = 'He'
        } else {
            var pronoun = 'She'
        }

        if (random.boolean() === false) {
            coinsToGive = 0
            var embed = new DiscordJS.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`"${msgs.bad.badmessages[Math.floor(Math.random() * msgs.bad.badmessages.length)]}"`)
            .setDescription(`${pronoun} ${msgs.bad.badactions[Math.floor(Math.random() * msgs.bad.badactions.length)]}!`)
        } else {
            coinsToGive = random.int((min = 10), (max = 70))
            var embed = new DiscordJS.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`"${msgs.good.goodmessages[Math.floor(Math.random() * msgs.good.goodmessages.length)]}"`)
            .setDescription(`<:JB_Coin:874023062960472085> You got ${coinsToGive} coins!`)
        }

        const newBalance  = await economy.addCoins(message.guild.id, message.author.id, coinsToGive)

        message.channel.send(embed)
    }
}