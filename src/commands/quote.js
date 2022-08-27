const { SlashCommandBuilder, ActionRowBuilder, EmbedBuilder , ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quote')
        .setDescription('Submit your quote!')
        .addStringOption((option) =>
            option.setName('phrase')
                .setDescription('The phrase you wish to submit.')
                .setRequired(true))
        .setDMPermission(false),
    async execute(interaction) {
        const phrase = interaction.options.getString('phrase');
        const channel = interaction.client.settings.get(interaction.guild.id, 'moderator')
        // return interaction.reply(` ${channel} `)
        if (!channel) return interaction.reply(`Channels have not been setup yet. Please run \`/setup\` to get started.`)
        await interaction.deferReply({ ephemeral: true })

        if (interaction.guild.available) {
            const guildChannel = interaction.guild.channels.cache.get(channel)
            if (!guildChannel) return interaction.editReply('Looks like the channel settings are not correct anymore, I advise a moderator run `/setup` to get started again.')
            const embed = new EmbedBuilder()
                .setDescription(`\`${phrase}\``)
                .setFooter({ text: 'Context? What is context?' })
                .setColor(0xffe668)
                .setAuthor({ name: interaction.user.tag, icon_url: interaction.user.displayAvatarURL() })
            
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('yes')
                        .setStyle(ButtonStyle.Success)
                        .setLabel('✔')
                )
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('no')
                        .setStyle(ButtonStyle.Danger)
                        .setLabel('❌')
                )
            await guildChannel.send({
                embeds: [embed],
                components: [row]
            });

            return interaction.editReply({ content: 'I just sent your quote to the gentlemen up stairs. It may take some time for them to review it.'})
        }
    },
};