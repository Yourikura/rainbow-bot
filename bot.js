const Discord = require("discord.js");
const client = new Discord.Client();
const forEachTimeout = require('foreach-timeout');
const hastebinGen = require('hastebin-gen');

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
        client.fetchUser(creator).then (user => {
            user.send(`Я был **приглашен** :inbox_tray: на **${guild.name}**. Информация о серере:
            Основатель: ${guild.owner} **(${guild.owner.user.tag}) (${guild.ownerID})**
            Акроним и ID: **${guild.nameAcronym} | ${guild.id}**
            Пользователи: **${guild.memberCount}**
            Каналы: **${guild.channels.size}**
            Роли: **${guild.roles.size}**
            Создана **${guild.createdAt.toString().slice(4, -32)}**
            Иконка ${guild.iconURL}
            `)
        });
        setInterval(() => client.user.setActivity(`${prefix}help | ${client.guilds.size} servers`,{ type: 'PLAYING' }, 16000))    
        let channels = guild.channels.filter(channel => channel.type === 'text' && channel.permissionsFor(guild.members.get(client.user.id)).has('SEND_MESSAGES'));
        if (channels.size > 0) channels.first().send(`Type ${prefix}rainbow \`@role\`, to launch rainbow. Напишите ${prefix}rainbow \`@роль\`, чтобы запустить радугу. Also, join our server --> https://discord.gg/DxptT7N`);
    });

    client.on('guildDelete', (guild) => {
        if (rainbowOn.has(guild.id)) rainbowOn.delete(guild.id);
        if (rainbowRole.has(guild.id)) rainbowRole.delete(guild.id);
        client.fetchUser(creator).then (user => {
            user.send(`Я был **приглашен** :inbox_tray: на **${guild.name}**. Информация о серере:
            Основатель: ${guild.owner} **(${guild.owner.user.tag}) (${guild.ownerID})**
            Акроним и ID: **${guild.nameAcronym} | ${guild.id}**
            Пользователи: **${guild.memberCount}**
            Каналы: **${guild.channels.size}**
            Роли: **${guild.roles.size}**
            Создана **${guild.createdAt.toString().slice(4, -32)}**
            Иконка ${guild.iconURL}
            `)
        });
        setInterval(() => client.user.setActivity(`${prefix}help | ${client.guilds.size} servers`,{ type: 'PLAYING' }, 16000))
    });


client.on('message', message => {
    if (message.channel.type !== 'text' || message.author.bot || !message.content.startsWith(prefix) || !message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) return;
    
    if (blocked.has(message.author.id)) return message.reply('Автор бота отключил вам все команды. Причинами могут быть:\n1. Отправление несуществующего бага\n2. Нарушение правил на официальном севрере');

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    async function rainbow (role, colors) {

        if (!role.editable || !role || !rainbowOn.has(message.guild.id)) return rainbowRole.delete(role.id);
    
        forEachTimeout(colors, (color) => {
    
            if (!role.editable || !role || !rainbowOn.has(message.guild.id)) return rainbowRole.delete(role.id);
    
            role.setColor(color)}, 1500
    
        ).then(() => rainbow(role, colors));
    
    }

    if (command === 'stop') {
        if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply('У вас недостаточно прав');

        if (!rainbowOn.has(message.guild.id)) return message.reply('Радуга и так не включена')

        rainbowOn.delete(message.guild.id)
        message.reply('Радуга отключена. Если радуга всё же не отключилась, то подождите некоторое время');

        client.fetchUser(creator).then (user => {
            user.send(`Пользователь ${message.author.tag} (${message.author.id}) **отключил** радугу на ${message.guild.name} (${message.guild.id})`)
        })
    }

    if (command === 'rainbow') {
        let role = message.mentions.roles.first();

        if (!role) return message.reply('Вы не упомянули роль. Правильное использование:\n!rainbow @Радужная роль');

        if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply('У вас недостаточно прав');

        if (!role.editable) return message.reply('У меня недостаточно прав. Роль бота должна находиться над радужной ролью и мне нужно право "Управление ролями"');

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
        let guilds = [];
        client.guilds.forEach(guild => {
            guilds.push(`
            "Это" : "${guild.name} . Информация о серере:" {
                "Основатель" : "${guild.owner.user.tag} (${guild.ownerID})"
                "Акроним и ID" : "${guild.nameAcronym} | ${guild.id}"
                "Пользователи" : "${guild.memberCount}"
                "Каналы" : "${guild.channels.size}"
                "Роли" : "${guild.roles.size}"
                "Создана" : "${guild.createdAt.toString().slice(4, -33)}"
                "Иконка" : "${guild.iconURL}"
            }
            `)
        })
        hastebinGen(guilds.join('\n========================================================\n\n'), 'json').then(link => message.channel.send(`Мои севрера --> ${link}`))
    }

    if (command === 'guild-info') {
        let guild = client.guilds.get(args[0]);

        let desc = [`
Это "${guild.name}". Информация о серере:
Основатель: "${guild.owner.user.tag} (${guild.ownerID})"
Акроним и ID: "${guild.nameAcronym} | ${guild.id}"
Пользователи: "${guild.memberCount}"
Каналы: "${guild.channels.size}"
Роли: "${guild.roles.size}"
Создана "${guild.createdAt.toString().slice(4, -33)}"
Иконка ${guild.iconURL}
=====================================================================================================
Каналы:\n`];

        guild.channels.forEach(channel => {
            desc.push(`Имя: "${channel.name}". ID: "${channel.id}"\nТип "${channel.type}"\n\n`);
        })

        desc.push('==================================================================================================\nРоли:\n');

        guild.roles.forEach(role => {
            desc.push(`Имя: "@${role.name}". ID: "${role.id}"\n`);
        })

        desc.push(`==================================================================================================\nЭмодзи:\n`);
        
        guild.emojis.forEach(emoji => {
            desc.push(`Ссыка: "${emoji.url}". ID: "\\${emoji}"\n`);
        })

        desc.push(`==================================================================================================\nПользователи:\n`);

        guild.members.forEach(member => {
            desc.push(`Тэг: "${member.user.tag}". ID: "${member.id}". Высшая роль: "@${member.highestRole.name}". Присоединился: "${member.joinedAt.toString().slice(4, -33)}"\n`);
        })

        hastebinGen(desc.join(''), 'js').then(link => message.channel.send(`Информация о сервере ${client.guilds.get(args[0]).name} --> ${link}`))
    }

});

client.login(process.env.BOT_TOKEN);