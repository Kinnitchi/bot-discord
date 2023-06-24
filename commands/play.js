const { SlashCommandBuilder } = require('discord.js');
const ytdl = require('ytdl-core');
const { joinVoiceChannel, createAudioResource, createAudioPlayer, AudioPlayerStatus } = require('@discordjs/voice');
const ytSearch = require('yt-search');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
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
			const audioUrl = await getAudioUrl(song);
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

			await interaction.reply('Tocando a música.');
		}
		catch (error) {
			console.error(error);
			interaction.reply('Ocorreu um erro ao reproduzir a música.');
		}
	},
};

async function getAudioUrl(song) {
	try {
		const result = await ytSearch(song);
		if (!result.videos.length) {
			return null;
		}
		const video = result.videos[0];
		return video.url;
	}
	catch (error) {
		console.error(error);
		return null;
	}
}
