const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("유저를 찾을 수 없습니다!");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("당신은 관리자 권한이 없습니다!");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("벤 하려는 대상이 관리자입니다. 불편하시더라도 직접 밴 해주시길 바랍니다.");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("Plema BOT Ban System")
    .setColor("#bc0000")
    .addField("벤 대상", `${bUser}`)
    .addField("관리자", `<@${message.author.id}>`)
    .addField("채널", message.channel)
    .addField("시간", message.createdAt)
    .addField("사유", bReason);

    let incidentchannel = message.guild.channels.find(`name`, "처벌목록");
    if(!incidentchannel) return message.channel.send("처벌목록 채널을 찾을 수 없습니다!");

    message.guild.member(bUser).ban(bReason);
    message.channel.send(`${bUser}를 성공적으로 차단했습니다! @${message.author.id}`);
    incidentchannel.send(banEmbed);
}

module.exports.help = {
  name: "ban"
}
