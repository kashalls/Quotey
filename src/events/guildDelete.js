

module.exports = {
	name: 'guildDelete',
	execute(guild) {
        guild.client.settings.delete(guild.id);
	},
};