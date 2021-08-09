const mongo = require('../../mongo')
const warnSchema = require('../../schemas/warn-schema')

module.exports = {
    commands: ['warn'],
    description: "Warns a user. It's useful for muting someone after 3 warnings",
    minArgs: 2,
    expectedArgs: "<Target user's @> <reason>",
    requiredRoles: ['Endermen'],
    callback: async (message, arguments) => {
        const target = message.mentions.users.first();
        if (!target) {
            message.reply(':x: | Warn who tho?')
            return
        }

        arguments.shift()

        const guildId = message.guild.id
        const userId = target.id
        const reason = arguments.join(' ')

        const warning = {
            author: message.member.user.tag,
            timestamp: new Date().getTime(),
            reason
        }

        await mongo().then(async mongoose => {
            try {
                await warnSchema.findOneAndUpdate({
                    guildId,
                    userId
                }, {
                    guildId,
                    userId,
                    $push: {
                        warnings: warning
                    }
                }, {
                    upsert: true
                })
                message.reply(`:white_check_mark: | Warned <@${userId}> for "${reason}".`)
            } finally {
                mongoose.connection.close()
            }
        })
    }
}