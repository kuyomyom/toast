const { RichEmbed } = require("discord.js");
const { Colors } = require("../config");
const database = require("../util/database");
const { log } = require("../util/packages/Functions");

module.exports.run = async (client, message, args, { guild, user, error }) => {
	try {
		const type = args[0];
		const allowedTypes = ["enable", "disable"];

		if (!allowedTypes.includes(type)) return message.channel.send(
			new RichEmbed().setTitle("Leveling").setColor(Colors.FAILED).setDescription("Incorrect usage. You must use a valid keyword (`enable`, `disable`).").setFooter(message.author.tag, message.author.displayAvatarURL)
		);

		if (type === "enable") {
			database.guilds.update(message.guild.id, { levelingactive: true });
			log(guild, "Leveling", message.author.tag, "Set to", "Enabled");
			return message.channel.send(
				new RichEmbed().setTitle("Leveling").setColor(Colors.SUCCESS).setDescription(`**Moderator**: ${message.author.tag}\n**Set to**: Enabled`).setFooter(message.author.tag, message.author.displayAvatarURL).setTimestamp()
			);
		}

		if (type === "disable") {
			database.guilds.update(message.guild.id, { levelingactive: false });
			log(guild, "Leveling", message.author.tag, "Set to", "Disabled");
			return message.channel.send(
				new RichEmbed().setTitle("Leveling").setColor(Colors.SUCCESS).setDescription(`**Moderator**: ${message.author.tag}\n**Set to**: Disabled`).setFooter(message.author.tag, message.author.displayAvatarURL).setTimestamp()
			);
		}

	}
	catch (e) {
		error(e.stack);
	}
};

module.exports.data = {
	name: "leveling",
	description: "enable/disable the leveling module",
	type: "mod",
	usage: ["!leveling <enable/disable>"],
	aliases: null,
};