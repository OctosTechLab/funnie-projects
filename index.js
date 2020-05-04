const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const fs = require("fs");

const client = new discord.Client();
// bot.commands = new discord.Collection();
client.commands = new discord.Collection();
client.login(botConfig.token);


fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("Kon geen files vinden");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`De file ${f} is geladen`);

        // bot.commands.set(fileGet.help.name, fileGet);
        client.commands.set(fileGet.help.name, fileGet);

    })

});

client.on("ready", async () => {

    console.log(`${client.user.username} is online!`);
    client.user.setActivity("Twitch", { type: "WOTSING" });

});

client.on("message", async message => {

    if (message.author.bot) return;

    if (message.channel.type == "dm") return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var arguments = messageArray.slice(1);


    // var commands = bot.commands.get(command.slice(prefix.length));
    var commands = client.commands.get(command.slice(prefix.length));

    // if (commands) commands.run(bot, message, arguments);
    if (commands) commands.run(client, message, arguments);

    // if (command === `${prefix}hallo`) {
    //     return message.channel.send("Hallo!");
    // }

    // if (command === `${prefix}info`) {

    //     var botEmbed = new discord.MessageEmbed()
    //         .setTitle("Bot info")
    //         .setDescription("Discord bot info")
    //         .setColor("#0099ff")
    //         // .addFields(
    //         //     { name: "test", value: "testss" },
    //         //     { name: "Gemaakt op: ", value: bot.user.createAt },
    //         //     { name: "test", value: "testss" }
    //         // )
    //         .addField("Bot naam", client.user.username)
    //         .setThumbnail("https://i.imgur.com/iSri5wI.jpg?1")
    //         .setImage("https://i.imgur.com/iSri5wI.jpg?1")
    //         .setFooter("Footer tekst", "https://i.imgur.com/iSri5wI.jpg?1")
    //         .setTimestamp();



    //     return message.channel.send(botEmbed);
    // }

    // if (command === `${prefix}serverinfo`) {

    //     var botEmbed = new discord.MessageEmbed()
    //         .setTitle("Queen Zone info")
    //         .setDescription("Heb het gezellig")
    //         .setColor("#0099ff")
    //         .addFields(
    //             { name: "bot naam", value: client.user.username },
    //             { name: "Je ben de server gejoind op: ", value: message.member.joinedAt },
    //             { name: "Totaal members", value: message.guild.memberCount }
    //         );

    //     return message.channel.send(botEmbed);
    // }

    // if (command === `${prefix}kick`) {

    //     // !kick @spelerNaam redenen,

    //     var args = message.content.slice(prefix.length).split(/ +/);

    //     if (!message.member.hasPermission("KICK_MEMDER")) return message.reply("Sorry niet voor jou");

    //     if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("Geen perms");

    //     if (!args[1]) return message.reply("Geen gebruiker opgegeven");

    //     if (!args[2]) return message.reply("Geen redenen opgegeven");

    //     var kickUser = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[1]));

    //     var reason = args.slice(2).join(" ");

    //     if (!kickUser) return message.reply("Gebuiker niet gevonden");

    //     var embedPrompt = new discord.MessageEmbed()
    //         .setColor("GREEN")
    //         .setTitle("Binnen 30 sec reageren")
    //         .setDescription(`Wil je ${kickUser} kicken?`);

    //     var embed = new discord.MessageEmbed()
    //         .setColor("#ff0000")
    //         // .setThumbnail("")
    //         .setFooter(message.member.displayName)
    //         .setTimestamp()
    //         .setDescription(`**Gekickt: ** ${kickUser} (${kickUser.id})
    //         **Gekickt door** ${message.author}
    //         **Redenen: ** ${reason}`);

    //     message.channel.send(embedPrompt).then(async msg => {

    //         var emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

    //         if (emoji === "✅") {

    //             msg.delete();

    //             kickUser.kick(reason).catch(err => {
    //                 if (err) return message.reply("Er ging iets foud");
    //             });

    //             message.channel.send(embed);

    //         } else if (emoji === "❌") {

    //             msg.delete();

    //             return message.reply("Kick geanuleerd").then(m => m.delete(5000));

    //         }

    //     })

    // }

    // if (command === `${prefix}ban`) {

    //     // !ban @spelerNaam redenen,

    //     var args = message.content.slice(prefix.length).split(/ +/);

    //     if (!message.member.hasPermission("BEN_MEMDER")) return message.reply("Sorry niet voor jou");

    //     if (!message.guild.me.hasPermission("BEN_MEMBERS")) return message.reply("Geen perms");

    //     if (!args[1]) return message.reply("Geen gebruiker opgegeven");

    //     if (!args[2]) return message.reply("Geen redenen opgegeven");

    //     var benUser = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[1]));

    //     var reason = args.slice(2).join(" ");

    //     if (!BankUser) return message.reply("Gebuiker niet gevonden");

    //     var embedPrompt = new discord.MessageEmbed()
    //         .setColor("GREEN")
    //         .setTitle("Binnen 30 sec reageren")
    //         .setDescription(`Wil je ${BanUser} Banen?`);

    //     var embed = new discord.MessageEmbed()
    //         .setColor("#ff0000")
    //         // .setThumbnail("")
    //         .setFooter(message.member.displayName)
    //         .setTimestamp()
    //         .setDescription(`**Verbannen: ** ${BanUser} (${BanUser.id})
    //         **Geband door** ${message.author}
    //         **Redenen: ** ${reason}`);

    //     message.channel.send(embedPrompt).then(async msg => {

    //         var emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

    //         if (emoji === "✅") {

    //             msg.delete();

    //             BanUser.Ban(reason).catch(err => {
    //                 if (err) return message.reply("Er ging iets foud");
    //             });

    //             message.channel.send(embed);

    //         } else if (emoji === "❌") {

    //             msg.delete();

    //             return message.reply("Ban geanuleerd").then(m => m.delete(5000));

    //         }

    //     })

    // }

});


