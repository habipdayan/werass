const Discord = require("discord.js");
const prefix = "!"

exports.run = async (client, message, args) => { 
  const embed = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
    .setColor("BLACK")
    .setTimestamp();

  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      embed.setDescription(
        `Dur bi dakika. Ama sen.. Ama sen **yönetici** yetkisine sahip değilsin.`
      )
    );
  if (!args[0])
    return message.channel.send(
      embed.setDescription(`${prefix}sohbet <aç/kapat> şekilde kullan!`)
    );
  if (!["aç", "kapat"].includes(args[0]))
    return message.channel.send(
      embed.setDescription(
        `Geçersiz argüman girdin. Geçerli argümanlar: \`aç\`, \`kapat\``
      )
    );

  switch (args[0]) { 
    case "kapat":
      message.channel
        .send(
          embed.setDescription(
            `<#${message.channel.id}> için sohbete yazma yetkisi kapatılıyor. Lütfen bekleyin.`
          )
        )
        .then(async msg => {
          message.guild.roles.cache.forEach(rol => {
              message.channel.updateOverwrite(rol, {
                SEND_MESSAGES: false
              });
          });
          await msg.edit(
            embed.setDescription(
              `<#${message.channel.id}> kanalına tüm roller için yazma yetkisi başarıyla kapatıldı!`
            )
          );
        });
      break; 
    case "aç":
      message.channel
        .send(
          embed.setDescription(
            `<#${message.channel.id}> için sohbete yazma yetkisi açılıyor. Lütfen bekleyin.`
          )
        )
        .then(async msg => {
          message.guild.roles.cache.forEach(rol => {
              message.channel.updateOverwrite(rol, {
                SEND_MESSAGES: null
              });

          });
          await msg.edit(
            embed.setDescription(
              `<#${message.channel.id}> kanalına tüm roller için yazma yetkisi başarıyla açıldı!`
            )
          );
        });
      break;
  }
};

exports.conf = {
  aliases: ["chat"]
};

exports.help = {
  name: "sohbet",
  description: "Komutun kullanıldığı kanalda tüm roller için mesaj gönderme yetkisini açar/kapatır",
  usage: "sohbet",
  perm: "Yönetici"
};
