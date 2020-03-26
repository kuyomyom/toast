const { RichEmbed } = require("discord.js");
const { ensureLeveling, fuzzy } = require("../util/packages/Functions");
const { Colors } = require("../config");

module.exports.run = async (client, message, args, { guild, user, error }) => {
	try {
		if (!guild.levelingactive) return message.channel.send("Leveling is not enabled for this server.");

		let targetMember = message.mentions.members.first()
		if (!targetMember) {
			targetMember = message.guild.members.find(m => fuzzy(args[0], m.user.tag.toLowerCase() + "~>" + m.id)) || message.member;
		}
		
		const leveling = new Map(guild.leveling);
		const userLevel = leveling.get(targetMember.id) || { level: 1, xp: 0, lastXP: 175 };

		const embed = new RichEmbed()
			.setTitle(`${targetMember.user.tag}'s level`)
			.setColor(Colors.DEFAULT)
			.setThumbnail(targetMember.user.displayAvatarURL)
			.setDescription(`**Level ${userLevel.level}**\n• ` + (userLevel.lastXP - userLevel.xp).toString() + `xp needed to level up`)

		message.channel.send(embed);
	}
	catch (e) {
		error(e.stack);
	}
};

module.exports.data = {
	name: "level",
	description: "Check yours or the specified users level",
	type: "fun",
	usage: ["!level [user]"],
	aliases: ["xp", "rank"],
	guildOnly: true
};