async function promptMessage(message, author, time, reactions) {

    time *= 1000;

    for (const reaction of reactions) {
        await message.react(reaction);
    }

    var filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;

    return message.awaitReactions(filter, { max: 1, time: time }).then(collected => collected.first() && collected.first().emoji.name);

}


// node index.js
// npm start



// !↪ Node.js:              https://nodejs.org/en/
// !↪ Discord.js:           https://discord.js.org/#/
// !↪ Visual studio code:   https://code.visualstudio.com/
// !↪ Discord Dev Portal:   https://discordapp.com/developers/applications/706669194892017715/information
// !↪ Authorize van bot:    https://discordapp.com/oauth2/authorize?client_id=Client_id&scope=bot
// !↪ Code:                 https://pastebin.com/C3nMvaeE
// !↪``



// ! WieskeRosa-patch-1





// !  <<<========================================================================================================================>>>
// ! <<<<========================================================================================================================>>>>
// !<<<<<========================================================================================================================>>>>>
// ! <<<<========================================================================================================================>>>>
// !  <<<========================================================================================================================>>>

// const discord = require("discord.js");
// const botConfig = require("./botconfig.json");

// const client = new discord.Client();
// client.login(botConfig.token);

// client.on("ready", async () => {

//     console.log(`${client.user.username} is online!`);
//     client.user.setActivity("Twitch", { type: "WOTSING" });

// });

// client.on("message", async message => {

//     if (message.author.bot) return;

//     if (message.channel.type == "dm") return;

//     var prefix = botConfig.prefix;

//     var messageArray = message.content.split(" ");

//     var command = messageArray[0];

//     if (command === `${prefix}hallo`) {
//         return message.channel.send("Hallo!");
//     }

//     if (command === `${prefix}info`) {

//         var botEmbed = new discord.MessageEmbed()
//             .setTitle("Bot info")
//             .setDescription("Discord bot info")
//             .setColor("#0099ff")
//             // .addFields(
//             //     { name: "test", value: "testss" },
//             //     { name: "Gemaakt op: ", value: bot.user.createAt },
//             //     { name: "test", value: "testss" }
//             // )
//             .addField("Bot naam", client.user.username)
//             .setThumbnail("https://i.imgur.com/iSri5wI.jpg?1")
//             .setImage("https://i.imgur.com/iSri5wI.jpg?1")
//             .setFooter("Footer tekst", "https://i.imgur.com/iSri5wI.jpg?1")
//             .setTimestamp();



//         return message.channel.send(botEmbed);
//     }

