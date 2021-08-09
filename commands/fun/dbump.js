module.exports = {
    commands: ['dbump', 'db'],
    description: 'no',
    callback: (message) => {
        message.channel.send("!d bump")
    }
}