const economy = require('../../economy')

module.exports = {
  commands: ['balance', 'bal'],
  description: 'Shows balance',
  maxArgs: 1,
  cooldown: 5,
  expectedArgs: "[Target user's @]",
  callback: async (message) => {
    const target = message.mentions.users.first() || message.author
    const targetId = target.id

    const guildId = message.guild.id
    const userId = target.id

    const coins = await economy.getCoins(guildId, userId)

    message.reply(`<:JB_Coin:874023062960472085> That user has ${coins} coins!`)
  },
}