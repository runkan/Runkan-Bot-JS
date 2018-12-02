const Discord = require("discord.js");
const ms = require("ms");



module.exports.run = async (bot, message, args) => {



  //!tempmute @user 1s/m/h/d



  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

  if(!tomute) return message.reply("유저를 찾을수 없습니다..");

  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("그를 뮤트 할 수 없습니다!");

  let muterole = message.guild.roles.find(`name`, "뮤트중");

  //start of create role

  if(!muterole){

    try{

      muterole = await message.guild.createRole({

        name: "뮤트중",

        color: "#000000",

        permissions:[]

      })

      message.guild.channels.forEach(async (channel, id) => {

        await channel.overwritePermissions(muterole, {

          SEND_MESSAGES: false,

          ADD_REACTIONS: false

        });

      });

    }catch(e){

      console.log(e.stack);

    }

  }

  //end of create role

  let mutetime = args[1];

  if(!mutetime) return message.reply("You didn't specify a time!");



  await(tomute.addRole(muterole.id));

  message.reply(`<@${tomute.id}>님은 ${ms(ms(mutetime))}동안 뮤트를 당하셨습니다.`);



  setTimeout(function(){

    tomute.removeRole(muterole.id);

    message.channel.send(`<@${tomute.id}>님의 뮤트시간이 지나 뮤트가 해제되었습니다!`);

  }, ms(mutetime));





//end of module

}



module.exports.help = {

  name: "mute"

}