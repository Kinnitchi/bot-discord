const { SlashCommandBuilder } = require('discord.js');
const ytdl = require('ytdl-core');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('youtube')
    .setDescription('Reproduz uma música do YouTube')
    .addStringOption(option => option.setName('url').setDescription('URL da música do YouTube').setRequired(true)),

  async execute(interaction) {
    const url = interaction.options.getString('url');
    const voiceChannel = interaction.member.voice.channel;

    if (!voiceChannel) {
      await interaction.reply('Você precisa estar em um canal de voz para usar este comando!');
      return;
    }

    try {
      const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: interaction.guild.id,
        adapterCreator: interaction.guild.voiceAdapterCreator,
      });

      const stream = ytdl(url, { filter: 'audioonly' });
      console.log('STREAM => ', stream);
      const resource = createAudioResource(stream);
      console.log('RESOURCE => ', resource);
      const player = createAudioPlayer();
      console.log('PLAYER => ', player);

      player.play(resource);
      connection.subscribe(player);

      player.on(AudioPlayerStatus.Idle, () => {
        connection.destroy();
      });

      await interaction.reply('Reproduzindo música do YouTube.');
    }
    catch (error) {
      console.error('Ocorreu um erro ao reproduzir a música:', error);
      await interaction.reply('Ocorreu um erro ao reproduzir a música do YouTube.');
    }
  },
};
