const { RichEmbed } = require("discord.js");
const { ensureLeveling, fuzzy } = require("../util/packages/Functions");
const { Colors } = require("../config");

module.exports.run = async (client, message, args, { guild, user, error }) => {
	try {
		if (!guild.levelingactive) return message.channel.send("Leveling is not enabled for this server.");
		const test = Array.from(guild.leveling);
		let sort = Object.keys(test).sort((a, b) => test[a].level - test[b].level);
		
		message.channel.send(sort)

		const embed = new RichEmbed()
			.setTitle("Leaderboard")
			.setColor(Colors.DEFAULT)
			.setDescription()

		message.channel.send(embed);
	}
	catch (e) {
		error(e.stack);
	}
};

module.exports.data = {
	name: "leaderboard",
	description: "View the leaderboard for levels",
	type: "fun",
	usage: ["!leaderboard"],
	aliases: ["lb", "leaderboards"],
	guildOnly: true
};