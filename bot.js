//Подключение всех библиотек
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs');
const economy = require('discord-eco');
const forEachTimeout = require('foreach-timeout');
module.exports = {
    0: '0⃣', 1: '1⃣',
    2: '2⃣', 3: '3⃣', 4: '4⃣', 5: '5⃣',
    6: '6⃣', 7: '7⃣', 8: '8⃣', 9: '9⃣',
    10: '🔟',
};
//Секретный токен
/** @namespace process.env.BOT_TOKEN */
//Префикс
let prefix = '=';
//Валюта
let currency = '₽';
//ID Ролей
let moder = `467284420303257621`
let people = '467301169610489866'
let owner = '437291380625113108'
let plus = '468089974320005121'
let premium = '468090066145771521'
let watcher = '468090164523040768'
let epic = '468090270739595266'
let muted = '469135765427847178'
//Другие переменные
const bot_name = 'Программист';
let version = 'v1.4.0'
let update = 'Вышла новая версия ' + version + '. Обновления:\n\n1. Добавлена система опыта и уровней за сообщения\n\n2. Переделана команда =help.\n\n3. Исправлено очень много багов\n\n4. Сокращено количество строк. Была проделана большая работа над оптимизацией\n\n 5. Удалены ненужные команды\n\n6. Изменено имя бота'
let rules = '1. Оскорбления других людей (Мут на 1 час). НО в случае уместного оскорбления, а не беспричинного человек не будет наказан. Также, вы не будете наказаны назвав кого то "Нуб" или подобными словами.\n\n2. Убийсто соклановца (Варн). НО если убийце получится доказать то что он сдделал это случайно, то он останется безнаказанным. в противном случае убийца получит варн. При наборе трех варнов он получает пожизненный бан.\n\n3. Рассылка порнографического контента без цензуры (Мут на 1 час). НО если на контенте присутствует цензура, то вы останетесь безнаказанным. При слишком частой рассылке с цензурой вы все также будете наказаны мутом на 1 час.\n\n4. Рассылка вредноносного ПО, т. е. вирусов, троянов и т. п. (Мут на 1 час). НО если ПО способно любыми способами удалить данные с жесткого диска (Шифрование, Блокирование, Полное удаление), то вы получите пожизненный бан.\n\n5. Реклама чего либо без разрешения администрации, или в непредназначенных для этого каналах. Для приглашений на другие сервера существует канал #invites. А для пиара других проектов зайдите в #photoshop-projects или #code-projects. Если администрация согласиться рекламировть ваш проект (Не сервер), то у вас появится право писать о его обновлених в #updates.\n\n6. Флуд или спам (Мут на 1 час). Для нашего сервера флуд - это сообщение(ия) в большинстве случаев занимающие большие объемы и не несущие никакого смысла, или содержащее очень малое количесво полезной информации. Спам - это большое количество повторяющихся символов, слов или фраз.\n\n7. Попрошайничество роли (Мут на 1 час). Попрошайничество роли - это когда человек пишет подобное сообщение: "Дайте мне роль ___". А например "Когда голосование за модератора?" в это не входит.'
let rulesMore = '8. Написание большого количество /tts сообщений или одного большого бессмысленного сообщения. (Мут на 1 час). Если вы к многим своим сообщениям будете добавлять /tts, даже не смотря на то что они будут вполне адекватными вы все также получите наказание.\n\n9. Использовать @everyonе или @hеre более одного раза в день (Без наказания, это правило просто желательно выполнять)'
let footer = bot_name + " | " + version + " | Все права защищены"
//Функции
//Функция для генерации случайного числа от min до max
function randomInteger(min, max) {
    max++
    return Math.floor(Math.random() * (max - min)) + min;
}
//Функция для замены окончания слова в заисимости от числительного
function declOfNum(number, titles) {
    let cases = [2, 0, 1, 1, 1, 2];
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}
//Функция для добавления нескольких реакций под сообщение
async function multipleReact(message, arr) {
    if (arr !== []) {
        await message.react(arr.shift()).catch(console.error).then(function () {multipleReact(message,arr).catch();});
    }
}
//Функция для устнаовки большого таймаута
function setBigTimeout(func, timeout) {
    if (timeout > 0x7FFFFFFF)
        setTimeout(function() {setBigTimeout(func, timeout-0x7FFFFFFF);}, 0x7FFFFFFF);
    else
        setTimeout(func, timeout);
}
client.on('guildMemberAdd', (member) => {
    member.addRole(people);
    const embed = new Discord.RichEmbed()
        .setTitle('Дороу')
        .setDescription('**Приветствую тебя ' + member + ', я - бот этого сервера. У меня есть магазин, экономика, миниигры, большое количесто команд. А на нашем сервере ты сможешь найти хороших друзей, редкие пинги, возможность поделиться своим творчеством, и посмотреть как его оценят другие люди. В скором времени у нас выйдет много обновлений. С уважением ' + bot_name + ' ' + version + '**')
        .setColor('af00ff')
        .setFooter(footer)
        .setTimestamp();
        member.send({embed})
    const embed2 = new Discord.RichEmbed()
        .setTitle('Пополнение!')
        .setColor('af00ff')
        .setDescription('На сервер **' + member.guild + '** пришел ' + member + '\n\nУчастников на этом сервере теперь **' + member.guild.memberCount + '**')
        .setFooter(footer)
        .setTimestamp()
        client.fetchUser('242975403512168449').then (user => user.send({embed: embed2}));
        client.channels.get('467307902252613652').send(member + ' Прилетел на сервер. Нас стало **' + member.guild.memberCount + '**');
});
//Событие ухода мембера с сервера
client.on('guildMemberRemove', (member) => {
    member.send('Прощай, ' + member + '. Мы будем скучать');
    const embed = new Discord.RichEmbed()
        .setTitle('Он ушел')
        .setColor('af00ff')
        .setDescription(member + ' ушел :(.\n\nТеперь нас **' + member.guild.memberCount + '**')
        .setFooter(footer)
        .setTimestamp()
        client.fetchUser('242975403512168449').then (user => user.send({embed}));
        client.channels.get('467307902252613652').send(member + 'Покинул' + member.guild + ' Остались **' + member.guild.memberCount + '** пользователей');
});
//То что должно произойти после запуска бота
client.on('ready', () => {
    client.user.setActivity('на ' + prefix + 'help',{ type: 'WATCHING' })
    console.log('Бот запущен успешно\n    Экономика работает...\n    Команды работают...\n    Количество гильдий на которых присутствует бот: ' + client.guilds.size);
});
//Кулдаун
let cooldownForXp = new Set();
let cdfxseconds = 60
//Подключение JSON файлов
let userData = require('./Storage/userData.json');
let items = require('./Storage/items.json');
let colors = require('./Storage/colors.json');
let buyItems = require('./Storage/buyItems.json');
let xpForLvl = [100, 255, 475, 770, 1150, 1625, 2205, 2900, 3720, 4675, 5775, 7030, 8450, 10045, 11825, 13800, 15980, 18375, 20995, 23850, 26960, 30305, 33925, 37820, 42000]
let yourTasks = '';
/*client.on('message', message => {
    if (message.author.bot) return;
    if(message.channel.type !== 'text') return;
    if(message.channel.id === '469504020323631115') return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (!message.content.startsWith(prefix)) return;
    let tasksTypes = ['msgSender']
    if (['tasks'].includes(command)) {
        let task = randomInteger(0, tasksTypes.length);
        if (task === 0) yourTasks += 'Написать 100 сообщений в чате'
            const embed = new Discord.RichEmbed()
                .setTitle('Ваши задания')
                .setColor("af00ff")
                .setDescription('Вы были **забанены** пользователем ' + message.author + '.\n\nВремя: **' + args[1] + '**.\n\nПричина:**' + reason + '.**\n\nНе надо было вести себя плохо!')
                .setFooter(bot_name + " | " + version + " | Все права защищены")
                .setTimestamp();
            message.author.send({embed});
    }
})*/
client.on('message', message => {
    if (message.author.bot) return;
    if(message.channel.type !== 'text') return;
    if(message.channel.id === '469504020323631115') return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    let userData = require('./Storage/userData.json');
    if(!userData[message.author.id + message.guild.id]) userData[message.author.id + message.guild.id] = {};
    if(!userData[message.author.id + message.guild.id].xp) userData[message.author.id + message.guild.id].xp = 0;
    if(!userData[message.author.id + message.guild.id].lvl) userData[message.author.id + message.guild.id].lvl = 0;
    userData = require('./Storage/userData.json');
    if(message.content.startsWith(prefix)) {
    if (['rank', 'rang'].includes(command)) {
        let user = message.mentions.members.first();       
        const embed = new Discord.RichEmbed()
        if (!user) {
            embed.setAuthor(message.member.displayName, message.author.avatarURL);
            user = message.author
        } else {
            embed.setAuthor(user.displayName, user.user.avatarURL)
            if (user.user.bot) return message.reply('Ошибка. Причина: **У ботов не может быть опыта**');
        }
        if(!userData[user.id + message.guild.id]) userData[user.id + message.guild.id] = {};
        if(!userData[user.id + message.guild.id].xp) userData[user.id + message.guild.id].xp = 0;
        if(!userData[user.id + message.guild.id].lvl) userData[user.id + message.guild.id].lvl = 0; 
        let toNextLvl = xpForLvl[userData[message.author.id + message.guild.id].lvl] - userData[message.author.id + message.guild.id].xp
        embed.setFooter(bot_name + " | " + version + " | Все права защищены")
        .setColor("af00ff") 
        .addField('Опыт', '**' + userData[user.id + message.guild.id].xp + '/' + xpForLvl[userData[message.author.id + message.guild.id].lvl] + '**',true)
        .addField('Уровень', '**' + userData[user.id + message.guild.id].lvl + '**',true)
        message.channel.send({embed});
    }
    if (['xp-reset'].includes(command)) {
        if (!message.member.hasPermission("ADMINISTRATOR")) return;
        let user = message.mentions.members.first();  
        if (!user) user = message.author;
        if(!userData[user.id + message.guild.id]) userData[user.id + message.guild.id] = {};
        if(!userData[user.id + message.guild.id].xp) userData[user.id + message.guild.id].xp = 0; 
        if(!userData[user.id + message.guild.id].lvl) userData[user.id + message.guild.id].lvl = 0; 
        userData[user.id + message.guild.id].xp = 0;
        userData[user.id + message.guild.id].lvl = 0;
        message.channel.send('Вы успешно сбросили опыт ' + user);
    }
    if ('all-xp-reset-Wr43щ%w$K&iue'.includes(command)) {
        if (!message.member.hasPermission("ADMINISTRATOR")) return;
        Object.keys(userData).forEach(key => {
            userData[key] = {xp: 0, lvl: 0};
        })
        message.channel.send('Вы успешно сбросили опыт со всего вашего сервера');
    }
    } else if (!message.content.startsWith(prefix)) {
            if (message.author.bot) return;
            if (message.channel.type !== 'text') return;
            if (message.channel.id === '469504020323631115') return;
            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const command = args.shift().toLowerCase();
            fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
                if (err) console.error(err);
            })
            let awardMsg = '';
                if (cooldownForXp.has(message.author.id)) return;
                userData[message.author.id + message.guild.id].xp = userData[message.author.id + message.guild.id].xp + randomInteger(15, 25);
                for (let i = 0; i < xpForLvl.length; i++) {
                if (userData[message.author.id + message.guild.id].xp >= xpForLvl[i] && userData[message.author.id + message.guild.id].lvl === i) {
                    userData[message.author.id + message.guild.id].lvl = userData[message.author.id + message.guild.id].lvl + 1;
                    if (message.guild.id === '437290658458501143') {
                        if (userData[message.author.id + message.guild.id].lvl === 2) {awardMsg = 'И получаете роль "IT Новичок" в качестве приза!'; message.guild.members.get(message.author.id).addRole(message.guild.roles.find("id", "468124918811197441"));}
                        if (userData[message.author.id + message.guild.id].lvl === 4) {awardMsg = 'И получаете роль "IT Любитель" в качестве приза!'; message.guild.members.get(message.author.id).addRole(message.guild.roles.find("id", "468138240210239500")); message.guild.members.get(message.author.id).removeRole(message.guild.roles.find("id", "468124918811197441"));}
                        if (userData[message.author.id + message.guild.id].lvl === 8) {awardMsg = 'И получаете роль "Разбирающийся в IT сфере" в качестве приза!'; message.guild.members.get(message.author.id).addRole(message.guild.roles.find("id", "468138293226373140")); message.guild.members.get(message.author.id).removeRole(message.guild.roles.find("id", "468138240210239500"));}
                        if (userData[message.author.id + message.guild.id].lvl === 16) {awardMsg = 'И получаете роль "Хороший IT-шник" в качестве приза!'; message.guild.members.get(message.author.id).addRole(message.guild.roles.find("id", "468138564715151360")); message.guild.members.get(message.author.id).removeRole(message.guild.roles.find("id", "468138293226373140"));}
                        if (userData[message.author.id + message.guild.id].lvl === 25) {awardMsg = 'И получаете роль "IT Специалист" в качестве приза!'; message.guild.members.get(message.author.id).addRole(message.guild.roles.find("id", "468138604313444372")); message.guild.members.get(message.author.id).removeRole(message.guild.roles.find("id", "468138564715151360"));}
                    }
                    message.channel.send('Поздравляем, ' + message.author + ', вы получили **' + userData[message.author.id + message.guild.id].lvl + '** уровень! ' + awardMsg); 
                    awardMsg = '';
                }
            }
            if(!message.content.startsWith(prefix) && !cooldownForXp.has(message.author.id)) cooldownForXp.add(message.author.id);
            setTimeout(() => {
                cooldownForXp.delete(message.author.id)
            }, cdfxseconds * 1000)
    }
});
client.on('message', message => { //Событие message для экономики
    if(message.content.indexOf(prefix) !== 0) return;
    if(message.channel.type !== 'text') return;
    if(message.channel.id === '469504020323631115') return;
    if (message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    let currency = '₽'
    if(!userData[message.author.id + message.guild.id]) userData[message.author.id + message.guild.id] = {};
    if(!userData[message.author.id + message.guild.id].money) userData[message.author.id + message.guild.id].money = 0;
    userData = require('./Storage/userData.json');
    fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
        if (err) console.error(err);
    })
    if (['rsp', 'кнб', 'кыз'].includes(command)) {        
        let userChoice;
                if (!args[0]) {
                    message.channel.send(message.author + ', Ошибка. Причина: **Вы забыли указать что вы выбираете, камень, ножницы или бумагу**');
                    return;
                }
                else if (['камень', 'rock', 'r', 'к'].includes(args[0].toLowerCase())) {
                    userChoice = 'камень';
                }
                else if (['бумагу', 'бумага', 'paper', 'p', 'б'].includes(args[0].toLowerCase())) {
                    userChoice = 'бумагу';
                }
                else if (['scissors', 'ножницы', 's', 'н'].includes(args[0].toLowerCase())) {
                    userChoice = 'ножницы';
                } else {
                    userChoice = 'Incorrect';
                }
                let computerChoice = Math.random();
                if (computerChoice < 0.34) {
                    computerChoice = "камень";
                } else if(computerChoice <= 0.67) {
                    computerChoice = "бумагу";
                } else {
                    computerChoice = "ножницы";
                }
                function rspCW(userChoice, computerChoice) {
                    let award = randomInteger(1, 3);
                    if (userChoice === computerChoice) {
                        return "ничья!";
                    }
                    else if(userChoice === "камень") {
                        if(computerChoice === "ножницы") {
                            return "ты выиграл(а)!";
                        }
                        else if (computerChoice === "бумагу") {
                            return "ты проиграл(а).";
                        }
                    }
                    else if(userChoice === "бумагу") {
                        if(computerChoice === "камень") {
                            return "ты выиграл(а)!";
                        } else if (computerChoice === "ножницы") {
                            return "ты проиграл(а).";
                        }
                    }
                    else if(userChoice === "ножницы") {
                        if(computerChoice === "бумагу") {
                            return "ты выиграл(а)!";
                        } else if (computerChoice === "камень") {
                            return "ты проиграл(а).";
                        }
                    }
                    else if (userChoice === 'Incorrect') {
                        return "ты не выбрал ни камень, ни ножницы, ни бумагу";
                    }
                }
                if (userChoice === 'Incorrect') {
                    message.channel.send(message.author + ", " + rspCW(userChoice, computerChoice))
                }
                else {
                message.channel.send('Я выбрал ' + computerChoice + '. ' + message.author + ", " + rspCW(userChoice, computerChoice) + ' Ты выбрал\(а\) ' + userChoice + ' Я выбрал ' + computerChoice);
             }
            };
    if (['bal', 'money', 'cash', 'mon', 'balance'].includes(command)) {
        let user = message.mentions.members.first();       
        const embed = new Discord.RichEmbed()
        if (!user) {
            embed.setAuthor(message.member.displayName, message.author.avatarURL);
            user = message.author
        } else {
            embed.setAuthor(user.displayName, user.user.avatarURL)
            if (user.user.bot) return message.reply('Ошибка. Причина: **У ботов не может быть денег**');
        }
        if(!userData[user.id + message.guild.id]) userData[user.id + message.guild.id] = {};
        if(!userData[user.id + message.guild.id].money) userData[user.id + message.guild.id].money = 0; 
        embed.setFooter(bot_name + " | " + version + " | Все права защищены")
        .setColor("af00ff") 
        .addField('Баланс', '**' + userData[user.id + message.guild.id].money + currency + '**',true)
        message.channel.send({embed});
    }
    if (['add-money', 'a-m', 'am'].includes(command)) {
        let user = message.mentions.members.first(); 
        if (user.user.bot) return message.reply('Ошибка. Причина: **У ботов не может быть денег**');
        if (!args[0] || !user) return message.reply('Ошибка. Причина: **Не указан пользователь**');
        if (!args[1] || isNaN(args[1])) return message.reply('Ошибка. Причина: **Не указано количество**');
        if(!userData[user.id + message.guild.id]) userData[user.id + message.guild.id] = {};
        if(!userData[user.id + message.guild.id].money) userData[user.id + message.guild.id].money = 0;
        userData[user.id + message.guild.id].money = userData[user.id + message.guild.id].money + parseInt(args[1]);
        message.channel.send('Пользователь успешно получил ' + args[1] + currency)
    }
    if (['remove-money', 'r-m', 'rm'].includes(command)) {
        if (!message.member.hasPermission("ADMINISTRATOR")) return
        let user = message.mentions.members.first(); 
        if (message.mentions.members.first().bot) return message.reply('Ошибка. Причина: **Если у ботов не может быть денег, то тогда зачем списывать деньги с их счета?**');
        if (!args[0] || !user) return message.reply('Ошибка. Причина: **Не указан пользователь**');
        if (!args[1] || isNaN(args[1])) return message.reply('Ошибка. Причина: **Не указано количество**');
        if(!userData[user.id + message.guild.id]) userData[user.id + message.guild.id] = {};
        if(!userData[user.id + message.guild.id].money) userData[user.id + message.guild.id].money = 0;
        userData[user.id + message.guild.id].money = userData[user.id + message.guild.id].money - parseInt(args[1]);
        message.channel.send('Успешно списано со счета ' + user + ' ' + args[1] + currency)
    }
    if ('economy-reset-Wr43щ%w$K&iue'.includes(command)) {
        if (!message.member.hasPermission("ADMINISTRATOR")) return;
        Object.keys(userData).forEach(key => {
            userData[key] = {money: 0};
        })
        message.channel.send('Экономика была уничтожена успешно');
    }
    if (['money-reset'].includes(command)) {
        if (!message.member.hasPermission("ADMINISTRATOR")) return
        let user = message.mentions.members.first(); 
        if (message.mentions.members.first().bot) return message.reply('Ошибка. Причина: **Если у ботов не может быть денег, то тогда зачем списывать деньги с их счета?**');
        if (!user) return message.reply('Ошибка. Причина: **Не указан пользователь**');
        if(!userData[user.id + message.guild.id]) userData[user.id + message.guild.id] = {};
        if(!userData[user.id + message.guild.id].money) userData[user.id + message.guild.id].money = 0;
        userData[user.id + message.guild.id].money = userData[user.id + message.guild.id].money - userData[user.id + message.guild.id].money;
        message.channel.send('Деньги ' + user + 'Были списаны успешно');
    }
    if (['shop', 'sh'].includes(command)) {
        if (args[0] === '2') {
            let categories = []; 
        for (var i in colors) { 
            if (!categories.includes(colors[i].type)) {
                categories.push(colors[i].type)
            }
        }
        const embed = new Discord.RichEmbed()
            .setTitle(`Магазин IT`)
            .setDescription('Страница 2/2')
            .setColor("af00ff")
        for (var i = 0; i < categories.length; i++) { 
            var tempDesc = '';
            for (var c in colors) { 
                if (categories[i] === colors[c].type) {
                    tempDesc += `**${colors[c].name} — ` + currency + `${colors[c].price}**\n${colors[c].desc}\n\n`;
                }
            }
                embed.addField(categories[i], tempDesc)
        }
        return message.channel.send({embed});
        } else if (!args[0]) {
        let categories = []; 
        for (var i in items) { 
            if (!categories.includes(items[i].type)) {
                categories.push(items[i].type)
            }
        }
        const embed = new Discord.RichEmbed()
            .setTitle(`Магазин IT`)
            .setDescription('Страница 1/2')
            .setColor("af00ff")
        for (var i = 0; i < categories.length; i++) { 
            var tempDesc = '';
            for (var c in items) { 
                if (categories[i] === items[c].type) {
                    tempDesc += `**${items[c].name} — ` + currency + `${items[c].price}**\n${items[c].desc}\n\n`;
                }
            }
                embed.addField(categories[i], tempDesc)
        }
        return message.channel.send({embed});
    }
    }
    if (['buy', 'b'].includes(command)) {
        let categories = []; 
        if (!args.join(" ")) { 
            message.reply('Ошибка. Причина: **Я не знаю предмет "Пустота" ???**');
            return
        }
        let itemName = '';
        let itemPrice = 0;
        let itemDesc = '';
        for (var i in buyItems) { 
            if (args.join(" ").trim().toUpperCase() === buyItems[i].name.toUpperCase()) { 
                itemName = buyItems[i].name;
                itemPrice = buyItems[i].price;
                itemDesc = buyItems[i].desc;
            }
        }
        if (itemName === '') {
            return message.channel.send(`**Я не знаю предмет "${args.join(" ").trim()}" o_O. И не смогу тебе его продать**`)
        }
        economy.fetchBalance(message.member.id + message.guild.id).then((i) => { 
            if (i.money <= itemPrice) { 
                return message.channel.send(`**Вам не хватает` + i.money - itemPrice + currency + '**');
            }
            economy.updateBalance(message.member.id + message.guild.id, parseInt(`-${itemPrice}`)).then((i) => {
                message.channel.send(`**Вы успешно купили ` + itemName + `. У вас осталось `+ i.money + currency + `**`);
                if (itemName === 'Булочка') message.channel.send('**Это была очень вкусная булочка, Но ты потратил деньги в пустую, потому что на нашем сервере у тебя нет голода ¯\\_(ツ)_/¯. Возможно что эта система будет добавлена в будущем**'); 
                else if (itemName === 'Булочка премиум') message.channel.send('**Это была очень вкусная булочка, Но ты потратил деньги в пустую, потому что на нашем сервере у тебя нет голода ¯\\_(ツ)_/¯. Возможно что эта система будет добавлена в будущем**'); 
                else if (itemName === 'Бургер') message.channel.send('**Это был очень вкусный бургер, Но ты потратил деньги в пустую, потому что на нашем сервере у тебя нет голода ¯\\_(ツ)_/¯. Возможно что эта система будет добавлена в будущем**'); 
                else if (itemName === 'Plus') {if (message.member.roles.some(r=>[plus].includes(r.id))) {economy.updateBalance(message.author.id + message.guild.id, '50'); message.channel.send('**У вас уже была роль ' + itemName + '. Мы вернули вам деньги**');}; message.guild.members.get(message.author.id).addRole(message.guild.roles.find("name", itemName));}
                else if (itemName === 'Premium') {if (message.member.roles.some(r=>[premium].includes(r.id))) {economy.updateBalance(message.author.id + message.guild.id, '350'); message.channel.send('**У вас уже была роль ' + itemName + '. Мы вернули вам деньги**');}; message.guild.members.get(message.author.id).addRole(message.guild.roles.find("name", itemName));}
                else if (itemName === 'Watcher') {if (message.member.roles.some(r=>[watcher].includes(r.id))) {economy.updateBalance(message.author.id + message.guild.id, '700'); message.channel.send('**У вас уже была роль ' + itemName + '. Мы вернули вам деньги**');}; message.guild.members.get(message.author.id).addRole(message.guild.roles.find("name", itemName));}
                else if (itemName === 'Epic') {if (message.member.roles.some(r=>[epic].includes(r.id))) {economy.updateBalance(message.author.id + message.guild.id, '1500'); message.channel.send('**У вас уже была роль ' + itemName + '. Мы вернули вам деньги**');}; message.guild.members.get(message.author.id).addRole(message.guild.roles.find("name", itemName));}
                else if (itemName === 'Ultra Sphere') message.channel.send('**Поздравляем с покупкой самого загадочного предмета в магазине :tada:. ');
                else if (itemName === 'Красный') message.guild.members.get(message.author.id).addRole(message.guild.roles.find("name", itemName));
                else if (itemName === 'Оранжевый') message.guild.members.get(message.author.id).addRole(message.guild.roles.find("name", itemName));
                else if (itemName === 'Желтый') message.guild.members.get(message.author.id).addRole(message.guild.roles.find("name", itemName));
                else if (itemName === 'Зеленый') message.guild.members.get(message.author.id).addRole(message.guild.roles.find("name", itemName));
                else if (itemName === 'Светло-синий') message.guild.members.get(message.author.id).addRole(message.guild.roles.find("name", itemName));
                else if (itemName === 'Синий') message.guild.members.get(message.author.id).addRole(message.guild.roles.find("name", itemName));
                else if (itemName === 'Фиолетовый') message.guild.members.get(message.author.id).addRole(message.guild.roles.find("name", itemName));
                else if (itemName === 'Кроваво-красный') message.guild.members.get(message.author.id).addRole(message.guild.roles.find("name", itemName));
                else if (itemName === 'Токсичный') message.guild.members.get(message.author.id).addRole(message.guild.roles.find("name", itemName));
                else if (itemName === 'Лавовый') message.guild.members.get(message.author.id).addRole(message.guild.roles.find("name", itemName));
                else if (itemName === 'Аква') message.guild.members.get(message.author.id).addRole(message.guild.roles.find("name", itemName));
                else if (itemName === 'Ярко-розовый') message.guild.members.get(message.author.id).addRole(message.guild.roles.find("name", itemName));
            })
        })
    }
})
client.on('message', message => { //Событие message
    if (!['437290658458501143', '457541720494571533', '469874212505649153', '424522262855811074'].includes(message.guild.id)) {
        message.guild.leave().catch();
        return;
    }
    if(message.channel.type !== 'text') return;
    if(message.channel.id === '469504020323631115') return;
    if (message.author.bot) return;
    let arr = [];
    message.guild.fetchInvites().then(invites => {
    invites.forEach(invite => {
        arr.push(invite.code); 
    })
    let matches = message.content.match(/discord(app\.com|\.gg|\.me|\.io)\/?(invite\/)?([_a-zA-Z0-9]{5,32})/gi);
    if (matches)
    matches.forEach((match) => {
    if (!arr.includes(match.match(/discord(app\.com|\.gg|\.me|\.io)\/?(invite\/)?([_a-zA-Z0-9]{5,32})/i)[3])) {
        const embed = new Discord.RichEmbed()
            .setTitle("Информация о предупреждениях")
            .setColor("af00ff")
            .setDescription('Вы были **предупреждены**' + '.\n\nПричина:** Пиар.**\n\nНе ведите себя плохо!')
            .setFooter(bot_name + " | " + version + " | Все права защищены")
            .setTimestamp();
        message.author.send({embed});
        message.channel.send(message.author + ' был предупрежден. Причина: пиар.');
        message.delete();
    }
    })
    });
    if(message.content.indexOf(prefix) !== 0) return;
    const poll = message.content.slice(prefix.length).trim().split(/;+/g);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    function sendMsg (msg) {
        message.channel.send(msg)
    }
    function replMsg (msg) {
        message.reply(msg)
    }
    if ('guilds'.includes(command)) {
        message.channel.send('Я присутствую на **' + client.guilds.size + '** гильдиях');
    }
    if ('rainbow'.includes(command)) {
        message.channel.send('Готово :white_check_mark:');
        let colors = ["#ff0000", "#ffa500", "#ffff00", "#00ff00", "#00BFFF", "#0000FF", "#ff00ff"];
        let role = message.guild.roles.find("name", "Rainbow");
        async function color (colors, role) {
            forEachTimeout(colors, (color) => {role.setColor(color)}, 1500).then(() => color(colors, role));
        }
        color(colors, role);
    }
    if(['update'].includes(command)) {
        const embed = new Discord.RichEmbed()
            .setTitle("Обновления")
            .setColor("af00ff")
            .setDescription(update)
            .setFooter(bot_name + " | " + version + " | Все права защищены | При нахождении бага кидайте скрин [Ï₸]\🔥𝓐𝓝𝓓𝓡𝓔𝓨\🔥#8389 в личное сообщение")
            .setTimestamp();
        message.channel.send({embed});
    }
    if (['8ball', 'ball', '8'].includes(command)) {
        let numOfAnswer = randomInteger(1, 11);
        if (!args[0]) {
            message.reply('Ошибка. Причина: **Не указан аргумент**\n\nПравильное использование:\n=8ball `<вопрос>`'); 
            return;
        }
        if (numOfAnswer === 1) message.reply('Без сомннения!');
        else if (numOfAnswer === 2) message.reply('Да, конечно');
        else if (numOfAnswer === 3) message.reply('Да');
        else if (numOfAnswer === 4) message.reply('В принципе да');
        else if (numOfAnswer === 5) message.reply('Возможно');
        else if (numOfAnswer === 6) message.reply('Абсолютно нет!');
        else if (numOfAnswer === 7) message.reply('Никак нет');
        else if (numOfAnswer === 8) message.reply('Нет');
        else if (numOfAnswer === 9) message.reply('Неа');
        else if (numOfAnswer === 10) message.reply('Cомневаюсь');
        else message.reply('Спроси позднее, я не знаю');
    }
    if (['ship', 'love', 'шип'].includes(command)) {
        if (!args[0]) args[0] = message.guild.members.random();
        if (!args[1]) args[1] = message.author
        if (args[0].length > 30 || args[1].length > 30) return message.reply('Ошибка. Причина: **Аргумент не может быть длиннее 30 символов**');
        let loveText
        let shkala
        let percents = randomInteger(0, 100)
        if (percents <= 99) {loveText = 'Невероятно!!! :heart_eyes:'; shkala = '■■■■■■■■■□'; }
        if (percents <= 89) {loveText = 'Превосходно! :heartpulse:'; shkala = '■■■■■■■■□□';}
        if (percents <= 79) {loveText = 'Ууу ( ͡° ͜ʖ ͡°)'; shkala = '■■■■■■■□□□';}
        if (percents <= 69) {loveText = 'Дружески :+1:'; shkala = '■■■■■■□□□□';}
        if (percents <= 59) {loveText = 'Неплохо :confused:'; shkala = '■■■■■□□□□□';}
        if (percents <= 49) {loveText = 'Средне :thinking:'; shkala = '■■■■□□□□□□';}
        if (percents <= 49) {loveText = 'Плохо :frowning2:'; shkala = '■■■□□□□□□□';}
        if (percents <= 29) {loveText = 'Очень плохо :disappointed_relieved:'; shkala = '■■□□□□□□□□';}
        if (percents <= 19) {loveText = 'Ужасно :sob:'; shkala = '■□□□□□□□□□';}
        if (percents <= 9) {loveText = 'Хуже некуда :poop:'; shkala = '□□□□□□□□□□';}
        if (percents >= 100) {loveText = 'ИДЕАЛЬНО!!! :heart_exclamation:'; shkala = '■■■■■■■■■■'; percents = 100;}
        const embed = new Discord.RichEmbed()
            .setTitle(":heart:МАТЧМЕЙКИНГ:heart:")
            .setColor("ff00b0")
            .setDescription('▼***' + args[0] + '***\n▲***' + args[1] + '***\n\n:revolving_hearts:Любовь в проценатах: **' + percents + '%** `[' + shkala + ']`\n:revolving_hearts:' + '\n\nВердикт: **' + loveText + '**')
            .setFooter(bot_name + " | " + version + " | Все права защищены")
            .setTimestamp();
        message.channel.send({embed});
    }
    if (['скажи', 'say', 's'].includes(command)) {
        if (message.member.hasPermission("MANAGE_MESSAGES")) {
        const sayMessage = args.join(" ");
        message.delete().catch(O_o=>{});
        let msg = message.channel.send(sayMessage).catch(()=>{message.reply('Ошибка. **Причина: не указан текст сообщения**');
        });
    } else {
            message.channel.send(message.author + ', Ошибка. Причина: **Вы не можете использовать команду say, вы должны иметь право `Управлять сообщениями`**');
    }}
    if(['poll', 'vote'].includes(command)) {
        let question = args.join(' ').match(/(.*?);/g)[0].slice(0, -1);      
        if (message.member.hasPermission("MANAGE_MESSAGES")) {
        if (poll[6]) return replMsg('Ошибка. Причина: **Голосование нельзя делать более чем с 5-ти вариантами**')
        let msg = message.channel.send(':bar_chart: **' + question + '**').catch(()=>{message.reply('Ошибка. **Причина: не указан текст сообщения**')});
            let variants = ''
            for (let i = 1;i < poll.length;i++) {
                let emoji
                if (i === 1) emoji = module.exports[i]
                if (i === 2) emoji = module.exports[i]
                if (i === 3) emoji = module.exports[i]
                if (i === 4) emoji = module.exports[i]
                if (i === 5) emoji = module.exports[i]
                variants += emoji + ' — ' + poll[i] + '\n'
            }
            const embed = new Discord.RichEmbed()
            .setDescription(variants)
            .setColor("af00ff")
            .setFooter(footer)
            .setTimestamp();
            message.channel.send({embed}).then(msg => {
                for (let i = 1;i < poll.length;i++) {
                    let emoji
                    if (i === 1) emoji = module.exports[i]
                    if (i === 2) emoji = module.exports[i]
                    if (i === 3) emoji = module.exports[i]
                    if (i === 4) emoji = module.exports[i]
                    if (i === 5) emoji = module.exports[i]
                    setTimeout(() => {msg.react(emoji);}, 1000);
                }
            });
        } else message.channel.send(message.author + ', Ошибка. Причина: **Вы не можете использовать команду say, вы должны иметь право `Управлять сообщениями`**');
    }
    if (['idea', 'id'].includes(command)) {
        let idea = args.join(" ");
        message.guild.owner.send('Пользователь ' + message.author + ' отправил вам идею: ' + idea);
        message.channel.send('Идея была успешно отправлена :white_check_mark:');
    }
    if (['clear', 'delete', 'del', 'clr', 'сдк', 'вуд', 'сдуфк', 'вудуеу'].includes(command)) {
        async function clear() {
            if (message.member.roles.some(r=> [moder, owner].includes(r.id))) {
                if (isNaN(args[0]))
                    return message.reply('Ошибка. Причина: **Аргумент должен являться числом**');
                else if(args[0] < 2)
                    return message.reply('Ошибка. Причина: **Аргумент не может являться нулем или единицей**');
                else if (args[0] >= 100) args[0] = 99
                args[0] = args[0]++   
                const fetched = await message.channel.fetchMessages({limit: args[0] + 1});
                message.channel.bulkDelete(fetched);
                let messagesForm = declOfNum(args[0], ['сообщение', 'сообщения', 'сообщений']);
                message.channel.send("Было успешно удалено **" + args[0] + "** " + messagesForm)
                message.delete();
            } else {
                message.channel.send(message.author + ', Ошибка. Причина: **Вы не можете использовать команду clear, вы должны иметь роль Модератор**')
                return;
            }
        }
        clear();
    }
    if (['warn', 'варн', 'цфкт'].includes(command) && message.member.roles.some(r=>[moder, owner].includes(r.id))) {
        let user = message.mentions.members.first(); 
        if (!user) return message.channel.send(message.author + ', Ошибка. Причина: **Вы забыли упомянуть пользователя или вы хотите предупредить того, кто не является пользователем**');
        if (user.id == message.author.id) return message.channel.send('Зачем ты пытаешься сделать предупреждение самому себе?');
        if (message.member.hasPermission("ADMINISTRATOR")) {
        let reason = args.join(" ").replace(user, '')
        if (!reason) reason = ' Не указана'
        const embed = new Discord.RichEmbed()
                .setTitle("Информация о предупреждениях")
                .setColor("af00ff")
                .setDescription('Вы были **предупреждены** пользователем ' + message.author + '.\n\nПричина:**' + reason + '.**\n\nНе ведите себя плохо!')
                .setFooter(bot_name + " | " + version + " | Все права защищены")
                .setTimestamp();
                user.send({embed});
                message.channel.send('Пользователь ' + user + ' был предупрежден успешно');
        } else return message.channel.send(message.author + ', Ошибка. Причина: **Вы не можете использовать команду warn, т. к. у вас нет права `Администратор` **');        
    }
    if (['unmute', 'гтьгеу'].includes(command)) {
        if (message.member.hasPermission("ADMINISTRATOR")) {
        let user = message.mentions.members.first();
        if (!user) return message.channel.send(message.author + ', Ошибка. Причина: **Вы забыли упомянуть пользователя или хотите размутить того, кто не является пользователем**');
            let reason = args.join(" ").replace(user, '');
                user.removeRole(muted);
                message.channel.send(user + ' был размучен');
                if (!reason) reason = ' Не указана'
                const embed = new Discord.RichEmbed()
                    .setTitle("Информация о муте")
                    .setColor("af00ff")
                    .setDescription('Вы были **размучены** пользователем ' + message.author + '.\n\nПричина:**' + reason + '.**')
                    .setFooter(bot_name + " | " + version + " | Все права защищены")
                    .setTimestamp();
                user.send({embed});
        }
        else return message.channel.send(message.author + ', Ошибка. Причина: **Вы не можете использовать команду unmute, вы должны иметь роль Модератор**');
    }
    if (['ьгеу', 'mute', 'мут'].includes(command) && message.member.roles.some(r=>[moder, owner].includes(r.id))) {
        let user = message.mentions.members.first(); 
        if (message.member.hasPermission("ADMINISTRATOR")) {
        if (!user) return message.channel.send(message.author + ', Ошибка. Причина: **Вы забыли упомянуть пользователя или вы хотите замутить того, кто не является пользователем**');
        if (user.id == message.author.id) return message.channel.send('Зачем ты пытаешься замутить самого себя?');
        function getSeconds(str) {
            let seconds = 0;
            let years = str.match(/(\d+)\s*y/);
            let months = str.match(/(\d+)\s*M/);
            let weeks = str.match(/(\d+)\s*w/);
            let days = str.match(/(\d+)\s*d/);
            let hours = str.match(/(\d+)\s*h/);
            let minutes = str.match(/(\d+)\s*m/);
            let secs = str.match(/(\d+)\s*s/);
            if (years) { seconds += parseInt(years[1])*31556926; }
            if (months) { seconds += parseInt(months[1])*2592000; }
            if (weeks) { seconds += parseInt(weeks[1])*604800; }
            if (days) { seconds += parseInt(days[1])*86400; }
            if (hours) { seconds += parseInt(hours[1])*3600; }
            if (minutes) { seconds += parseInt(minutes[1])*60; }
            if (secs) { seconds += parseInt(secs[1]); }
            return seconds;
        }
    
        user.addRole(muted);
        message.channel.send(user + ' был успешно замучен');
    
        let reason = args.join(" ").replace(user, '');
        reason = reason.replace(args[1], '');
        reason = reason.replace(' ', '');
    
        if (!reason) { 
            reason = ' Не указана'
        }
        const embed = new Discord.RichEmbed()
                    .setTitle("Информация о муте")
                    .setColor("af00ff")
                    .setDescription('Вы были **замучены** пользователем ' + message.author + '\n\nВремя: **'+ args[1] + '.**\nПричина:**' + reason + '.**\n\nНе ведите себя плохо!')
                    .setFooter(bot_name + " | " + version + " | Все права защищены")
                    .setTimestamp();
                    user.send({embed});
    
     
        if (args[1] && getSeconds(args[1]) !== 0 )
    
        setBigTimeout(() => {
            if (message.member.roles.some(r=> [muted].includes(r.id))) {
            const embedAutoUnmute = new Discord.RichEmbed()
            .setTitle("Информация о муте")
            .setColor("af00ff")
            .setDescription('Вы были автоматически **размучены**.\n\nПричина: **Автоматический размут.**')
            .setFooter(bot_name + " | " + version + " | Все права защищены")
            .setTimestamp();
            user.send({embed: embedAutoUnmute});
            user.removeRole(muted);
            message.channel.send(user + ' был размучен');
            } else return
            }, getSeconds(args[1])*1000);
            } else return message.channel.send(message.author + ', Ошибка. Причина: **Вы не можете использовать команду mute, вы должны иметь право `Администратор`**');
        }
        if (['kick', 'кик', 'лшсл'].includes(command)) {            
            if (message.member.hasPermission("ADMINISTRATOR")) {
            let user = message.mentions.members.first(); 
            if (!user) return message.reply('Ошибка. Причина: **Вы забыли упомянуть пользователя или вы хотите кикнуть того, кто не является пользователем**');
            let reason = args.join(" ").replace(user, '');
            if (user === message.author) return message.reply('Ошибка. Причина: **КИКАТЬ САМОГО СЕБЯ ЭТО ТУПО!**');
            if(user.hasPermission("ADMINISTRATOR")) return message.reply('Ошибка. Причина: **Вы не можете кикнуть этого пользователя, т. к. у него есть право `Администратор`**');
            if (!reason || reason === ' ') return message.reply('Ошибка. Причина: **Кикать без причины нельзя**')
                const embed = new Discord.RichEmbed()
                    .setTitle('Информация о кике')
                    .setColor("af00ff")
                    .setDescription('Вы были **кикнуты** пользователем ' + message.author + '.\n\nПричина:**' + reason + '.**\n\nНе ведите себя плохо!')
                    .setFooter(bot_name + " | " + version + " | Все права защищены")
                    .setTimestamp();
                user.send({embed})
                message.guild.member(user).kick(reason);
                message.channel.send(user + ' Был кикнут успешно. Жалко пацана');
            } else {
                message.reply('Ошибка. Причина: **Вы не можете использовать команду kick, вы должны иметь роль Модератор');
                return
            }
        }
        if (['ban', 'бан', 'ифт'].includes(command)) {
            if (message.member.roles.some(r=> [moder, owner].includes(r.id))) {
            let user = message.mentions.members.first(); 
            if (!user) {
                message.reply('Ошибка. Причина: **Вы забыли упомянуть пользователя или вы хотите забанить того, кто не является пользователем**');
                return
            }
            if (user === message.author) {
                message.reply('Ошибка. Причина: **БАНИТЬ САМОГО СЕБЯ ЭТО ТУПО!**');
                return
            }
            if(user.hasPermission("ADMINISTRATOR")) return message.reply('Ошибка. Причина: **Вы не можете забанить этого пользователя, т. к. у него есть право `Администратор`**');
    
            let reason = args.join(" ").replace(user, '');
            if (!reason || reason === ' ') return message.reply('Ошибка. Причина: **Банить без причины нельзя**')
            reason = reason.replace(args[1], '');
            reason = reason.replace(' ', '');
                const embed = new Discord.RichEmbed()
                    .setTitle('Информация о бане')
                    .setColor("af00ff")
                    .setDescription('Вы были **забанены** пользователем ' + message.author + '.\n\nВремя: **' + args[1] + '**.\n\nПричина:**' + reason + '.**\n\nНе надо было вести себя плохо!')
                    .setFooter(bot_name + " | " + version + " | Все права защищены")
                    .setTimestamp();
                user.send({embed})
                message.channel.send(user + 'Был успешно забанен. Жалко пацана');
                message.guild.member(user).ban(reason);
            } else {
                message.reply('Ошибка. Причина: **Вы не можете использовать команду ban, вы должны иметь право `Администратор`**');
                return
            }
        }
        if(['send'].includes(command)) {
            let user = message.mentions.members.first();
            if (message.member.hasPermission("MANAGE_MESSAGES")) {
                if (!user) {
                    message.delete
                    message.reply('Ошибка. Причина: **Не указан получатель сообщения**');
                    return
                }
                const sendMessage = args.join(" ");
                let msg = user.send(sendMessage.replace(user, '')).catch(()=>{message.reply('Ошибка. Причина: **Не указано сообщение**');
                })
                message.delete().catch(O_o=>{});
            } else {
                message.channel.send(message.author + ', Ошибка. Причина: **Вы не можете использовать команду send, вы должны иметь право `Управлять сообщениями`**');
            }
        }
    
        if(['sms'].includes(command)) {
            let user = message.mentions.members.first();
            if (message.member.hasPermission("MANAGE_MESSAGES")) {
                if (!user) {
                    message.delete
                    message.reply('Ошибка. Причина: **Не указан получатель сообщения**');
                    return
                }
                const sendMessage = args.join(" ");
                let msg = user.send('**Вам пришло сообщение от ' + message.author + '. Он сказал:**' + sendMessage.replace(user, '')).catch(()=>{message.reply('Ошибка. Причина: **Не указано сообщение**');
                })
                message.delete().catch(O_o=>{});
            } else {
                message.channel.send(message.author + ', Ошибка. Причина: **Вы не можете использовать команду send, вы должны иметь право `Управлять сообщениями`**');
            }
        }
        if (['скажи', 'say', 's'].includes(command)) {
            if (message.member.hasPermission("MANAGE_MESSAGES")) {
            const sayMessage = args.join(" ");
            message.delete().catch(O_o=>{});
            let msg = message.channel.send(sayMessage).catch(()=>{message.reply('Ошибка. **Причина: не указан текст сообщения**');
            });
            } else return message.channel.send(message.author + ', Ошибка. Причина: **Вы не можете использовать команду say, вы должны иметь право `Управлять сообщениями`**');
        }
        if(['av', 'avatar', 'ав', 'аватар', 'ava', 'a', 'ава', 'а'].includes(command)) {
            let user = message.mentions.members.first();
            if (!user) user = message.member;
            let av = new Discord.RichEmbed()
                .setImage(user.user.avatarURL)
                .setDescription("**Аватар пользователя **" + user + "\n" + "Представлено по запросу " + message.author)
                .setColor("af00ff")
                .setFooter(bot_name + " | " + version + " | Все права защищены")
                .setTimestamp();
        if (['random', 'r'].includes(command)) {
            message.channel.send({embed: av});
            message.delete();
        }
        
            if (!args[0]) message.reply('Ошибка. Причина: **Вы забыли указать первый аргумент**'); return;
    
            if (!args[1]) args[1] = 1;
    
            let rand = randomInteger(args[0], args[1]);
            const embed = new Discord.RichEmbed()
                .setTitle("Информация")
                .setColor("af00ff")
                .setDescription('Вам выпало число ' + rand)
                .setFooter(bot_name + " | " + version + " | Все права защищены")
                .setTimestamp();
            message.channel.send({embed});
        }
        if (['help', 'h', 'помощь', 'помоги'].includes(command)) {
            const embed = new Discord.RichEmbed()
                .setColor("af00ff")
                .setTitle('Помощь')
                .setDescription('Мои команды делятся на 3 типа:\n\n***1 — Стандартные\n2 — Экономика\n3 — Музыкальные***\n\nНапишите цифру внизу')
                .setFooter(footer)
                .setTimestamp();
            message.channel.send({embed}).then(() => {
                const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 60000 });
                collector.on('collect', msg => {
                    collector.stop();
                    if (msg.content === '1') {
                        const embed = new Discord.RichEmbed()
                        .setTitle("Помощь")
                        .setColor("af00ff")
                        .setDescription('`<...>` - Обязательный параметр\n`[...]` - Необязательный параметр\n\n**Команды доступные всем:**\n' + prefix + 'rank `[пользователь]` - Узнать опыт пользователя\n' + prefix + '8ball `<вопрос>` - Задать вопрос Шару Судьбы\n' + prefix + 'avatar `[пользователь]` - Украсть аватар любого пользователя\n' + prefix + 'poll `<вопрос;вариант 1;вариант 2; и т. д.>` - Голосование\n' + prefix + 'random `<число>` `[число]` - Генератор случайных чисел\n'+ prefix + 'rsp `<камень | ножницы | бумага>` - Поиграть в игру "Камень, ножницы, бумага"\n' + prefix + 'ship `[слово]` `[слово]` - Шипперинг\n\n**Команды доступные не всем:**\n' + prefix + 'mute `<пользователь>` `<время>` `[причина]` - Мут\n' + prefix + 'unmute `<пользователь>` `[причина]` - Размут\n' + prefix + 'warn `<пользователь>` `[причина]` - Варн\n' + prefix + 'kick `<пользователь>` `<причина>` - Кик\n' + prefix + 'ban `<пользователь>` `<причина>` - Бан\n'+ prefix + 'clear `<количество>` - Очистить сообщения\n' + prefix + 'rainbow - Перезапустить радужную роль\n' + prefix + 'say `<сообщение>` - Сказать от имени бота\n' + prefix + 'send `<пользователь>` `<сообщение>` - Отправить в лс сообщение пользователю от имени бота\n' + prefix + 'sms `<пользователь>` `<сообщение>` - Отправить в лс сообщение пользователю от имени бота, но с указанным автором сообщения\n' + prefix + 'xp-reset `<пользователь>` - Сбросит опыт пользователя\n')
                        .setFooter(bot_name + " | " + version + " | Все права защищены")
                        .setTimestamp();
                    message.channel.send({embed});
                    }
                    if (msg.content === '2') {
                        const embed = new Discord.RichEmbed()
                        .setTitle("Помощь по экономике")
                        .setColor("af00ff")
                        .setDescription('`<...>` - Обязательный параметр\n`[...]` - Необязательный параметр\n\n**Команды доступные всем:**\n' + prefix + 'money `[пользователь]` - Узнать баланс\n' + prefix + 'shop `[2]` - Магазин\n' + prefix + 'buy `<предмет>` - Купить предмет из магазина\n\n**Команды доступные не всем:**\n' + prefix + 'add-money `<пользователь>` `<количество>` - Добавить деньги\n' + prefix + 'remove-money `<пользователь>` `<количество>` - Списать деньги\n' + prefix + 'money-reset `<пользователь>` - Сбросить деньги пользователя\n')
                        .setFooter(bot_name + " | " + version + " | Все права защищены")
                        .setTimestamp();
                    message.channel.send({embed});
                    }
                    if (msg.content === '3') {
                        const embed = new Discord.RichEmbed()
                        .setTitle("Помощь")
                        .setColor("af00ff")
                        .setDescription('Музыкальные команды в разработке')
                        .setFooter(bot_name + " | " + version + " | Все права защищены")
                        .setTimestamp();
                    message.channel.send({embed});
                    }
                });
            })
        }
});
client.login(
    process.env.BOT_TOKEN
    //''
);