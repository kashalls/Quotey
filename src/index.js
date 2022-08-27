require('dotenv').config();

const { GatewayIntentBits } = require('discord.js');
const QuoteyClient = require('./library/QuoteyClient');

const client = new QuoteyClient({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent] });

client.login(process.env.DISCORD_TOKEN);