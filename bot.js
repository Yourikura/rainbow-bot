const Discord = require("discord.js");
const client = new Discord.Client();
const forEachTimeout = require('foreach-timeout');
const hastebinGen = require('hastebin-gen');
const mysql = require('mysql');

const creator = '242975403512168449';
const hexreg = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

let prefix = '=';

let rainbowOn = new Set();
let rainbowRole = new Set();
let blocked = new Set();

let colors = '#ff0000 #ffa500 #ffff00 #00ff00 #00BFFF #0000ff #ff00ff';

/** @namespace process.env.BOT_TOKEN */
/** @namespace process.env.HOST */
/** @namespace process.env.USER */
/** @namespace process.env.PASSWORD */
/** @namespace process.env.DATABASE */

const db = mysql.createConnection({
    host: process.env.HOST, 
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

db.connect(err => { if (err) console.log(err) });

function send(id, msg) {
    client.channels.get(id).send(msg);
}

client.on('ready', () => {
    client.user.setActivity(`${prefix}help | ${client.guilds.size} servers`,{ type: 'PLAYING' });
    console.log(`Запущен. Сервера: ${client.guilds.size}`);
})

    client.on('guildCreate', (guild) => {
        send('520181376352256002', `
Я **пришел** :inbox_tray: на сервер **${guild.name}**. Информация о нем:
Акроним и ID: **${guild.nameAcronym} | ${guild.id}**
Основатель: **${guild.owner} (\`${guild.owner.user.tag}\`)**
Количество участников: **${guild.memberCount}**
Роли: **${guild.roles.size}**
Каналы: **${guild.channels.size}**
Создана: **${guild.createdAt.toString().slice(4, -32)}**
Иконка: ${guild.iconURL}
**Это наш ${client.guilds.size}-ый сервер!**
        `);
        client.user.setActivity(`${prefix}help | ${client.guilds.size} servers`,{ type: 'PLAYING' });
        let channels = guild.channels.filter(channel => channel.type === 'text' && channel.permissionsFor(guild.members.get(client.user.id)).has('SEND_MESSAGES'));
        if (channels.size > 0) channels.first().send(`Type ${prefix}role-changing \`@role\`, to launch changing role. Напишите ${prefix}role-changing \`@роль\`, чтобы запустить меняющуюся роль. Also, join our server --> https://discord.gg/DxptT7N`);
    });
    client.on('guildDelete', (guild) => {
        if (rainbowOn.has(guild.id)) rainbowOn.delete(guild.id);
        if (rainbowRole.has(guild.id)) rainbowRole.delete(guild.id);
        send('520181376352256002', `
Я **покинул** :outbox_tray: сервер **${guild.name}**. Информация о нем:
Акроним и ID: **${guild.nameAcronym} | ${guild.id}**
Основатель: **${guild.owner} (\`${guild.owner.user.tag}\`)**
Количество участников: **${guild.memberCount}**
Роли: **${guild.roles.size}**
Каналы: **${guild.channels.size}**
Создана: **${guild.createdAt.toString().slice(4, -32)}**
Иконка: ${guild.iconURL}
        `);
        client.user.setActivity(`${prefix}help | ${client.guilds.size} servers`,{ type: 'PLAYING' });
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

        if (!rainbowOn.has(message.guild.id)) return message.reply('Изменение цвета роли и так не включено')

        rainbowOn.delete(message.guild.id)
        message.reply('Изменение отключено');

        send('520181421382565903', `Пользователь ${message.author} (${message.author.tag}) **отключил** :negative_squared_cross_mark: изменение роли на ${message.guild.name} (${message.guild.id})`)
    }
    
        if (['role-changing', 'changing-role', 'rc', 'r-c', 'cr', 'c-r'].includes(command)) {
            let role = message.mentions.roles.first();

            if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply('У вас недостаточно прав');

            if (!role) return message.reply(`Вы не упомянули роль. Правильное использование:\n${prefix}role-changing @роль`);

            if (!role.editable) return message.reply('У меня недостаточно прав. Роль бота должна находиться над ролью и мне нужно право "Управление ролями"');

            if (rainbowOn.has(message.guild.id)) return message.reply('Нелья создавать более одной меняющейся роли на сервере');

            rainbowOn.add(message.guild.id);
            rainbowRole.add(role.id)

            db.query(`SELECT * FROM guildData WHERE id = ${message.guild.id}`, (err, rows) => {
                if (err) console.log(err);
                if (!rows[0]) db.query(`INSERT INTO guildData (id, colors) VALUES ('${message.guild.id}', '${colors}')`, console.log)
                rainbow(role, rows[0].colors.split(' '));
            })

            send('520181421382565903', `Пользователь ${message.author} (${message.author.tag}) **включил** :white_check_mark: изменение роли на ${message.guild.name} (${message.guild.id})`)

            message.reply('Авто-изменение успешно включено');
        }

    if (command === 'set-colors') {
        if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply('У вас недостаточно прав');
        let allColors = [];
        if (!args[1] || args[7]) return message.reply('Укажите от 2-ух до 7-ми цветов');
            
        for (let i = 0; i < args.length; i++) {
            if (!args[i].match(hexreg)) return message.reply(`Аргумент **${i + 1}** не является hex цветом (\`#ff0000\`)`)
            allColors.push(`${i + 1}) **${args[i]}**`)
        } 
        db.query(`SELECT * FROM guildData WHERE id = ${message.guild.id}`, (err, rows) => {
            if (err) console.log(err);
            if (!rows[0]) db.query(`INSERT INTO guildData (id, colors) VALUES ('${message.guild.id}', '${colors}')`, console.log)
            db.query(`UPDATE guildData SET colors = '${args.join(' ')}' WHERE id = '${message.guild.id}'`);
        })
        message.reply(`Цвета меняющейся роли изменены на:\n${allColors.join('\n')}`);

    }

    if (command === 'reset-colors') {
        if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply('У вас недостаточно прав');
        db.query(`SELECT * FROM guildData WHERE id = ${message.guild.id}`, (err, rows) => {
            if (err) console.log(err);
            if (!rows[0]) db.query(`INSERT INTO guildData (id, colors) VALUES ('${message.guild.id}', '${colors}')`, console.log)
            db.query(`UPDATE guildData SET colors = '${colors}' WHERE id = '${message.guild.id}'`);
        })
        message.reply('Цвета меняющейся роли изменены на стандартные');
    }

    if (command === 'invite') message.channel.send('Пригласить бота:\nhttps://discordapp.com/oauth2/authorize?client_id=472048383075549186&scope=bot&permissions=268520448');
    
    if (command === 'creator') message.channel.send(`\`${client.users.get(creator).tag}\``);

    if (command === 'bug') {
        if (!args[0]) return message.reply('Не указан баг');
        let bug = args.join(" ");
        send('520325705905471508', `Баг от \`${message.author.tag}\` (${message.author.id}):\n**${bug}**`);
        message.channel.send('Баг успешно отправлен :white_check_mark:\n\nВнимание! Если вы написали несуществующий баг, то вам безвозвратно отключат все команды бота!');
    }
    
    if (command === 'help') message.channel.send(`
**${prefix}role-changing** \`@роль\` - Запустить изменение цвета на роли \`@роль\`.
**${prefix}set-colors** \`HEX цвета\` - Изменить палитру цветов для меняющейся роли
**${prefix}reset-colors** - Изменить цветовую палитру меняющейся роли на стандартную (радужную)
**${prefix}stop** - Остановить изменение цвета.
**${prefix}invite** - Ссылка по которой можно пригласить бота на ваш сервер.
**${prefix}creator** - Узнать создателя бота.
**${prefix}bug** \`описание бага\` - Если бот работает не так как должен, то вы можете рассказать об этом разработчику с помощью этой команды.
\n**Получить больше помощи можно тут:** \`https://discord.gg/NvcAKdt\`
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
            "Это ${guild.name}. Информация о серере:" {
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
        client.users.get().
        hastebinGen(desc.join(''), 'js').then(link => message.channel.send(`Информация о сервере ${client.guilds.get(args[0]).name} --> ${link}`))
    }

    

});

client.login(process.env.BOT_TOKEN);