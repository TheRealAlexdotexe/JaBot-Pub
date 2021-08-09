// Database name: JaBotDB
// git push origin master --force
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Do this to update the git repo
// (--force is optional)
const colors = require('colors')
const path = require('path')
const fs = require('fs')
const DiscordJS = require('discord.js')
const intents = [
  DiscordJS.Intents.FLAGS.DIRECT_MESSAGES,
  DiscordJS.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
  DiscordJS.Intents.FLAGS.GUILD_BANS
]
const client = new DiscordJS.Client({ intents:  intents})
const antiAd = require('./anti-ad')
const config = require('./config.json')
const loadCommands = require('./commands/load-commands')
const mongoose = require('mongoose')
const mongo = require('./mongo')

client.on('ready', async () => {
  console.log('Success A'.green)
  await mongo().then(mongoose => {
    try {
      console.log('Success B'.green)
    } finally {
      mongoose.connection.close
    }
  })

  antiAd(client)
  loadCommands(client)
})

client.login(config.token)