const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('channel')
        .setDescription('Show or change the channel that is used to verify quotes.')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers & PermissionFlagsBits.BanMembers)
        .addSubcommandGroup((input) => 
            input
                .setName('moderator')
                .setDescription('Show or change the current channel for moderating quotes.')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('show')
                        .setDescription('Show the current channel for moderating quotes.'))
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('change')
                        .setDescription('Changes the current channel for moderating quotes.')
                        .addChannelOption((option) => 
                            option
                                .setName('channel')
                                .setDescription('The channel you want to send moderated quotes to.'))))
        .addSubcommandGroup((input) => 
            input
            .setName('approved')
            .setDescription('Show or change the current channel for when quotes are approved.')
            .addSubcommand((subsubcommand) =>
                subsubcommand
                    .setName('show')
                    .setDescription('Show the current channel for approved quotes.'))
            .addSubcommand((subsubcommand) =>
                subsubcommand
                    .setName('change')
                    .setDescription('Changes the current channel for approved quotes.')
                    .addChannelOption((option) => 
                        option
                            .setName('channel')
                            .setDescription('The channel you want to send approved quotes to.')))),
    async execute(interaction) {
        const subgroup = interaction.options.getSubcommandGroup()
        const subcommand = interaction.options.getSubcommand()
        if (!subgroup || !subcommand) return interaction.reply({ content: 'Error', ephemeral: true })

        if (subcommand === 'show') {
            const channel = interaction.client.settings.get(interaction.guild.id, subgroup)
            if (!channel) return interaction.reply(`There is no ${subgroup} channel set. You can change this with \`/channel ${subgroup} change\`.`)
            else return interaction.reply(`Currently, your ${subgroup} channel is set to <#${channel}> (ID: ${channel}).`)
        }

        if (subcommand === 'change') {
            const subCommandChannel = interaction.options.getChannel('channel')
            if (!subCommandChannel) return interaction.reply('You did not specify a channel.')

            const channel = interaction.client.settings.get(interaction.guild.id, subgroup)
            if (subCommandChannel.id === channel[subgroup]) return interaction.reply(`Your ${subgroup} channel is already set to <#${subCommandChannel.id}> (ID: ${subCommandChannel.id}).`)
            interaction.client.settings.set(interaction.guild.id, subCommandChannel.id, subgroup)
            return interaction.reply(`Successfully set your ${subgroup} channel to <#${subCommandChannel.id}> (ID: ${subCommandChannel.id}).`) 
        }
    },
};