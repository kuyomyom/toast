const { RichEmbed } = require('discord.js');
const { Info, Logging } = require('../config');

module.exports = async (client) => {

	const username = Info.NAME;
	const startChannel = Logging.LOG_CHANNEL;

	console.log(`Logged in as ${client.user.tag} (${client.user.id})`);
	client.user.setActivity('t!help', {
		type: 'STREAMING',
		url: 'https://twitch.tv/monster',
	});

	const readyEmbed = new RichEmbed()
		.setTitle(`${username}: Process Started Successfully`)
		.setColor('3483eb')
		.setDescription(`${username} has successfully logged in. Check the footer to view the exact time.`)
		.setTimestamp();

	client.channels.get(startChannel).send(readyEmbed);
};
