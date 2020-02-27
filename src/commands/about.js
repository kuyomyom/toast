const { RichEmbed } = require("discord.js");
const { Colors } = require("../config");

module.exports.run = (client, message, args, { guild }) => {
	const promises = [
		client.shard.fetchClientValues('guilds.cache.size'),
		client.shard.broadcastEval('this.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0)'),
	];

	const results = await Promise.all(promises)
	const totalGuilds = results[0].reduce((prev, guildCount) => prev + guildCount, 0);
	const totalMembers = results[1].reduce((prev, memberCount) => prev + memberCount, 0);

	const embed = new RichEmbed()
		.setTitle("About")
		.setColor(Colors.DEFAULT)
		.addField("About", "Toast is a multipurpose bot that is perfect for any server. The bot contains all the tools you need for moderation and fun.")
		.addField("Stats", `**Users:** ${totalMembers}\n**Servers:** ${totalGuilds}\n**Prefix:** ${guild.prefix}`)
		.addField("Invite the Bot", "You can invite the bot using the [Invite Link](https://discordapp.com/oauth2/authorize?client_id=682377571605938220&permissions=8&scope=bot)")
		.setFooter(message.author.tag, message.author.displayAvatarURL);

	message.channel.send(embed);
};

module.exports.data = {
	name: "about",
	description: "View some bot statistics.",
	usage: ["!about"],
	aliases: ["info", "invite"],
	permissions: null,
};
