// const DBL = require("dblapi.js");
const { config } = require("dotenv");
const { RichEmbed, Client } = require('discord.js');
const { Info, Logging } = require('../config');

// const dbl = new DBL(process.env.DBL_TOKEN, Client);

module.exports = async (client) => {

	const totalGuilds = await client.shard.fetchClientValues('guilds.size');
	const username = Info.NAME;
	const startChannel = Logging.LOG_CHANNEL;

	console.log(`Logged in as ${client.user.tag} (${client.user.id})`);
	client.user.setActivity('t!help', {
		type: 'STREAMING',
		url: 'https://twitch.tv/monster',
	});

	/*dbl.postStats(totalGuilds, client.shards.Id, client.shards.total);
	setInterval(() => {
        dbl.postStats(totalGuilds, client.shards.Id, client.shards.total);
    }, 1800000);*/

	const readyEmbed = new RichEmbed()
		.setTitle(`${username}: Process Started`)
		.setColor('3483eb')
		.setDescription(`${username} has successfully logged in. Check the footer to view the exact time.`)
		.setTimestamp();

	client.channels.get(startChannel).send(readyEmbed);
};
