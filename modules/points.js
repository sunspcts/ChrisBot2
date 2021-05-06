const Discord = require('discord.js')
exports.points = (message, client) => {
	const key = `${message.guild.id}-${message.author.id}`;

	// Triggers on new users we haven't seen before.
	client.points.ensure(`${message.guild.id}-${message.author.id}`, {
		user: message.author.id,
		guild: message.guild.id,
		tag: message.member.user.tag,
		points: 0,
		level: 0
	});
	var RandPoints = Math.floor(Math.random() * 10) + 5;
	client.points.math(key, "+", RandPoints, "points");
	// Calculate the user's current level
	const curLevel = Math.floor(0.1 * Math.sqrt(client.points.get(key, "points")));
	// Act upon level up by sending a message and updating the user's level in enmap.
	if (client.points.get(key, "level") < curLevel) {
		client.points.set(key, curLevel, "level");
		if (curLevel % 5 === 0) {
			message.channel.send(`${message.author} reached level ${curLevel}, tell ave their code worked so they can take this message out`);
		}
	}
}; 
exports.pointcheck = (message, client) => {
	const key = `${message.guild.id}-${message.author.id}`;
	return message.channel.send(`You currently have ${client.points.get(key, "points")} points, and are level ${client.points.get(key, "level")}!`);
}
exports.leaderboard = (message, client, args) => {
	// Get a filtered list (for this guild only), and convert to an array while we're at it.
	const filtered = client.points.filter( p => p.guild === message.guild.id ).array();
  
	// Sort it to get the top results... well... at the top. Y'know.
	const sorted = filtered.sort((a, b) => b.points - a.points);
	
	n = parseInt(args[0]);

	//calculate the top 10
	if(!isNumber(n)) {
		n = 1
	}
	n2 = (n-1) * 10
	const top10 = sorted.slice(n2, n2 + 10);

	// embed time!
	const embed = new Discord.MessageEmbed()
		.setTitle("Leaderboard")
		.setAuthor(client.user.username, message.guild.iconURL())
		.setDescription(`Page ${n}`)
		.setColor(0x00AE86);
	for(const data of top10) {
		try {
			embed.addField(client.users.cache.get(data.user).tag, `${data.points} points (level ${data.level})`);
		} catch {
			embed.addField(`<@${data.tag}>`, `${data.points} points (level ${data.level})`);
		}
	}
	embed.setFooter("non-cached users shown as ids");
	return message.channel.send({embed});
}
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}