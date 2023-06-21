const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('fnx')
    .setDescription('FNX'),
  async execute(interaction) {
    const embedPing = new EmbedBuilder()
      .setColor('Blue')
      .setTitle('FNX')
      .setDescription(` ${interaction.user.toString()} tá triste? 😭\n
			não tá mais 😆 quem tá triste 😭 não tá mais 😁esquece a tristeza 🧐\n
			se ela te abandonou💃 se perdeu o emprego 💼 vc vai conquistar td de novo 👊 o mundo é gigante 🌎 é o planeta inteiro🪐 fio vamo vamo o importante é não parar o importante é não parar 🏃‍♂️🏃‍♂️🏃‍♂️`);
    await interaction.reply({ embeds: [embedPing], ephemeral: true });
  },
};