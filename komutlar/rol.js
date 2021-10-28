 const Discord = require("discord.js")
module.exports.run= async(client, message, args) => {
  if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply("Yetersiz Yetki!")
  
if(!args[0]) return message.reply('rol al @member @role veya rol ver @member @role Yazmalısın!')
if(args[0] === "ver"){
let member = message.mentions.members.first()
if(!member){
member = message.guild.members.get(args[1])
}
const role = message.mentions.roles.first() || message.guild.roles.find(m => m.name === args.slice(2).join(" "))

if(!member) return message.reply('Birini Etiketlemen Gerek')
if(!role) return message.reply('Bir Rol Etiketlemen veya Ismini Yazman Gerek!')
member.roles.add(role)
message.channel.send('Basari ile Belirtilen Uyeye Belirtilen Rol Verildi!')
}
if(args[0] === "al"){
let member = message.mentions.members.first()
if(!member){
member = message.guild.members.get(args[1])
}
const role = message.mentions.roles.first() || message.guild.roles.find(m => m.name === args.slice(2).join(" "))

if(!member) return message.reply('Birini Etiketlemen Gerek')
if(!role) return message.reply('Bir Rol Etiketlemen veya Ismini Yazman Gerek!')
member.roles.remove(role)
message.channel.send('Basari Ile Belirtilen Uyeden Belirtilen Rol Alindi!')
}
}
module.exports.conf = {
aliases: []
}

module.exports.help = {
name: "rol"
} 