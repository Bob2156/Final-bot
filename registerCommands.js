const fetch = require('node-fetch');

// Replace with your Discord bot information
const DISCORD_TOKEN = process.env.DISCORD_TOKEN; // Bot token
const CLIENT_ID = process.env.CLIENT_ID; // Application ID
const GUILD_ID = process.env.GUILD_ID; // Guild (server) ID

// Define the commands to register
const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
    type: 1, // CHAT_INPUT (slash command)
  },
];

const registerCommands = async () => {
  try {
    const url = `https://discord.com/api/v10/applications/${CLIENT_ID}/guilds/${GUILD_ID}/commands`;

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bot ${DISCORD_TOKEN}`,
      },
      body: JSON.stringify(commands),
    });

    if (!response.ok) {
      throw new Error(`Failed to register commands: ${response.statusText}`);
    }

    console.log('Commands registered successfully!');
  } catch (error) {
    console.error('Error registering commands:', error);
  }
};

registerCommands();
