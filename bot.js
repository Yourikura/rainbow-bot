const Discord = require("discord.js");
const client = new Discord.Client();
const forEachTimeout = require('foreach-timeout');
let prefix = '!';
let creator = '242975403512168449'
client.on('ready', () => {
    client.user.setActivity(prefix + 'rainbow | ' + client.guilds.size + ' servers',{ type: 'PLAYING' })
    console.log('Бот запущен успешно\n    Количество гильдий на которых присутствует бот: ' + client.guilds.size);
});
client.on('guildCreate', (guild) => {
    let channels = guild.channels.filter(channel => channel.type === 'text' && channel.permissionsFor(guild.members.get(client.user.id)).has('SEND_MESSAGES'));
    if (channels.size > 0) channels.first().send('Создайте роль с названием Rainbow, а потом напишите ' + prefix + 'rainbow чтобы навернуть грибов. Остальное бот сделает за вас');
});
client.on('message', message => {
    if(message.channel.type !== 'text') return;
    if(message.channel.id === '469504020323631115') return;
    if (message.author.bot) return;
    if(message.content.indexOf(prefix) !== 0) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if ('rainbow'.includes(command) && message.member.hasPermission("ADMINISTRATOR")) {
        message.channel.send('Роль Rainbow запущена, теперь дайте ее тем участникам которые этой роли достойны').then(() => {message.delete()}, 5000);
        let colors = ["#ff0000", "#ffa500", "#ffff00", "#00ff00", "#00BFFF", "#0000ff", "#ff00ff"];
        async function color (colors) {
            forEachTimeout(colors, (color) => {message.guild.roles.find("name", "Rainbow").setColor(color)}, 1500).then(() => color(colors));
        };
        color(colors);
    }
    if ('guilds'.includes(command) && message.author.id === creator) {
        message.channel.send('Я нахожусь на **' + client.guilds.size + '** серверах');
    }
    if ('say'.includes(command) && message.author.id === creator) {
        message.delete();
        const sayMessage = args.join(" ");
        let msg = message.channel.send(sayMessage).catch(()=>{message.reply('Ошибка. **Причина: не указан текст сообщения**');
        });
    }
})
client.login(process.env.BOT_TOKEN);
