const { RichEmbed } = require("discord.js");
const { Colors } = require("../../config");

module.exports = async (client, message, args, funcs) => {
    const { modrole, adminrole, commandchannels } = funcs.guild;
    let command = args.shift().toLowerCase();

    if (!client.commands.get(command)) {
        if (!client.aliases.get(command)) return;
        command = client.aliases.get(command);
    }
    command = client.commands.get(command);

    function noPermission(required, channel) {
        const embed = new RichEmbed()
            .setTitle("Incorrect Permissions")
            .setColor(Colors.FAILED)
            .setDescription(`You do not have the permissions required. Required: \`${required}\``)
            .setFooter(message.author.tag, message.author.displayAvatarURL);
        return channel.send(embed);
    }

    try {
        if (command.data.guildOnly) {
        	if (!message.guild) return;
        }

        if (command.data.permissions) {
            if (command.data.permissions["Moderator"]) {
                if (!message.member.roles.get(modrole) && !message.member.roles.get(adminrole) && !message.member.hasPermission("ADMINISTRATOR")) return noPermission("Moderator", message.channel);
            }
            if (command.data.permissions["Administrator"]) {
                if (!message.member.roles.get(adminrole) && !message.member.hasPermission("ADMINISTRATOR")) return noPermission("Administrator", message.channel);
            }
        } 

        if (!commandchannels.length === 0) {
            if (!message.member.roles.get(modrole) || !message.member.roles.has(adminrole) || !message.member.hasPermission("ADMINISTRATOR")) {
                if (!commandchannels.includes(message.channel.id)) return;
            }
        }

        await command.run(client, message, args, funcs);
    } catch (err) {
        console.log(err.stack);
    }
};
