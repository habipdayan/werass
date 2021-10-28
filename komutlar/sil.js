const Discord = require("discord.js");
exports.run = async function(client, message, args) {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
      const botunmesajyonet = new Discord.MessageEmbed()
        .setColor(0x1e90ff)
        .setTimestamp()
        .setAuthor(message.author.username, message.author.avatarURL())
        .addField(
          ":warning: Uyarı :warning:",
          "Mesaj silmek için yetkili değilsiniz."
        );
      return message.author.send(botunmesajyonet);
    }

    let messagecount = parseInt(args.join(" "));
    if (!messagecount)
      return message.reply("Silinecek mesaj sayısı seçiniz.");
    message.channel.messages
      .fetch({
        limit: messagecount
      })
      .then(messages => message.channel.bulkDelete(messages))
      .catch(err => {
        return message.reply("1-100 arası sayı yazın.");
      });

    const sohbetsilindi = new Discord.MessageEmbed()
      .setColor(0x1e90ff)
      .setTimestamp()
      .addField("Eylem :", "Mesaj silme")
      .addField("Kullanan:", "`" + message.author.tag + "`")
      .addField("Sonuç :", `Başarılı`);
    return message.reply(sohbetsilindi);
  
};
exports.conf = {
  aliases: [
    "sil",
    "deletemessage",
    "messagedelete",
    "message-delete",
    "delete-message",
    "delete",
    "delete-msg"
  ]
};
exports.help = {
  name: "msg-delete"
};