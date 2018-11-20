const Discord = require("discord.js");
const client = new Discord.Client();
const forEachTimeout = require('foreach-timeout');

const creator = '242975403512168449';

let prefix = '!';

let rainbowOn = new Set();
let rainbowRole = new Set();
let blocked = new Set();

let colors = ["#ff0000", "#ffa500", "#ffff00", "#00ff00", "#00BFFF", "#0000ff", "#ff00ff"];

/** @namespace process.env.BOT_TOKEN */

client.on('ready', () => {
    client.user.setActivity(`${prefix}help | ${client.guilds.size} servers`,{ type: 'PLAYING' });
    console.log(`Запущен. Сервера: ${client.guilds.size}`);
})

client.on('guildCreate', (guild) => {
    client.fetchUser('242975403512168449').then (user => {
        user.send(`Я был **приглашен** :inbox_tray: на **${guild.name}**. Информация о серере:
        Основатель: ${guild.owner} **(${guild.owner.user.tag}) (${guild.ownerID})**
        Акроним и ID: **${guild.nameAcronym} | ${guild.id}**
        Пользователи: **${guild.memberCount}**
        Каналы: **${guild.channels.size}**
        Роли: **${guild.roles.size}**
        Создана **${guild.createdAt.toString().slice(4, -32)}**
        `)
    });
    setInterval(() => client.user.setActivity(`${prefix}help | ${client.guilds.size} servers`,{ type: 'PLAYING' }, 16000))    
    let channels = guild.channels.filter(channel => channel.type === 'text' && channel.permissionsFor(guild.members.get(client.user.id)).has('SEND_MESSAGES'));
    if (channels.size > 0) channels.first().send(`Type ${prefix}rainbow \`@role\`, to launch rainbow. Напишите ${prefix}rainbow \`@роль\`, чтобы запустить радугу. Also, join our server --> https://discord.gg/DxptT7N`);
});

client.on('guildDelete', (guild) => {
    rainbowOn.delete(guild.id);
    client.fetchUser('242975403512168449').then (user => {
        user.send(`Я **ушел** :outbox_tray: с **${guild.name}**. Информация о серере:
        Основатель: ${guild.owner} **(${guild.owner.user.tag}) (${guild.ownerID})**
        Акроним и ID: **${guild.nameAcronym} | ${guild.id}**
        Пользователи: **${guild.memberCount}**
        Каналы: **${guild.channels.size}**
        Роли: **${guild.roles.size}**
        Создана **${guild.createdAt.toString().slice(4, -32)}**
        `)
    });
    setInterval(() => client.user.setActivity(`${prefix}help | ${client.guilds.size} servers`,{ type: 'PLAYING' }, 16000))
})

client.on('roleDelete', (role) => {
    if (rainbowRole.has(role.id)) {
        rainbowOn.delete(role.guild.id);
        rainbowRole.delete(role.id);
    }
});

client.on('message', message => {
    if (message.channel.type !== 'text' || message.author.bot || !message.content.startsWith(prefix) || !message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) return;
    
    if (blocked.has(message.author.id)) return message.reply('Автор бота отключил вам все команды. Причинами могут быть:\n1. Отправление несуществующего бага\n2. Нарушение правил на официальном севрере');

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    async function rainbow (role, colors) {
        if (!role.editable || !role || !rainbowOn.has(message.guild.id)) return rainbowRole.delete(role.id);
        forEachTimeout(colors, (color) => {
            if (!role.editable || !rainbowOn.has(message.guild.id)) return rainbowRole.delete(role.id);
            role.setColor(color)}, 1500

        ).then(() => rainbow(role, colors));
    
    }

    if (command === 'stop') {
        if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply('У вас недостаточно прав');

        if (!rainbowOn.has(message.guild.id)) return message.reply('Радуга и так не включена')

        rainbowOn.delete(message.guild.id)
        message.reply('Радуга отключена');

        client.fetchUser(creator).then (user => {
            user.send(`Пользователь ${message.author.tag} (${message.author.id}) **отключил** радугу на ${message.guild.name} (${message.guild.id})`)
        })
    }

    if (command === 'rainbow') {
        let role = message.mentions.roles.first();

        if (!role) return message.reply('Вы не упомянули роль');

        if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply('У вас недостаточно прав');

        if (!role.editable) return message.reply('У меня недостаточно прав');

        if (rainbowOn.has(message.guild.id)) return message.reply('Нелья создавать более одной радуги на сервере');

        rainbowOn.add(message.guild.id);
        rainbowRole.add(role.id)

        rainbow(role, colors);

        client.fetchUser(creator).then (user => {
            user.send(`Пользователь ${message.author.tag} (${message.author.id}) **включил** радугу на ${message.guild.name} (${message.guild.id})`)
        })

        message.channel.send('Радуга успешно включена');
    }

    if (command === 'invite') message.channel.send('Пригласить бота:\nhttps://discordapp.com/oauth2/authorize?client_id=472048383075549186&scope=bot&permissions=268520448');
    
    if (command === 'creator') message.channel.send(`\`${client.users.get(creator).tag}\``);

    if (command === 'bug') {
        if (!args[0]) return message.reply('Не указан баг');
        let bug = args.join(" ");
        client.fetchUser(creator).then(user => user.send(`Баг от ${message.author.tag}:\n**${bug}**`));
        message.channel.send('Баг успешно отправлен :white_check_mark:\n\nВнимание! Если вы написали несуществующий баг, то вам безвозвратно отключат все команды бота!').catch();
    }
    
    if (command === 'help') message.channel.send(`
!rainbow \`@роль\` - Запустить радугу на роли \`@роль\`.
!stop - Остановить радугу.
!invite - Ссылка по которой можно пригласить бота на ваш сервер.
!creator - Узнать создателя бота.
!bug \`описание бага\` - Если бот работает не так как должен, то вы можете рассказать об этом разработчику с помощью этой команды.
        `);

    if (message.author.id !== creator) return;

    if (command === 'block') {
        blocked.add(args[0]);
        message.channel.send(`**${client.users.get(args[0]).tag}** Успешно заблокирован`)
    }

    if (command === 'unlock') {
        blocked.delete(args[0]);
        message.channel.send(`**${client.users.get(args[0]).tag}** Успешно разблокирован`)
    }

    if (command === 'mass-say') {
        client.guilds.forEach(guild => {
            let channels = guild.channels.filter(channel => channel.type === 'text' && channel.permissionsFor(guild.members.get(client.user.id)).has('SEND_MESSAGES'));
            if (channels.size > 0) channels.first().send(args.join(' '));
        })
    }

    if (command === 'guilds') {
        client.guilds.forEach(guild => {
            message.channel.send(`${guild.name} - **${guild.memberCount}**`)
        })
    }

});

client.login(process.env.BOT_TOKEN);
