const { RichEmbed } = require("discord.js");
const { Logging } = require("../config");
const { runCommand, initDB, filterString } = require("../util/packages/Functions");

module.exports = async (client, message) => {
	if (message.author.bot) return;

	let [user, guild] = await initDB(message);
	filterString(message, guild);

	const prefixes = [`<@${client.user.id}>`, `<@!${client.user.id}>`].concat(guild.prefix);
	let prefix = false;
	for (const p of prefixes) message.content.startsWith(p) ? prefix = p : null;

	const args = message.content.slice(prefix.length).trim().split(" ");

	function error(text) {
		const embed = new RichEmbed()
			.setTitle("An error has occured")
			.addField("Information", text);
		return client.channels.get(Logging.LOG_CHANNEL).send(embed);
	}

	runCommand(client, message, args, { guild, user, error });
};