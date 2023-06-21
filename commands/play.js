const { SlashCommandBuilder } = require('discord.js');
const ytdl = require('ytdl-core');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const { spotifySecret, spotifyID, spotifyCallback } = require('../config.json');
const SpotifyWebApi = require('spotify-web-api-node');
// Crie uma instância do cliente com suas credenciais
const spotifyApi = new SpotifyWebApi({
	clientId: spotifyID,
	clientSecret: spotifySecret,
	redirectUri: spotifyCallback,
});
spotifyApi.createAuthorizeURL(['22rvl7vgjgcsug72rkeiwa2ci', 'igorziin8@gmail.com'], 'Brasil');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('spotify')
		.setDescription('Toca uma música')
		.addStringOption(option => option.setName('song').setDescription('Nome da música').setRequired(true)),
	async execute(interaction) {
		const song = interaction.options.getString('song');
		const channel = interaction.member.voice.channel;
		if (!channel) {
			await interaction.reply('Você precisa estar em um canal de voz para usar esse comando!');
			return;
		}
		try {
			const { body: { tracks: { items } } } = await spotifyApi.searchTracks(song, { limit: 1 });
			if (items.length === 0) {
				await interaction.reply('Não foi possível encontrar a música.');
				return;
			}

			const track = items[0];
			const audioUrl = track.preview_url;
			if (!audioUrl) {
				await interaction.reply('Não foi possível reproduzir a música.');
				return;
			}

			const connection = joinVoiceChannel({
				channelId: channel.id,
				guildId: interaction.guildId,
				adapterCreator: interaction.guild.voiceAdapterCreator,
			});

			const stream = ytdl(audioUrl, { filter: 'audioonly' });
			const resource = createAudioResource(stream);
			const player = createAudioPlayer();

			player.play(resource);
			connection.subscribe(player);

			player.on(AudioPlayerStatus.Idle, () => {
				connection.destroy();
			});

			await interaction.reply(`Tocando ${track.name} - ${track.artists[0].name}`);
		}
		catch (error) {
			console.error(error);
			interaction.reply('Ocorreu um erro ao reproduzir a música.');
		}
	},
};