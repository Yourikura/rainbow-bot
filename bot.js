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

let colors = ['#ff0000', '#ffa500', '#ffff00', '#00ff00', '#00BFFF', '#0000ff', '#ff00ff'];


/** @namespace process.env.BOT_TOKEN */

function send(id, msg) {
    client.channels.get(id).send(msg);
}

async function roleChanginging () {
    forEachTimeout(colors, color => {
        client.guilds.forEach(guild => {
            if (rainbowOn.has(guild.id) && guild.roles.find(r => r.name === 'Multicolor')) {
                const role = guild.roles.find(r => r.name === 'Multicolor')
                if (role.editable && role) role.setColor(color); 
            };
        });
    }, 1500).then(() => roleChanginging());
};

roleChanginging();

client.on('ready', () => {
    client.user.setActivity(`${prefix}help`,{ type: 'PLAYING' });
    console.log(`Запущен. Сервера: ${client.guilds.size}`);
})

client.on('message', message => {
    if (message.channel.type !== 'text' || message.author.bot || !message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) return;
    if (blocked.has(message.author.id)) return message.reply('Автор бота отключил вам все команды. Причинами могут быть:\n1. Отправление несуществующего бага\n2. Нарушение правил на официальном севрере');
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    function random(min, max) {
        return Math.floor(Math.random() * (max + 1 - min)) + min;
    }

    if (!message.content.startsWith(prefix)) return;

    const embed = new Discord.RichEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setColor('55ff55')
    .setDescription(`Пользователь ${message.author} использовал команду **${prefix+command}** \`${(args[0]? `\`${args.join(' ')}\`` : ' ')}\` на **${message.guild.name}**`)
    send('539471792591339521', embed);

    if (['memes'].includes(command)) {
        const memes = [
            'https://cdn.discordapp.com/attachments/529016532232044556/529368940145672212/unknown.png',
            'https://cdn.discordapp.com/attachments/529016532232044556/529366880511590411/unknown.png',
            'https://cdn.discordapp.com/attachments/529016532232044556/529034507408375851/unknown.png',
            'https://cdn.discordapp.com/attachments/529016532232044556/529032528699588614/unknown.png',
            'https://cdn.discordapp.com/attachments/529016532232044556/529027412814594068/unknown.png',
            'https://cdn.discordapp.com/attachments/529016532232044556/529026550482337817/unknown.png',
            'https://cdn.discordapp.com/attachments/529016532232044556/529025913875202079/unknown.png',
            'https://cdn.discordapp.com/attachments/529016532232044556/529024737020477450/unknown.png',
            'https://cdn.discordapp.com/attachments/529016532232044556/529023030010183711/unknown.png',
            'https://cdn.discordapp.com/attachments/529016532232044556/529021261398147093/unknown.png',
            'https://cdn.discordapp.com/attachments/529016532232044556/529020657128833025/unknown.png',
            'https://cdn.discordapp.com/attachments/529016532232044556/529017600064094218/unknown.png',
            'https://cdn.discordapp.com/attachments/529016532232044556/529016830472224779/unknown.png',
            'https://cdn.discordapp.com/attachments/529016532232044556/529016764365799426/6576a6e2eda9eaa6.png',
            'https://cdn.discordapp.com/attachments/529016532232044556/529016714235609091/-1.png',
            'https://cdn.discordapp.com/attachments/529016532232044556/529016653334315010/unknown.png',
            'https://cdn.discordapp.com/attachments/529016532232044556/529678920665137152/12.jpg'
        ]

        const embed = new Discord.RichEmbed()
        .setTitle('Очень смищно')
        .setColor('55ff55')
        .setImage(memes[random(0, memes.length - 1)]);
        message.channel.send({embed})
    }

    /*if (command === 'clear') {
        let leaved = 0;
        client.guilds.forEach(guild => {
            if (guild.memberCount < 400) guild.leave().catch(err);
            leaved++;
        })
        message.reply(`Я ливнул с ${leaved} серверов`)
    }*/

    function succ (text) {
        const embed = new Discord.RichEmbed()
        .setColor('55ff55')
        .setTitle('Успех :white_check_mark:')
        .setDescription(`**${text}**`)
        return message.channel.send({embed});
    }

    function err (text, perms) {
        const embed = new Discord.RichEmbed()
        .setColor('ff5555')
        .setTitle('Ошибка :exclamation:')
        .setDescription(`Причина: **${text}**`)
        if (perms) embed.setDescription(`**У вас нет права "${perms}"**`);
        return message.channel.send({embed});
    }

    if (command === 'stop') {
        if (!message.member.hasPermission("MANAGE_ROLES")) return err(null, 'Управление ролями')

        if (!rainbowOn.has(message.guild.id)) return err('Изменение роли и так не включено')

        rainbowOn.delete(message.guild.id)
        succ('Изменение роли успешно отключено')
    }
    
        if (['rainbow', 'rb'].includes(command)) {
            const role = message.guild.roles.find(r => r.name === 'Multicolor');

            if (!message.member.hasPermission("MANAGE_ROLES")) return err(null, 'Управление ролями');

            if (!role) return err('На вашем сервере нет роли с названием \`Multicolor\`');

            if (!role.editable) return err(`У меня недостаточно прав для изменения роли ${role}`);

            if (rainbowOn.has(message.guild.id)) return err('Нелья создавать более одной меняющейся роли на сервере');

            rainbowOn.add(message.guild.id);

            succ('Авто-изменение успешно включено');
        }

    /*if (command === 'set-colors') {
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
    }*/
    
    if (command === 'creator') message.channel.send(`\`${client.users.get(creator).tag}\``);

    if (command === 'bug') {
        if (!args[0]) return message.reply('Не указан баг');
        let bug = args.join(" ");
        send('539471824325705728', `Баг от \`${message.author.tag}\` (${message.author.id}):\n**${bug}**`);
        succ('Баг успешно отправлен\nВнимание! Если вы написали несуществующий баг, то вам безвозвратно отключат все команды бота!');
    }
    
    if (command === 'help') message.channel.send(`
**ВНИМЕНИЕ! Этот бот является платным. Если вы хотите добавить его на сервер, то вам нужно сначала посмотреть информацию о донате на сервере https://discord.gg/NvcAKdt**
**${prefix}rainbow** - Запустить изменение цвета на роли Multicolor.
**${prefix}stop** - Остановить изменение цвета.
**${prefix}creator** - Узнать создателя бота.
**${prefix}bug** \`описание бага\` - Если бот работает не так как должен, то вы можете рассказать об этом разработчику с помощью этой команды.
\n**Получить больше помощи можно тут:** \`https://discord.gg/NvcAKdt\`
`);

    if (message.author.id !== creator) return;

    if (command === 'invite') message.channel.send('Пригласить бота:\nhttps://discordapp.com/oauth2/authorize?client_id=472048383075549186&scope=bot&permissions=268520448');
    
    if (command === 'block') {
        blocked.add(args[0]);
        succ(`**${client.users.get(args[0]).tag}** Успешно заблокирован`)
    }

    if (command === 'unlock') {
        blocked.delete(args[0]);
        succ(`**${client.users.get(args[0]).tag}** Успешно разблокирован`)
    }

    if (command === 'mass-say') {
        client.guilds.forEach(guild => {
            let channels = guild.channels.filter(channel => channel.type === 'text' && channel.permissionsFor(guild.members.get(client.user.id)).has('SEND_MESSAGES'));
            if (channels.size > 0) channels.first().send(args.join(' '));
        })
    }

    if (command === 'guilds') {
        const guildsCollection = client.guilds.sort((guild1, guild2) => { return guild2.memberCount-guild1.memberCount });
        let guilds = [];
        guildsCollection.forEach(guild => {
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

    if (command === 'js') {

        const code = args.join(" "); //Константа с ботом

        try {

            let output = eval(code); //Константа с эмуляцией кода
            
            if (output.length < 1950) message.channel.send(`\`\`\`js\n${output}\n\`\`\``).then(() => {message.react("✅")}); //Отправка результатов симуляции
            
            else message.channel.send(`${output}`, {split:"\n", code:"js"}); //Отправка результатов симуляции если их длина больше 1950-ти
        
        } 
        
        catch (error) { message.channel.send(`Анхэндлэд промайз риджекшн ворнинг \`\`\`js\n${error}\`\`\``).then(() => message.react("❎")) }; //Отправка ошибки
        
    }

    

});

client.login(process.env.BOT_TOKEN);
