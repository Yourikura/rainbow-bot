const Discord = require("discord.js");
const client = new Discord.Client();
const forEachTimeout = require('foreach-timeout');
const creator = '242975403512168449';
let prefix = '!';
let stop = new Set();
let rainb = new Set();
let colors = ["#ff0000", "#ffa500", "#ffff00", "#00ff00", "#00BFFF", "#0000ff", "#ff00ff"];
let blocked = ['444154125278511105', '318002925630652418', '434748832031703040'];
client.on('ready', () => {
    client.user.setActivity(/*prefix + 'rainbow | ' + client.guilds.size + ' servers'*/ 'Технические работы',{ type: 'PLAYING' });
    console.log('Бот: Запущен\n' + 'Серверов: ' + client.guilds.size + '\nАвторизован как: ' + client.user.tag);
})
client.on('guildCreate', (guild) => {
    client.fetchUser('242975403512168449').then (user => user.send('Я **пришел** на сервер **' + guild.name + '**\nКоличество участников: **' + guild.memberCount + '**\nОснователь: **' + guild.owner + ' (' + guild.owner.user.tag + ')' + ' (' + guild.ownerID + ')**\nID: **' + guild.id + '**'));
    client.user.setActivity(prefix + 'rainbow | ' + client.guilds.size + ' servers',{ type: 'PLAYING' })
    let channels = guild.channels.filter(channel => channel.type === 'text' && channel.permissionsFor(guild.members.get(client.user.id)).has('SEND_MESSAGES'));
    if (channels.size > 0) channels.first().send('Напишите ' + prefix + 'rainbow <@роль> чтобы запустить радугу на любой роли которую захотите. Если роль содержит пробелы, то ничего работать не будет. Также, проверьте то что радужная роль находится под ролью бота');
});
client.on('guildDelete', (guild) => {
    client.fetchUser('242975403512168449').then (user => user.send('Я **покинул** сервер **' + guild.name + '**\nКоличество участников: **' + guild.memberCount + '\nОснователь: ' + guild.owner + ' (' + guild.owner.user.tag + ')' + ' (' + guild.ownerID + ')**\nID: **' + guild.id + '**'));
    client.user.setActivity(prefix + 'rainbow | ' + client.guilds.size + ' servers',{ type: 'PLAYING' })
})
client.on('message', message => {
    if (blocked.includes(message.author.id)) return message.reply('Вам отключили все команды бота по причине "Бред в !bug"');
    if (message.author.bot) return
    if (!message.content.startsWith(prefix)) return
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    async function rainbow (role, color) {
        if (stop.has(message.guild.id)) return message.reply('Радуга отключена');
        forEachTimeout(color, (color) => {
            role.setColor(color).catch(() => {
            return message.reply('Произошла ошибка. Напишите !stop')})}, 1500)
            .then(() => rainbow(role, colors));
    }
    if (command === 'stop') {
        if (stop.has(message.guild.id)) return;
        if (rainb.has(message.guild.id)) rainb.delete(message.guild.id);
        stop.add(message.guild.id);
        message.reply('Происходит остановка...').catch();
        console.log(message.author.tag + ' остановил радугу на ' + message.guild.name);
    }
    if (command === 'rainbow') {
        if (message.author.id !== creator) return;
        let role = message.mentions.roles.first();
        if (rainb.has(message.guild.id)) return;
        if (!role) return message.reply('Вы не упомянули роль').catch();
        if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply('У вас недостаточно прав').catch();
        if (role.name.match(/ +/g)) return message.reply('Название роли не должно содержать пробелов').catch();
        if (message.guild.me.highestRole.position <= role.position) return message.reply('У меня недостаточно прав').catch();
        if (stop.has(message.guild.id)) stop.delete(message.guild.id)
        rainbow(role, colors).catch(() => {message.reply('Произошла ошибка. Обратитесь к `ANDREY#8389` за помощью').catch();});
        console.log(message.author.tag + ' включил радугу на ' + message.guild.name);
        message.channel.send('Радуга успешно включена. Другие команды:\n**!stop\n!creator\n!invite\n!bug <Описание бага>**').catch();
        rainb.add(message.guild.id);
    }
    if (command === 'invite') message.channel.send('Пригласить бота:\nhttps://discordapp.com/oauth2/authorize?client_id=472048383075549186&scope=bot&permissions=268520448').catch();
    if (command === 'mass-say' && message.author.id === '242975403512168449') {
        client.guilds.forEach((guild) => {
            let msg = args.join(" ");
            guild.channels.filter(channel => channel.type === 'text' && channel.permissionsFor(guild.members.get(client.user.id)).has('SEND_MESSAGES')).first().send(msg).catch();
        });
    }
    if (command === 'bug') {
        if (!args[0]) return message.reply('Не указан баг');
        let bug = args.join(" ");
        client.fetchUser('242975403512168449').then (user => user.send('Пользователь ' + message.author.tag + ' (' + message.author + ') ' + '(' + message.author.id + ')' + ' Отправил баг:\n\n**' + bug + '**'));
        message.channel.send('Баг успешно отправлен :white_check_mark:\n\nВнимание! Если вы написали бред в !bug, то вам безвозвратно отключат все команды бота!').catch();
    }
    if (command === 'creator') message.channel.send('`ANDREY#8389`').catch();
    if (command === 'block' && message.author.id === creator) {
        blocked.push(args[0]);
        message.reply(args[0] + ' Заблокирован. Все заблокированные:\n' + blocked.join(", "));
    }
});
client.login(process.env.BOT_TOKEN);
