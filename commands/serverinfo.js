const Discord = require("discord.js");



module.exports.run = async (bot, message, args) => {

    let sicon = message.guild.iconURL;
    
    let serverembed = new Discord.RichEmbed()

    .setDescription("서버정보")

    .setColor("#4e96e6")

    .setThumbnail(sicon)

    .addField("서버이름", message.guild.name)

    .addField("이서버가 만들어진 날짜", message.guild.createdAt)

    .addField("당신이 서버에 입장한 날짜", message.member.joinedAt)

    .addField("전체 멤버수", message.guild.memberCount);



    return message.channel.send(serverembed);

  }

  module.exports.help = {

    name: "serverinfo"
  
  }