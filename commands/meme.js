// Importando as dependências necessárias.
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	// Criando uma nova instância de SlashCommandBuilder para definir as informações do comando
	data: new SlashCommandBuilder()
		.setName('fnx')
		.setDescription('FNX'),
	// Definindo a função que será executada quando o comando for acionado
	async execute(interaction) {
		// Criando uma EmbedBuilder para construir uma mensagem em embed.
		const embedPing = new EmbedBuilder()
			.setColor('Blue')
			.setTitle('FNX')
			.setDescription(` ${interaction.user.toString()} tá triste? 😭\n
			não tá mais 😆 quem tá triste 😭 não tá mais 😁esquece a tristeza 🧐\n
			se ela te abandonou💃 se perdeu o emprego 💼 vc vai conquistar td de novo 👊 o mundo é gigante 🌎 é o planeta inteiro🪐 fio vamo vamo o importante é não parar o importante é não parar 🏃‍♂️🏃‍♂️🏃‍♂️`);
		// Respondendo a interação do usuário com a Embed, informando o ping do bot.
		await interaction.reply({ embeds: [embedPing], ephemeral: true });
	},
};