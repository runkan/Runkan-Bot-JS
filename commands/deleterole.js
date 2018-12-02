const Discord = require("discord.js");



module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("죄송하지만 당신은 관리자 권한이 없기때문에 이 작업을 수행할수 없습니다..");

  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

  if(!rMember) return message.reply("유저를 찾을수 없습니다!");

  let role = args.join(" ").slice(22);

  if(!role) return message.reply("Specify a role!");

  let gRole = message.guild.roles.find(`name`, role);

  if(!gRole) return message.reply("룰을 찾을수 없습니다.");



  if(!rMember.roles.has(gRole.id)) return message.reply("They don't have that role.");

  await(rMember.removeRole(gRole.id));



  try{

    await rMember.send(`안타깝게도 ${gRole.name}룰을 잃었습니다..`)

  }catch(e){

    message.channel.send(`<@${rMember.id}>님이 ${gRole.name}룰을 잃었습니다..`)

  }

}



module.exports.help = {

  name: "deleterole"

}