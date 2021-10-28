const Discord = require("discord.js");
const bot = new Discord.Client();
const ayarlar = require("../ayarlar.json");

module.exports.run = async (bot, message, args) => {
  
  let dcsu = message.mentions.members.first()
  
if (!dcsu) return message.channel.send("**Sonuç Alacak Üye Etiketle**")
  
  let dcsm = args.slice(1).join(' ')
  if(!dcsm) return message.channel.send("**Bir Cevap / Mesaj Gir**")
  
  dcsu.send(dcsm)

  message.channel.send(`**__${dcsm} Mesajını, ${dcsu} İsimli Kullanıcıya Gönderdim!**`)
};
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

module.exports.help = {
  name: "sonuç",
  description: "",
  usage: "taslak"
};  