module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
        if (!interaction.isButton()) return;

        const validOptions = ['yes', 'no']
        if (!validOptions.includes(interaction.customId)) return;

        console.log(interaction)

	},
};