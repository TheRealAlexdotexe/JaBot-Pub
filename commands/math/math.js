const { evaluate } = require('mathjs')

module.exports = {
    category: 'Math',
    commands: ['math', 'mth', 'equation'],
    description: 'Does math lmao',
    cooldown: 10,
    minArgs: 1,
    expectedArgs: '<equation>',
    callback: async (message, argument, text) => {
        try {
            text = text.replace("pie", "pi")
            text = text.replace("x", "*")
            text = text.replace("sq", "sqrt")
            const responce = evaluate(text)
            const triBackTick = '```'
            message.reply(`:pencil: |  The answer is...\n${triBackTick}${responce}${triBackTick}\n Was I correct? :wink:`)
        } catch {
            return message.reply(":nerd: I dont think thats an equation silly!")
        }
    }
}