const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
	// Criando uma nova instância de SlashCommandBuilder para definir as informações do comando
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('Entrar no canal de voz'),
	// Definindo a função que será executada quando o comando for acionado
	async execute(interaction) {
		// Criando uma EmbedBuilder para construir uma mensagem em embed.
		const embedPing = new EmbedBuilder()
			.setColor('Blue')
			.setTitle('Entrando no canal de voz')
			.setDescription('Entrando no canal de voz');
		// Respondendo a interação do usuário com a Embed, informando o ping do bot.
		await interaction.reply({ embeds: [embedPing], ephemeral: true });
	},
};