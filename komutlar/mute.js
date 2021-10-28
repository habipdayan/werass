 const Discord = require("discord.js");
const ms = require("ms");
const ayarlar = require('../ayarlar.json');
const prefix = ayarlar.prefix;

var mutelirolu = "896818760323854358" //MUTELENDİGİ ZAMAN VERİLECEK ROL ID  BURAYA YAZINIZ...
const yetkilirol = "894672931567861770"
module.exports.run = async (bot, message, args) => {
if(!message.member.roles.cache.has(yetkilirol)) return message.reply("Yetersiz Yetki!")
  let mutekisi = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  if(!mutekisi) return message.reply(`:x: Lütfen bir kullanıcı etiketleyiniz! \nDoğru Kullanım; \`${prefix}mute <@kullanıcı> <1sn/1dk/1sa/1g>\``)
  if(mutekisi.roles.cache.has(yetkilirol)) return message.reply(`:x: Yetkili bir kişiyi muteleyemem! \nDoğru Kullanım; \`${prefix}mute <@kullanıcı> <1sn/1dk/1sa/1g>\``)
  let muterol = message.guild.roles.cache.get(mutelirolu);
  if(!muterol) return message.reply("Cezalı Rolü Bulunamadı!")

  let mutezaman = args[1]
  .replace(`sn`, `s`)
  .replace(`dk`, `m`)
  .replace(`sa`, `h`)
  .replace(`g`, `d`)

  if(!mutezaman) return message.reply(`:x: Lütfen bir zaman giriniz! \nDoğru Kullanım; \`${prefix}mute <@kullanıcı> <1sn/1dk/1sa/1g>\``)

  await(mutekisi.roles.add(muterol.id));
  message.reply(`<@${mutekisi.id}> kullanıcısı ${args[1]} süresi boyunca mutelendi!`);

  setTimeout(function(){
    mutekisi.roles.remove(muterol.id);
    message.channel.send(`<@${mutekisi.id}> Kullanıcı Muteleme Süresi Sona Erdi!`);
  }, ms(mutezaman));
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: "mute",
    usage: "mute <@kullanıcı> <1sn/1dk/1sa/1g>"
  };

//bot reset yerse kod islemez gelismisi icin diger kodlara bakin 