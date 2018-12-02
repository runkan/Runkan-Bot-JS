const Discord = require("discord.js");



module.exports.run = async (bot, message, args) => {

    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("봇정보")
    .setColor("#4e96e6")
    .setThumbnail(bicon)
    .addField("봇 이름", bot.user.username)
    .addField("봇 생성일", bot.user.createdAt);


        return message.channel.send(botembed);
    }

    module.exports.help = {

        name: "botinfo"
      
      }