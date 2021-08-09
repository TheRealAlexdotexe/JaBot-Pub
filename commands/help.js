const loadCommands = require('./load-commands')
const { prefix } = require('../config.json')
const DiscordJS = require('discord.js')

module.exports = {
  commands: ['help', 'h'],
  description: "This!",
  callback: (message, arguments, text) => {
    let reply = new DiscordJS.MessageEmbed()
    .setColor('#00FF00')
    .setTitle('Here is a list of all commands')

    const commands = loadCommands()

    for (const command of commands) {
      // Check for permissions
      let permissions = command.permission

      if (permissions) {
        let hasPermission = true
        if (typeof permissions === 'string') {
          permissions = [permissions]
        }

        for (const permission of permissions) {
          if (!message.member.hasPermission(permission)) {
            hasPermission = false
            break
          }
        }

        if (!hasPermission) {
          continue
        }
      }

      // Format the text
      const mainCommand =
        typeof command.commands === 'string'
          ? command.commands
          : command.commands[0]
      const args = command.expectedArgs ? ` ${command.expectedArgs}` : ''
      const { description } = command

      // reply += `**${prefix}${mainCommand}${args}** = ${description} Aliases :${command.commands}\n`

      reply
      .addField(`**${prefix}${mainCommand}${args}**`, `${description}\nAliases : ${command.commands}`)

    }

    message.channel.send(reply)
  },
}