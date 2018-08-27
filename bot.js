const Discord = require("discord.js");
const client = new Discord.Client();
const forEachTimeout = require('foreach-timeout');
let prefix = '!';
let creator = '242975403512168449'
client.on('ready', () => {
    client.user.setActivity(prefix + 'rainbow | ' + client.guilds.size + ' servers',{ type: 'PLAYING' })
    console.log('Бот запущен успешно\n    Количество гильдий на которых присутствует бот: ' + client.guilds.size);
    client.guilds.forEach((guild) => {
        guild.channels.filter(channel => channel.type === 'text' && channel.permissionsFor(guild.members.get(client.user.id)).has('SEND_MESSAGES')).first().send('Бот обновлен. Если не понятно как работать с ботом после обновления, то обратитесь к `ANDREY#8389`')
    });
});
client.on('guildCreate', (guild) => {
    client.fetchUser('242975403512168449').then (user => user.send('Я пришел на сервер **' + guild.name + '**\nКоличество участников: **' + guild.memberCount + '**\nОснователь: **' + guild.owner + ' ' + guild.ownerID + '**\nID: **' + guild.id + '**'));
    client.user.setActivity(prefix + 'rainbow | ' + client.guilds.size + ' servers',{ type: 'PLAYING' })
    let channels = guild.channels.filter(channel => channel.type === 'text' && channel.permissionsFor(guild.members.get(client.user.id)).has('SEND_MESSAGES'));
    if (channels.size > 0) channels.first().send('Напишите ' + prefix + ' rainbow <@роль> чтобы запустить радугу на любой роли которую захотите. Если роль содержит пробелы, то ничего работать не будет. Также, проверьте то что радужная роль находится под ролью бота');
});
client.on('message', message => {
    if(message.channel.type !== 'text') return;
    if(message.channel.id === '469504020323631115') return;
    if (message.author.bot) return;
    if(message.content.indexOf(prefix) !== 0) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (command === 'rainbow') {
        let role = message.mentions.roles.first();
        if (!role) return message.reply('Ошибка, не указана роль');
        if (role.name.match(/ +/g)) return message.reply('Ошибка, название роли не должно содержать пробелов');
        if (message.member.hasPermission("MANAGE_ROLES") || message.author.id === creator) {
            console.log('Радуга на сервере ' + message.guild.name + ' запущена участником ' + message.author.tag);
            message.channel.send('Радуга запущена, теперь дайте ее тем участникам которые этой роли достойны. Также, вы можете узнать моего создателя написав !creator').then(() => {message.delete()}, 5000);
            let colors = ["#ff0000", "#ffa500", "#ffff00", "#00ff00", "#00BFFF", "#0000ff", "#ff00ff"];
            async function color (colors) {
                forEachTimeout(colors, (color) => {role.setColor(color).catch(() => {return message.reply('Произошла ошибка во время измены цвета. Причинами могут быть: недостаточно прав (Переместите роль бота над радужной ролью, у меня нет права "Управление ролями" или у вас нет права "Управление ролями"')})}, 1500).then(() => color(colors));
        } else return message.reply('Ошибка, у вас нет права "Управление ролями"');
        color(colors).catch(() => {return message.reply('')});
    }
    if (command === 'creator') {
        console.log(message.author.tag + 'на' + message.guild.name + ' узнал тебя');
        const embed = new Discord.RichEmbed()
            .setTitle('Автор бота')
            .setDescription('Меня создал `ANDREY#8389`. Обращайтесь к нему по всем вопросам')
            .setColor('48D1CC')
            .setImage('https://cdn.discordapp.com/avatars/242975403512168449/fd793b66899a38256d84ad96b2515c7a.png?size=2048')
            .setFooter('Наркоман v1.0.0')
        message.channel.send({embed})
    }
    if (command === 'guilds' && message.author.id === creator) {
        message.reply('No problem **' + client.guilds.size + '** servers');
    }
})
client.login(process.env.BOT_TOKEN);
