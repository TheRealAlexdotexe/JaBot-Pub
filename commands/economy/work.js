const economy = require('../../economy')
const jobSchema = require('../../schemas/job-schema')
const mongo = require('../../mongo')
const levels = require('../../levels')
const DiscordJS = require('discord.js')
const colors = require('colors')

module.exports = {
    commands: ['work', 'job'],
    description: 'Work lol',
    maxArgs: 0,
    cooldown: 60 * 2,
    callback: async (message) => {
        levels.addXP(message.guild.id, message.author.id, 50, message)

        const results = await jobSchema.findOne({
            guildId: message.guild.id,
            userId: message.author.id
        })

        const coinsEarned = results.level ** 2 * 50

        const newBalance = economy.addCoins(message.guild.id, message.author.id, coinsEarned)

        const embed = new DiscordJS.MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`You went to work!`)
        .setDescription(`<:JB_Coin:874023062960472085> You earned ${coinsEarned} coins!`)

        message.reply(embed)
    }
}
