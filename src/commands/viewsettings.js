const { RichEmbed } = require("discord.js");
const { Colors } = require("../config");
const database = require("../util/database");
const PastebinAPI = require('pastebin-js'),
    pastebin = new PastebinAPI(process.env.PASTEBIN_API);

module.exports.run = async (client, message, args, { guild, error }) => {
	try {

	}
	catch (e) {
		error(e.stack);
	}
};

module.exports.data = {
	name: "viewsettings",
	description: "View the server settings",
	type: "mod",
	usage: ["!viewsettings"],
	aliases: null,
	permissions: "Administrator",
	guildOnly: true
};