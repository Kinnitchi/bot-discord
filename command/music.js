require('dotenv').config();
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const { createReadStream } = require('fs');
const { OpusEncoder } = require('@discordjs/opus');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Musica'),
  async execute(interaction) {
    const command = args.shift().toLowerCase();
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('Você precisa estar em um canal de voz para executar esse comando!');

    const songName = args.join(' ');
    try {
      const connection = await voiceChannel.join();
      const stream = ytdl(songName, { filter: 'audioonly' });
      const dispatcher = connection.play(stream);

      dispatcher.on('finish', () => {
        voiceChannel.leave();
      });
    } catch (error) {
      console.error(error);
      message.reply('Ocorreu um erro ao tentar reproduzir a música.');
    }
  }
}
