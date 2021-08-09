const levels = require('../../levels')
const jobSchema = require('../../schemas/job-schema')
const mongo = require('../../mongo')
const DiscordJS = require('discord.js')

module.exports = {
    commands: ['rank', 'level'],
    description: 'Shows your worklevel/rank',
    cooldown: 5,
    callback: async (message) => {
        const guildId = message.guild.id
        const userId = message.author.id

        await mongo().then(async mongoose => {
            try {
                const results = await jobSchema.findOne({
                    guildId,
                    userId
                })

                if (results === null) {
                    message.reply('That user is unemployed!')
                    return
                } else {
                    message.reply(new DiscordJS.MessageEmbed()
                    .setColor('RANDOM')
                    .addFields(
                        { name: 'You are level', value: `${results.level}!`},
                        { name: 'Your salary is', value: `${results.level ** 2 * 50} per session!` },
                        { name: `You have ${results.xp} xp!`, value: `You need ${(results.level ** 2 * 100) - results.xp} more xp in order to level up again!`}
                    ) 
                    )
                }
            } finally {
                mongoose.connection.close()
            }
        })
    }
}