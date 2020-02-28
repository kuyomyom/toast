const { config } = require("dotenv");
config({
	path: __dirname + "/.env",
});

const { ShardingManager } = require("discord.js");
const manager = new ShardingManager("./bot.js", { token: process.env.CLIENT_TOKEN });

manager.spawn();
manager.on('launch', shard => {
    console.log(`Launching Shard ${shard.id} [ ${shard.id + 1} of ${manager.totalShards} ]`);
});