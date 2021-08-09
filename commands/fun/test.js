module.exports = {
    commands: ['test', 'testing'],
    description: 'Test if the bot is working',
    callback: (message) => {
        message.reply('Working!');
    }
}