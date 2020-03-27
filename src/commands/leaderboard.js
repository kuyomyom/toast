const { RichEmbed } = require("discord.js");
const { ensureLeveling, fuzzy } = require("../util/packages/Functions");
const { Colors } = require("../config");

module.exports.run = async (client, message, args, { guild, user, error }) => {
	try {
		if (!guild.levelingactive) return message.channel.send("Leveling is not enabled for this server.");

		text = "";
		Array.from(guild.leveling.values())
    		.sort((a, b) => b[2].level - a[2].level)
   			.splice(0, 9)
    		.map(i => `• **${client.users.get(i).tag}**\n\tLevel: ${(i[2].level).toString()}\n\tXP: ${(i[2].xp).toString()}`)
				 .forEach(i => text += i + "\n")

		const embed = new RichEmbed()
			.setTitle("Leaderboard")
			.setColor(Colors.DEFAULT)
			.setDescription(text)

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