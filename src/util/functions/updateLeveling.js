const database = require("../database");
const { RichEmbed } = require("discord.js");
const { Colors } = require("../../config");

module.exports = async (user, guild, message) => {
    const { leveling, levelingactive } = guild;

		function LevelUp(member, message, level) {
			let embed = new RichEmbed()
			.setTitle("Level Up!")
			.setColor(Colors.SUCCESS)
			.setDescription(`Congrats, **${member.name}**, you've advanced to level ${level}`);
			message.channel.send(embed);
		}
		
    if (levelingactive) {
        const levelingArray = new Map(leveling);
        const userLeveling = levelingArray.get(user._id);

        const date = Date.now();
        const delay = 10000;

        if ((date - userLeveling.lastMessage) >= delay) {
            const messageXP = Math.floor(Math.random() * 20) + 5;

            userLeveling.xp += messageXP;
            userLeveling.lastMessage = date;

            if (userLeveling.xp >= userLeveling.lastXP) {
                userLeveling.level++;
                Math.floor(userLeveling.lastXP *= 2.2);
                LevelUp(message.author, message, userLeveling.level);
            }

            await database.guilds.update(guild._id, { leveling: Array.from(leveling) });
        }
    }
    return [user, guild];
};