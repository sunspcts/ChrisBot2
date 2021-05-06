module.exports = {
	name: 'ping',
	execute(message) {
		message.channel.send('pong');
	},
};
module.exports.help = {
	name: 'ping',
	description: "does what you\'d expect tbh",
	usage: 'ping'
}