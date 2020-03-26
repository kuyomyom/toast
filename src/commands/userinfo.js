const { RichEmbed } = require("discord.js");
const { ensureLeveling, fuzzy } = require("../util/packages/Functions");
const { Colors } = require("../config");

module.exports.run = async (client, message, args, { guild, user, error }) => {
	try {
		let targetMember = message.mentions.members.first()
		if (!targetMember) {
			targetMember = message.guild.members.find(m => fuzzy(args[0], m.user.tag.toLowerCase() + "~>" + m.id)) || message.member;
		}

		const embed = new RichEmbed()
			.setTitle("Profile")
			.setColor(Colors.DEFAULT)
			.setThumbnail(targetMember.user.displayAvatarURL)
			.addField("Information", `• Username: ${targetMember.user.tag}\n• Nickname: ${targetMember.displayName}\n• ID: ${targetMember.id}\n• Account Creation: ${targetMember.user.createdAt}\n• Joined Server: ${targetMember.joinedAt}`)

		message.channel.send(embed);
	}
	catch (e) {
		error(e.stack);
	}
};

module.exports.data = {
	name: "userinfo",
	description: "Check yours or the specified users information",
	type: "util",
	usage: ["!userinfo [user]"],
	aliases: ["userinfo"]
};