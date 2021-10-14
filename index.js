const dotenv = require("dotenv");
const { Client, Intents, WebhookClient, WebhookClient } = require("discord.js");
dotenv.config();
const PREFIX = "$";

const client = new Client({
  partials:['MESSAGE','REACTIOn'],
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const WebhookClient = new WebhookClient({
    //id and token
})

client.on("ready", () => {
  console.log(123);
});

client.on("message", async(message) => {
  if (message.author.bot) return;
  console.log(
    "MESSAGE CONTENT: ",
    `${message.author.tag} sent: `,
    message.content
  );
  if (message.content === "Hello bot")
    message.reply(`Hello ${message.author.tag}`);
  //message.channel.send("Hello");
  if (message.content.startsWith(PREFIX)) {
    const [CMD_NAME, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\$+/);

      if(CMD_NAME ==="kick"){
          //kicking
          if(!message.member.hasPermission('KICK_MEMBERS'))
            return message.reply("You dont have permissions")
          else{
          if(args.length ===0)
            return message.reply("Please provide an ID");
          const member = message.guild.members.cache.get(args[0]);
          if(member){
              member.kick()
              .then((member)=>message.channel.send(`${member} was kicked`))
              .catch((err)=>message.channel.send("I do not have permissions"));
          }else{
            message.channel.send("Member was not found");
          }
              
        }
      }
      else if(CMD_NAME === "Ban"){
        if(!message.member.hasPermission('BAN_MEMBERS'))
            return message.reply("You dont have permissions")
        else{
            if(args.length ===0)
                return message.reply("Please provide an ID");
            try {
                const user = await message.guild.members.ban(args[0]);
                message.channel.send("User was banned successfully");
            } catch (error) {
                console.log(error)
                message.channel.send(error);
            }
        }
        message.channel.send("Ban");
      }
  }
});


client.on("messageReactionAdd",(reaction,user)=>{
    const {name} = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if(reaction.message.id === 'testing the message id copy it from discord'){
        switch (name){
            case 'copy and paste the emoji of apple':
                member.roles.add('role id')
                break;
            case 'copy and paste the emoji of banana':
                member.roles.add('role id')
                break;
            case 'copy and paste the emoji of peach':
                member.roles.add('role id')
                break;
            case 'copy and paste the emoji of grape':
                member.roles.add('role id')
                break;

        }
    }
})
/* 

client.on('messageCreate',(message)=>{
    if(message.content === "ping")
        message.reply({
            content:'pong'
        })
}) */

client.login(process.env.DISCORD_BOT_TOKEN);
