// Importando as dependências necessárias.
const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const { token } = require('./config.json');
const keepAlive = require('./server');
keepAlive();
// Criando o Client com as Intents
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'command');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

// Define o que o bot deve fazer ao receber uma interação (comando)
client.on(Events.InteractionCreate, async interaction => {
	// Verifica se a interação é um comando.
	if (!interaction.isChatInputCommand()) return;

	// Busca o comando de acordo com o nome recebido na interação
	const command = interaction.client.commands.get(interaction.commandName);

	// Se nenhum comando for recebido é emitido um erro e retorna
	if (!command) {
		console.error(`Nenhum comando correspondente a ${interaction.commandName} foi encontrado.`);
		return;
	}

	try {
		// Executa o comando da interação
		await command.execute(interaction);
	}
	catch (error) {
		// Se ocorrer um erro ao executar o comando, emite um erro e responde ao usuário com uma mensagem
		console.error(error);
		await interaction.reply({ content: 'Ocorreu um erro ao executar este comando!', ephemeral: true });
	}
});

// Manda uma mensagem quando o bot está logado
client.once(Events.ClientReady, c => {
	console.log(`O bot está logado em ${c.user.tag}`);
});


// Faz o login do bot com o token
client.login(token);