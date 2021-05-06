// load essential modules
const fs = require('fs');
const Discord = require('discord.js')
const client = new Discord.Client();
const pointsjs = require('./modules/points');
const matchesjs = require('./modules/matches');
const helpjs = require('./modules/help.js');
const fmjs = require('./modules/fm');

const config = require("./config.json") //contains prefix and token

//creates points DB
const Enmap = require("enmap")
client.points = new Enmap({name: "points"});

client.commands = new Discord.Collection();

// load all files from commands dir, filter out anything that isnt a js file
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

prefix = config.prefix

// load commands into collection we made earlier
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

//array to handle emotes sent on non-commands
var chrisemotes = ['<:chris1:775413580257689630>', '<:chris2:775413580212338708>', '<:chris3:775413580585107487>', '<:chris4:775413580807667720>', '<:chris5:775413580891553833>', '<:chris6:775413581021052958>',  '<:chris7:775413580782501918>',  '<:chris8:775413580832178206>'];

client.on('ready', () => {
  console.log('bot online!');
  client.user.setActivity('wubwub bass', { type: 'PLAYING' }); 
});

client.on('message', message => {
  if (message.author.bot) return;
  if (message.guild) {
		pointsjs.points(message, client)
	}
  matchesjs.checkmatches(message);
  if (!message.content.startsWith(prefix)) return;
   //take away prefix
  const args = message.content.slice(prefix.length).split(/ +/);

  // make the command lowercase
	const cmdName = args.shift().toLowerCase();

  //run modules, this is awful ill fix it lmao
	if (cmdName === "points") {
    pointsjs.pointcheck(message, client);
		return;
  }
  if(cmdName === "leaderboard") {
    pointsjs.leaderboard(message, client, args);
		return;
	}
  if(cmdName === "help") {
    helpjs.help(message, client, args);
		return;
	}
  if(cmdName === "help") {
    fmjs.fm(message, args);
    return
  }
  // If it's not a real command, the bot will send an emoji in response.
  if (!client.commands.has(cmdName)) {
    var emoterand = Math.floor(Math.random() * chrisemotes.length);
    message.channel.send(chrisemotes[emoterand])
    return;
  }
  try {
    client.commands.get(cmdName).execute(message, args, config);
    console.log(`${cmdname}: success`)
  } catch (error) {
    //ChrisBot done goofed
  console.error(error);
  message.reply('I fucked up that ~~bassline~~ command, try again?');
  }
});

client.login(config.token)