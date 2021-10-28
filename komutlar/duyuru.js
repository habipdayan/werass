const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_GUILD"))
    return message.reply("**YETERSİZ YETKİ!**");
  let csc = message.mentions.channels.first();
  if (!csc) return message.reply("**Bir Kanal Etiketlemen Gerek!**");
  let csm = args.slice(1).join(" ");
  if (!csm) return message.reply("**Ne Duyurusu Yapılacak Yazman Gerek!**");

  let cse = new Discord.MessageEmbed()
    .setTitle("Bir Duyuru Var!")
    .setThumbnail(message.guild.iconURL())
    .setColor("BLUE")
    .setDescription(`\`${csm}\``)
    .setTimestamp()
  csc.send(cse);
  setTimeout(() => {
    csc.send("@everyone").then(csmm => {
      csmm.delete({timeout: 200});
    });
  }, 2000);
};
module.exports.conf = {
  aliases: []
};

module.exports.help = {
  name: "duyuru"
};