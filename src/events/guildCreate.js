module.exports = {
	name: 'guildCreate',
	execute(guild) {
		guild.client.settings.ensure(guild.id);
	}
};
