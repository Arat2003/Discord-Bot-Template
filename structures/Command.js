module.exports = class Command {
  constructor(client, name, options = {}) {
    this.client = client;
    this.name = options.name || name;
    this.aliases = options.aliases || [];
    this.description = options.description || 'No description provided.';
    this.category = options.category || 'Misc';
    this.usage = options.usage || '';
    this.devOnly = options.devOnly || false;
  }

  async execute(_client, _message, _args, _prefix) {
    throw new Error(`Command ${this.name} doesn't provide an 'execute' method`)
  }
}

/**
 * Most of these properties will make your Help command look cleaner.
 * What is devOnly for? 
 * This property is used for special commands that only developers can use, such as eval, reboot, reload, etc.
 * This makes your bot safer, since users would be able to run this commands and sometimes in malicious ways.
 */