//     if (command === `${prefix}serverinfo`) {

//         var botEmbed = new discord.MessageEmbed()
//             .setTitle("Queen Zone info")
//             .setDescription("Heb het gezellig")
//             .setColor("#0099ff")
//             .addFields(
//                 { name: "bot naam", value: client.user.username },
//                 { name: "Je ben de server gejoind op: ", value: message.member.joinedAt },
//                 { name: "Totaal members", value: message.guild.memberCount }
//             );

//         return message.channel.send(botEmbed);
//     }

//     if (command === `${prefix}kick`) {

//         // !kick @spelerNaam redenen,

//         var args = message.content.slice(prefix.length).split(/ +/);

//         if (!message.member.hasPermission("KICK_MEMDER")) return message.reply("Sorry niet voor jou");

//         if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("Geen perms");

//         if (!args[1]) return message.reply("Geen gebruiker opgegeven");

//         if (!args[2]) return message.reply("Geen redenen opgegeven");

//         var kickUser = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[1]));

//         var reason = args.slice(2).join(" ");

//         if (!kickUser) return message.reply("Gebuiker niet gevonden");

//         var embedPrompt = new discord.MessageEmbed()
//             .setColor("GREEN")
//             .setTitle("Binnen 30 sec reageren")
//             .setDescription(`Wil je ${kickUser} kicken?`);

//         var embed = new discord.MessageEmbed()
//             .setColor("#ff0000")
//             // .setThumbnail("")
//             .setFooter(message.member.displayName)
//             .setTimestamp()
//             .setDescription(`**Gekickt: ** ${kickUser} (${kickUser.id})
//             **Gekickt door** ${message.author}
//             **Redenen: ** ${reason}`);

//         message.channel.send(embedPrompt).then(async msg => {

//             var emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

//             if (emoji === "✅") {

//                 msg.delete();

//                 kickUser.kick(reason).catch(err => {
//                     if (err) return message.reply("Er ging iets foud");
//                 });

//                 message.channel.send(embed);

//             } else if (emoji === "❌") {

//                 msg.delete();

//                 return message.reply("Kick geanuleerd").then(m => m.delete(5000));

//             }

//         })

//     }

//     if (command === `${prefix}ban`) {

//         // !ban @spelerNaam redenen,

//         var args = message.content.slice(prefix.length).split(/ +/);

//         if (!message.member.hasPermission("BEN_MEMDER")) return message.reply("Sorry niet voor jou");

//         if (!message.guild.me.hasPermission("BEN_MEMBERS")) return message.reply("Geen perms");

//         if (!args[1]) return message.reply("Geen gebruiker opgegeven");

//         if (!args[2]) return message.reply("Geen redenen opgegeven");

//         var benUser = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[1]));

//         var reason = args.slice(2).join(" ");

//         if (!BankUser) return message.reply("Gebuiker niet gevonden");

//         var embedPrompt = new discord.MessageEmbed()
//             .setColor("GREEN")
//             .setTitle("Binnen 30 sec reageren")
//             .setDescription(`Wil je ${BanUser} Banen?`);

//         var embed = new discord.MessageEmbed()
//             .setColor("#ff0000")
//             // .setThumbnail("")
//             .setFooter(message.member.displayName)
//             .setTimestamp()
//             .setDescription(`**Verbannen: ** ${BanUser} (${BanUser.id})
//             **Geband door** ${message.author}
//             **Redenen: ** ${reason}`);

//         message.channel.send(embedPrompt).then(async msg => {

//             var emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

//             if (emoji === "✅") {

//                 msg.delete();

//                 BanUser.Ban(reason).catch(err => {
//                     if (err) return message.reply("Er ging iets foud");
//                 });

//                 message.channel.send(embed);

//             } else if (emoji === "❌") {

//                 msg.delete();

//                 return message.reply("Ban geanuleerd").then(m => m.delete(5000));

//             }

//         })

//     }

// });


// async function promptMessage(message, author, time, reactions) {

//     time *= 1000;

//     for (const reaction of reactions) {
//         await message.react(reaction);
//     }

//     var filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;

//     return message.awaitReactions(filter, { max: 1, time: time }).then(collected => collected.first() && collected.first().emoji.name);

// }


// // node index.js
// // npm start