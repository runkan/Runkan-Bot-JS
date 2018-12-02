const Discord = require("discord.js");



module.exports.run = async (bot, message, args) => {

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    
    if(!rUser) return message.channel.send("유저를 찾을수 없습니다..");

    let rreason = args.join(" ").slice(22);



    let reportEmbed = new Discord.RichEmbed()

    .setDescription("런칸봇 신고시스템")

    .setColor("#4e96e6")

    .setThumbnail(message.author.displayAvatarURL)
    
    .addField("가해자", `${rUser} with ID: ${rUser.id}`)

    .addField("피해자", `${message.author} with ID: ${message.author.id}`)

    .addField("채널", message.channel)

    .addField("시간", message.createdAt)

    .addField("이유", rreason);



    let reportschannel = message.guild.channels.find(`name`, "신고");

    if(!reportschannel) return message.channel.send("'신고'라는 채널을 찾을수 없습니다. 신고채널을 생성해주세요.");





    message.delete().catch(O_o=>{});

    reportschannel.send(reportEmbed);

    message.channel.send(`신고가 접수되었습니다! ${message.author}`);
    
    return;

  }

 

module.exports.help = {

  name: "report"

}