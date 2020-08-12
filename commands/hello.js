const Command = require('../structures/Command');

module.exports = class extends Command {
  
  constructor(...args) {
    super(...args, {
      aliases: []
    })
  }

  async execute(client, message, args, prefix) {
    message.channel.send('the bot works')
  }
}

/**
 * So basically what you have to do here is change the command so it suits the best for you.
 * We can call this a "template" file.
 * Remember 'aliases' is not the only property you can pass into the command.
 */