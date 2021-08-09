const DiscordJS = require('discord.js')
const random = require('random')
const economy = require('../../economy')

module.exports = {
    commands: ['rob', 'steal'],
    description: 'Rob someone!',
    cooldown: 60 * 2,
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: "<Target's @>",
    callback: async (message, arguments) => {
        let coinsStole = 0
        const target = message.mentions.users.first()
        const embed = new DiscordJS.MessageEmbed()

        if (!target) {
            message.reply(':x: | Please specify a target!')
            return
        }

        if (random.boolean() === false) {
            let fine = random.int((min = 200), (max = 500))
            const coins = await economy.getCoins(message.guild.id, message.author.id)
            if (coins < fine) {
                fine = coins
            }
            const charge = await economy.addCoins(message.guild.id, message.author.id, -fine)
            embed
            .setColor('#FF0000')
            .setTitle('🚨 You got caught! 🚨')
            .setDescription(`<:JB_Coin:874023062960472085> You have been fined ${fine} coins!`)
        } else {
            coinsStole = random.int((min = 200), (max = 400))
            const targetCoins = await economy.getCoins(message.guild.id, target.id)
            if (coinsStole > targetCoins) {
                coinsStole = targetCoins
            }
            const yourCoins = await economy.addCoins(message.guild.id, message.author.id, coinsStole)
            const theirCoins = await economy.addCoins(message.guild.id, target.id, -coinsStole)
    
            embed
            .setColor('#00FF00')
            .setTitle(`<:JB_Coin:874023062960472085> Successfully stole ${coinsStole} coins!`)
            .setDescription('The police might be on your tail :eyes:')
        }
        
        message.channel.send(embed)
    }
}