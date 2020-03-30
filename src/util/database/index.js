const MongoDB = require("./mongodb");
require("dotenv").config();
const database = new MongoDB({ url: process.env.MONGO_URL });

// Guilds

database.guilds = {};

database.guilds.create = async (id, {
	prefix = "t!",
	modrole = "abcd",
	adminrole = "abcd",
	premium = false,
	logchannel = null,
	wordblacklistactive = false,
	levelingactive = true,
	economyactive = false,
	moderation = [],
	leveling = [],
	economy = [],
	wordblacklist = [],
	commandchannels = [],
} = {}) => {
	const data = { premium, prefix, modrole, adminrole, wordblacklist, logchannel, commandchannels, moderation, wordblacklistactive, leveling, economy, economyactive, levelingactive };
	const existing = await database.collection("guilds").get(id);
	if (existing) return existing;
	await database.collection("guilds").insert(id, data);
	return { id, ...data };
};

database.guilds.fetch = async (id) => {
	const guild = await database.collection("guilds").get(id);
	return guild ? guild : await database.guilds.create(id);
};

database.guilds.update = async (...data) => {
	return await database.collection("guilds").update(...data);
};

database.guilds.delete = async (id) => {
	return await database.collection("guilds").delete(id);
};

// Users

database.users = {};

database.users.create = async (id, {
	language = "EN-US",
	premium = false,
	blacklisted = false,
} = {}) => {
	const data = { language, premium, blacklisted };
	const existing = await database.collection("users").get(id);
	if (existing) return existing;
	await database.collection("users").insert(id, data);
	return { id, ...data };
};

database.users.fetch = async (id) => {
	const user = await database.collection("users").get(id);
	return user ? user : await database.users.create(id);
};

database.users.update = async (...data) => {
	return await database.collection("users").update(...data);
};

database.users.delete = async (id) => {
	return await database.collection("users").delete(id);
};

module.exports = database;
