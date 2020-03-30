const database = require("../database");
const { RichEmbed } = require("discord.js")
const { Colors } = require("../../config")

module.exports = async (message, guild, action, moderator, newType, newValue) => {
    if (!message.guild.channels.get(guild.logchannel)) return;

    const embed = new RichEmbed()
    .setTitle(action)
    .setColor(Colors.DEFAULT)
    .addField("Moderator", moderator)
    .addField(newType, newValue);

    message.guild.channels.get(guild.logchannel).send(embed);
};