const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, NoSubscriberBehavior, AudioPlayerStatus } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('Joins a voice channel'),
	async execute(interaction) {
		const channel = interaction.member.voice.channel;

		if (!channel) {
			await interaction.reply('Você precisa estar em um canal de voz para usar esse comando!');
			return;
		}

		const connection = joinVoiceChannel({
			channelId: channel.id,
			guildId: channel.guild.id,
			adapterCreator: channel.guild.voiceAdapterCreator,
		});

		const player = createAudioPlayer({
			behaviors: {
				noSubscriber: NoSubscriberBehavior.Pause,
			},
		});

		const resource = createAudioResource('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
		player.play(resource);

		connection.subscribe(player);

		player.on(AudioPlayerStatus.Idle, () => {
			connection.disconnect();
			interaction.reply(`Reprodução concluída. Desconectado de ${channel.name}`);
		});
	},
};
