const Discord = require("discord.js");
const client = new Discord.Client();
const forEachTimeout = require('foreach-timeout');
let prefix = '!'
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
    if ('rainbow'.includes(command)) {
        message.channel.send('Роль Rainbow запущена, теперь дайте ее тем участникам которые этой роли достойны');
        let colors = ["#ff0000", "#ffa500", "#ffff00", "#00ff00", "#00BFFF", "#0000ff", "#ff00ff"];
        let role = message.guild.roles.find("name", "Rainbow");
        async function color (colors, role) {
            forEachTimeout(colors, (color) => {role.setColor(color)}, 1500).then(() => color(colors, role));
        }
        color(colors, role);
    }
})
client.login(process.env.BOT_TOKEN);