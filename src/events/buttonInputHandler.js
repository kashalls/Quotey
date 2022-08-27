const { EmbedBuilder } = require('discord.js');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (!interaction.isButton()) return;

		const validOptions = ['yes', 'no'];
		if (!validOptions.includes(interaction.customId)) return;

		this.editReply(interaction);
		if (interaction.customId === 'yes') {
			const phrase = interaction.message.embeds[0].description.slice(3, -3);

			const embed = new EmbedBuilder()
				.setColor(0xffe668)
				.setFooter({ text: 'Context? What is context?' })
				.setTitle('A Quote')
				.setDescription(phrase);

			const channelId = interaction.client.settings.get(interaction.guild.id, 'approved');
			const channel = interaction.guild.channels.cache.get(channelId);
			channel.send({ embeds: [embed] });
		}
	},
	editReply(interaction) {
		if (!interaction.message.editable) return;
		const original = interaction.message.toJSON();
		const embed = original.embeds[0];
		embed.footer.text = `${interaction.customId === 'yes' ? 'Approved' : 'Rejected'} by ${interaction.user.tag}`;
		interaction.message.edit({ embeds: [embed], components: [] });
	}
};
