const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if (!member) return message.channel.send(new Discord.MessageEmbed().setDescription(`İltifat Edeceğin Kişiyi Etiketlemedin`))
  let replies = [`${member} Mutluluk ne diye sorsalar- cevabı gülüşünde ve o sıcak bakışında arardım.`, `${member} Ben çoktan şairdim ama senin gibi şiiri ilk defa dinliyorum.`,`${member} Rotanızı geçen her geminin ışığıyla değil, yıldızlara göre ayarlayın.`,`${member} Bir adada mahsur kalmak isteyeceğim kişiler listemde en üst sırada sen varsın.`,`${member} Bir gamzen var sanki cennette bir çukur.`,`${member} Hayatım ne kadar saçma olursa olsun, tüm hayallerimi destekleyecek bir kişi var. O da sensin, mükemmel insan`,`${member} Hayatım ne kadar saçma olursa olsun, tüm hayallerimi destekleyecek bir kişi var. O da sensin, mükemmel insan.`,`${member} Ne tatlısın sen öyle. Akşam gel de iki bira içelim.`,`${member} Telaşımı hoş gör, ıslandığım ilk yağmursun.`,`${member} Sesini duymaktan- hikayelerini dinlemekten asla bıkmayacağım. Konuşmaktan en çok zevk aldığım kişi sensin.`,`${member} Ben çoktan şairdim ama senin gibi şiiri ilk defa dinliyorum.`,`${member} Ben çoktan şairdim ama senin gibi şiiri ilk defa dinliyorum.`,`${member} Ponçik burnundan ısırırım seni`];
  let result = Math.floor(Math.random() * replies.length);

  let embed = new Discord.MessageEmbed()
    .setTitle("İltifatlar")
    .setColor("#f70b0e")
    .setFooter(`Gönderen kişi : ${message.author.tag} `,message.author.avatarURL() )
    .setDescription(replies[result]);

  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "iltifat",
  description: "",
  usage: ""
};