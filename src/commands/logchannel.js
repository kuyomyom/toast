const { RichEmbed } = require('discord.js');
const { Colors } = require('../config');
const database = require('../util/database');

module.exports.run = async (client, message, args, { guild, error }) => {
	try {
		if (!message.content.includes('off') && !message.mentions.channels.first()) return message.channel.send(
			new RichEmbed().setTitle('Log Channel').setColor(Colors.FAILED).setDescription('Incorrect usage. You must mention a valid channel.').setFooter(message.author.tag, message.author.displayAvatarURL)
		);

		if (message.content.includes('off')) {
			database.guilds.update(message.guild.id, { logchannel: null });
			return message.channel.send(
				new RichEmbed().setTitle('Log Channel').setColor(Colors.SUCCESS).setDescription(`**Moderator**: ${message.author.tag}\n**Logging** N/A\n**Set to**: Off`).setFooter(message.author.tag, message.author.displayAvatarURL).setTimestamp()
			);
		}

		database.guilds.update(message.guild.id, { logchannel: message.mentions.channels.first().id });

		const filterEmbed = new RichEmbed()
			.setTitle('Log Channel')
			.setColor(Colors.SUCCESS)
			.setDescription(`**Moderator**: ${message.author.tag}\n**Logging** ${message.mentions.channels.first().name}`)
			.setFooter(message.author.tag, message.author.displayAvatarURL)
			.setTimestamp();

		message.channel.send(filterEmbed);

	}
	catch (e) {
		error(e.stack);
	}
};

module.exports.data = {
	name: 'logchannel',
	description: 'Set or disable logging',
	type: 'mod',
	usage: ['!logchannel <#channel/off>'],
	aliases: ['logs', 'setlogs'],
	permissions: "Administrator",
	guildOnly: true
};