//help is what i fucking need 
const Discord = require('discord.js')
const config = require("../config.json") //grab prefix
exports.help = (message, client, args) => {
	const cmdName = args[0]
	if (!client.commands.has(cmdName)) {
		message.channel.send("You need to tell me what command you need help with!")
  }
	else {
		const embed = new Discord.MessageEmbed()
		.setTitle("Command Name")
		.setAuthor(client.user.username, message.guild.iconURL())
		.setDescription(client.commands.get(cmdName).help.name)
		.setColor(0x00AE86);
		embed.addField("Description", client.commands.get(cmdName).help.description);
		embed.addField("Usage", config.prefix + client.commands.get(cmdName).help.usage);
		return message.channel.send({embed});
	}
};