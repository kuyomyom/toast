const { RichEmbed } = require("discord.js");
const { Colors } = require("../config");

module.exports.run = async (client, message, args, { guild }) => {
	const totalGuilds = await client.shard.fetchClientValues('guilds.size');
	const totalMembers = await client.shard.broadcastEval('this.guilds.reduce((prev, guild) => prev + guild.memberCount, 0)');

	const embed = new RichEmbed()
		.setTitle("Stats")
		.setColor(Colors.DEFAULT)
		.setDescription(`**Toast**\n• Currently serving \`${totalGuilds}\` guilds and \`${totalMembers}\` users\n• This server is running on shard \`${client.shard.id}\`\n• [Invite Toast](https://discordapp.com/oauth2/authorize?client_id=682377571605938220&permissions=8&scope=bot)\n• [Rate Toast](https://bots.ondiscord.xyz/bots/682377571605938220/review)`)
		.setFooter(message.author.tag, message.author.displayAvatarURL);

	message.channel.send(embed);
};

module.exports.data = {
	name: "stats",
	description: "View some bot statistics.",
	type: "util",
	usage: ["!stats"],
	aliases: ["invite", "about"],
};
