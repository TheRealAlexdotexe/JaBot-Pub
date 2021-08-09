const mongo = require('../../mongo')
const warnSchema = require('../../schemas/warn-schema')
const DiscordJS = require('discord.js')

module.exports = {
    commands: [
    'infractions',
    'wrnhistory',
    'listwarnings',
    'showwarnings',
    'lw',
    'infractionhistory',
    'showinfractionhistory',
    'showinfraction',
    ],
    description: 'Shows how many warns a person has',
    minArgs: 1,
    expectedArgs: "<Target User's @",
    requiredRoles: ['Endermen'],
    callback: async (message, arguments, text) => {
        const target = message.mentions.users.first()
        if (!target) {
            message.reply(':x: | Please specify a target!')
            return
        }

        const guildId = message.guild.id
        const userId = target.id

        await mongo().then(async mongoose => {
            try {
                const results = await warnSchema.findOne({
                    guildId,
                    userId,

                })

                if (results === null) {
                    message.channel.send(new DiscordJS.MessageEmbed()
                    .setColor("#009206")
                    .setDescription(':+1: Clean Record!'))
                    return
                }

                let reply = new DiscordJS.MessageEmbed()
                .setColor('#E9A822')
                .setDescription(`**Infrations for <@${userId}>:**`)

                for (const warning of results.warnings) {
                    const { author, timestamp, reason } = warning
                    // Warned by ${author} on ${new Date(timestamp).toLocaleDateString()} for "${reason}"\n\n
                    reply.addField(`Warned by ${author} on ${new Date(timestamp)}`, `"${reason}"`)
                }

                message.reply(reply)
            } finally {
                mongoose.connection.close()
            }
        })
    }
}