const Discord = require("discord.js");
const config = require("./config.json");
const bot = new Discord.Client()
const prefix = config.prefix; 

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!`)
    bot.user.setActivity("Inspiration Core")
    bot.channels.get('521106261844951050').send('**I am awake! :smile:**');
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let errorIcon = ":small_orange_diamond:"
    let messageArray = message.content.split(' ');
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(cmd === `${prefix}hello`) {
        message.reply('Hello!')
    };
    if(cmd === `${prefix}botinfo`) {
        let binfo = new Discord.RichEmbed()
        .setDescription('Bot Information')
        .setColor('#4286f4')
        .setTitle('InspireBot Info')
        .setThumbnail("https://cdn.discordapp.com/attachments/308353972400291850/512727018236805120/Buildy_Logo.png")
        .addField('Name', bot.user.username)
        .addField('Owner', 'Buildy#3302')
        .addField('Created', bot.user.createdAt)
        .setFooter('Info my change overtime.');
        return message.author.send(rinfo);
    };
    if(cmd === `${prefix}serverinfo`) {
        let sinfo = new Discord.RichEmbed()
        .setDescription('Server Information')
        .setColor('#4286f4')
        .setTitle(message.guild.name)
        .setThumbnail(message.guild.iconURL)
        .addField('Members', `${message.guild.memberCount} Members`)
        .addField('Date Created', message.guild.createdAt);
        return message.author.send(sinfo);
    };
    if(cmd === `${prefix}report`) {
        let user = message.guild.member(message.mentions.members.first())
        if (!user) return message.reply(`${errorIcon} User not found.`)
        let reasoon = args.join(' ').slice(22)
        let report = new Discord.RichEmbed()
        .setTitle('Member Report Ticket')
        .setThumbnail('https://cdn4.iconfinder.com/data/icons/web-ui-color/128/Close-512.png')
        .addField('User:', user)
        .addField('Reason:', reasoon)
        .addField('Reported By:', message.author.username);
        return bot.channels.get('514326232830312449').send(report)
    }
    if(cmd === `${prefix}warn`) {
        let user = message.guild.member(message.mentions.members.first())
        if (!user) return message.reply(`${errorIcon} User not found.`)
        if (!message.member.roles.has(message.guild.roles.find(r => r.name === "Discord Moderator").id)) return message.reply(`${errorIcon} Dont think I can let you do that`)
        let reasoon = args.join(' ').slice(22)
        let report = new Discord.RichEmbed()
        .setTitle(`${user} has been warned`)
        .setThumbnail('https://cdn4.iconfinder.com/data/icons/web-ui-color/128/Close-512.png')
        .addField('User:', user)
        .addField('Reason:', reasoon)
        .addField('Action Taken', 'Warning')
        .addField('By:', message.author.username);
        
        bot.channels.get('514326232830312449').send(report);
        let warning = new Discord.RichEmbed()
        .setTitle('Warning')
        .addField('Reason', reasoon)
        .addField("Server", message.guild.name)
        .setThumbnail('https://cdn4.iconfinder.com/data/icons/web-ui-color/128/Close-512.png')
        .setFooter('Take some time to think about why you have recieved this warning.')
        user.send(warning);
    } 
    if(cmd === `${prefix}clear`) {
        if (!message.member.roles.has(message.guild.roles.find(r => r.name === "Discord Moderator").id)) return message.reply(`${errorIcon} Dont think I can let you do that`)
        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send(`${args[0]} messages removed.`).then(message => message.delete(5000))
        });
    }
    if(cmd === `${prefix}minipurge`) {
         if (!message.member.roles.has(message.guild.roles.find(r => r.name === "Discord Moderator").id)) return message.reply(`${errorIcon} Dont think I can let you do that`)
        message.channel.bulkDelete(100).then(() => {
            message.channel.send(`HAHAHA :sunglasses:`).then(message => message.delete(5000))
        });
    }
    if (cmd === `${prefix}kick`) {
        let user = message.guild.member(message.mentions.members.first())
        if (!user) return message.reply(`${errorIcon} User not found.`)
        if (!message.member.roles.has(message.guild.roles.find(r => r.name === "Discord Moderator").id)) return message.reply(`${errorIcon} Dont think I can let you do that`)
        let reasoon = args.join(' ').slice(22)
        message.guild.member(user).kick(reasoon)
        let report = new Discord.RichEmbed()
        .setTitle(`${user} has been kicked.`)
        .setThumbnail('https://cdn4.iconfinder.com/data/icons/web-ui-color/128/Close-512.png')
        .addField('User:', user)
        .addField('Reason:', reasoon)
        .addField('Action Taken', 'Kick')
        .addField('By:', message.author.username);

        bot.channels.get('514326232830312449').send(report);
        let kickwrn = new Discord.RichEmbed()
        .setTitle('Kicked')
        .addField('Reason', reasoon)
        .addField("Server", message.guild.name)
        .setThumbnail('https://cdn4.iconfinder.com/data/icons/web-ui-color/128/Close-512.png')
        .setFooter('Take some time to think about why you have kicked.')
        user.send(kickwrn);
    }
    if (cmd === `${prefix}ban`) {
        let user = message.guild.member(message.mentions.members.first())
        if (!user) return message.reply(`${errorIcon} User not found.`)
        if (!message.member.roles.has(message.guild.roles.find(r => r.name === "Discord Moderator").id)) return message.reply(`${errorIcon} Dont think I can let you do that`)
        let reasoon = args.join(' ').slice(22)
        message.guild.member(user).ban(reasoon)
        let report = new Discord.RichEmbed()
        .setTitle(`${user} has been kicked.`)
        .setThumbnail('https://cdn4.iconfinder.com/data/icons/web-ui-color/128/Close-512.png')
        .addField('User:', user)
        .addField('Reason:', reasoon)
        .addField('Action Taken', 'Ban')
        .addField('By:', message.author.username);

        bot.channels.get('514326232830312449').send(report);
        let banwarn = new Discord.RichEmbed()
        .setTitle('Banned')
        .addField('Reason', reasoon)
        .addField("Server", message.guild.name)
        .setThumbnail('https://cdn4.iconfinder.com/data/icons/web-ui-color/128/Close-512.png')
        .setFooter('Take some time to think about why you have banned.')
        user.send(banwarn);
    }
});

bot.login(process.env.BOT_TOKEN);
