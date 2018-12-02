const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

    //_warn @player <reason>
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("당신은 권한이 없습니다!");
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])    
    if(!wUser) return message.reply("유저를 찾을수 없습니다!");
    let reason = args.join(" ").slice(22);

    if(!warns[wUser.id]) warns[wUser.id] = {
        warns: 0
    };

    warns[wUser.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err);
    });

    let warnEmbed = new Discord.RichEmbed()
    .setDescription("경고")
    .setAuthor(message.author.username)
    .setColor("#ff0000")
    .addField("유저", `<@${wUser.id}>`)
    .addField("경고받은 채널", message.channel)
    .addField("총 경고 횟수", warns[wUser.id].warns)
    .addField("사유", reason);

    let warnchannel = message.guild.channels.find(`name`, "처벌-로그");
    if(!warnchannel) return message.reply("처벌-로그 채널을 찾을수 없습니다.")

    warnchannel.send(warnEmbed);
    message.channel.send(`<@!${wUser.id}>님이 경고 1회를 받으셨습니다! ${message.author}`);


    if(warns[wUser.id].warns == 10){
        message.guild.member(wUser).ban(reason);
        message.reply(`<@!${wUser.id}>님은 경고 10개로 인해 벤 당하셨습니다!`);
      }
}

module.exports.help = {
    name: "warn"
}