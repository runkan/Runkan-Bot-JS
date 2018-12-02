const Discord = require("discord.js");



module.exports.run = async (bot, message, args) => {
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    
    if(!kUser) return message.channel.send("유저를 찾을수 없습니다!");

    let kReason = args.join(" ").slice(22);

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`당신은 관리자 권한이 없습니다! ${message.author}`);

    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("킥 하려는 대상이 관리자입니다! 직접 킥 해주시길 바랍니다.");



    let kickEmbed = new Discord.RichEmbed()

    .setDescription("PLEMA BOT Kick System")

    .setColor("#e56b00")

    .setThumbnail(bot.user.displayAvatarURL)

    .addField("킥한 유저", `${kUser} with ID ${kUser.id}`)

    .addField("관리자", `<@${message.author.id}> with ID ${message.author.id}`)

    .addField("채널", message.channel)

    .addField("시간", message.createdAt)

    .addField("사유", kReason);



    let kickChannel = message.guild.channels.find(`name`, "처벌목록");

    if(!kickChannel) return message.channel.send("처벌목록 채널을 찾을수 없습니다!.");



    message.guild.member(kUser).kick(kReason);

    message.channel.send(`${kUser}를 성공적으로 킥했습니다! ${message.author}`);

    kickChannel.send(kickEmbed);



    return;

  }

  module.exports.help = {

    name: "kick"
}