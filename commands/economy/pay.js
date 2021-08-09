const economy = require('../../economy')
const DiscordJS = require('discord.js')

// TODO: Fix thingy

module.exports = {
  commands: 'pay',
  description: 'Gives someone money',
  minArgs: 2,
  maxArgs: 2,
  expectedArgs: "<Target user's @> <Amount of coins>",
  callback: async (message, arguments, text) => {
    const { guild, member } = message

    const target = message.mentions.users.first()
    if (!target) {
      const errorOneEmbed = new DiscordJS.MessageEmbed()
      .setColor("#E92222")
      .setDescription(':x: | **Please** specify a target!')
      message.reply(errorOneEmbed)
      return
    }

    const coinsToGive = +arguments[1]
    if (isNaN(coinsToGive)) {
      const errorTwoEmbed = new DiscordJS.MessageEmbed()
      .setColor("#E92222")
      .setDescription(':x: | **Invalid** number of coins!')
      message.reply(errorTwoEmbed)
      return
    }

    if (coinsToGive<0) {
        const errorThreeEmbed = new DiscordJS.MessageEmbed()
        .setColor("#E92222")
        .setDescription(':x: | Tryna rob someone huh?')

        message.reply(errorThreeEmbed)
        return
    }

    const coinsOwned = await economy.getCoins(guild.id, member.id)
    if (coinsOwned < coinsToGive) {
      message.reply(`<:JB_Coin:874023062960472085> You do not have ${coinsToGive} coins!`)
      return
    }

    const remainingCoins = await economy.addCoins(
      guild.id,
      member.id,
      coinsToGive * -1
    )
    const newBalance = await economy.addCoins(guild.id, target.id, coinsToGive)

    const triBackTick = '```'
    const successEmbed = new DiscordJS.MessageEmbed()
    .setColor("#009206")
    .setTitle(`<:JB_Coin:874023062960472085> Successfully gave ${coinsToGive} coins!`)
    .addFields(
      { name: 'Their Balance:', value: `${triBackTick}\nOld Balance: ${newBalance - coinsToGive}\nNew Balance: ${newBalance}\n${triBackTick}` },
      { name: 'Your Balance:', value: `${triBackTick}\nOld Balance: ${remainingCoins + coinsToGive}\nNew Balance: ${remainingCoins}\n${triBackTick}`}
    )
    message.reply(successEmbed)
  },
}
