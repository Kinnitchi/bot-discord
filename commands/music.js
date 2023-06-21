const fs = require('fs');
const Discord = require('discord.js');
const config = require('./config.json');
const { OpusEncoder } = require('@discordjs/opus');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');




module.exports = {
  data: new SlashCommandBuilder()
    .setName('fnx')
    .setDescription('FNX'),
  async execute(interaction) {
    if (message.author.bot || !message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    const songName = args.join(' ');
    const songPath = `./commands/${songName}`;

    try {
      const connection = await voiceChannel.join();
      const dispatcher = connection.play(songPath);

      dispatcher.on('finish', () => {
        voiceChannel.leave();
      });

      dispatcher.on('error', (error) => {
        console.error(error);
        message.reply('Ocorreu um erro ao tentar reproduzir a música.');
      });
    } catch (error) {
      console.error(error);
      message.reply('Ocorreu um erro ao tentar reproduzir a música.');
    }
  }
}
}

