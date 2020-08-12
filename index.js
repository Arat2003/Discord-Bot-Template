// const chalk = require('chalk'); // This package makes console.logs much cleaner.
const { Client, Collection } = require('discord.js');
require('dotenv/config');
const Loader = require('./structures/loader');

const client = new Client();
client.commands = new Collection();

/**
 * You can set the prefix to be whatever you want. 
 * You can also use databases and/or maps to personalize them per server.
 */
let prefix = '!'

const loader = new Loader(client);

loader.loadCommands();

client.once('ready', () => {
  console.log(`Logged in as ${client.user.username}`)
})

client.on('message', message => {  
  if(message.mentions.has(client.user) && !message.mentions.everyone) {
    console.log('someone pinged me');
    // You can either delete this whole function or make the bot respond when someone pings it.
  };

  if(!message.guild) return;
  if(!message.content.startsWith(prefix) || message.author.bot) return;
  
  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase()

  const command = client.commands.get(commandName)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
  if(!command) return;

  // const config = require('config.json')
  /**
   * You can setup a config.json file which has an array with multiple developer IDs (in case the bot was developed by a team).
   * In that case, instead of message.author.id !== 'id', you could change it to:
   * config.developers.includes(message.author.id)
   */
  if(command.devOnly && message.author.id !== 'DEVELOPER ID GOES HERE') return; 
  

  try{
    /**
     * You can decide what to pass to the command.
     * I tend to pass all these four parameters since I will maybe need them.
     */
    command.execute(client, message, args, prefix)
  } catch (error){
    console.log(error)
    message.reply('there was an error trying to execute that command!');
  }
})

client.login(process.env.TOKEN);