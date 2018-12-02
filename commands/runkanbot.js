const Discord = require("discord.js");



module.exports.run = async (bot, message, args) => {

    message.channel.send(`안녕하세요! ${bot.user.username}입니다! Beta버전은 수시로 업데이트되니 기대해주세요!`)
}

module.exports.help = {

    name: "runkanbot"
  
  }