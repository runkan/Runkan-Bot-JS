const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
let xp = require("./xp.json");


fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("명령어를 찾을수 없습니다!");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} 로딩완료!`)
    bot.commands.set(props.help.name, props);
  });

});

bot.on('ready', () => {
console.log(`로그인 ${bot.user.username}! ${bot.guilds.size}의 서버와 ${bot.users.size}명의 유저와 함께해요`);
bot.user.setActivity("runkan afk", {type: "WATCHING"});
});

bot.on('message', async msg => {
    if (msg.content === ',ping') {
      msg.reply("핑 : " + bot.ping + "ms");
    }
  });

bot.on('message', async msg => {
    if (msg.content === ',help'){
        msg.author.send('runkan_bot\n\n명령어 도움')
    }
})

  bot.on('message', async msg => {
    if (msg.content === ',rank') {
      msg.reply("당신의 레벨은 ${xp[message.author.id].level}이네요!");
    }
  });
bot.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find(ch => ch.name === '환영합니다');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`환영해요, ${member}!`);
  });

  bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let xpAdd = Math.floor(Math.random() * 7) + 8;
    console.log(xpAdd);

    if(!xp[message.author.id]){
      xp[message.author.id] = {
        xp: 0,
        level: 1
      };
    }


    let curxp = xp[message.author.id].xp;
    let curlvl = xp[message.author.id].level;
    let nxtLvl =  xp[message.author.id].level * 300;
    xp[message.author.id].xp =  curxp+ xpAdd;
    if(nxtLvl <= xp[message.author.id].xp){
      xp[message.author.id].level = xp[message.author.id].level + 1;
        
    }
          fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
        if(err) console.log(err)
      });

    console.log(`당신의 레벨은 ${xp[message.author.id].level}이네요!`);

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);  
    
  });

bot.login(botconfig.token);