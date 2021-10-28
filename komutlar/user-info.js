const Discord = require("discord.js");
const csu = require("useful-tools");
module.exports.run = async (client, message, args) => {
  let csm;
  let csm1 = message.mentions.members.first();
  let csm2 = message.guild.members.cache.get(args[0]);
  if (csm1) {
    csm = csm1;
  }
  if (csm2) {
    csm = csm2;
  }
  if (!csm) {
    csm = message.member;
  }
  const a = "`";
  let csd =
    message.guild.members.cache.filter(
      mr => mr.joinedTimestamp < csm.joinedTimestamp
    ).size + 1;
  let cse = new Discord.MessageEmbed()
    .setTitle(a + csm.user.tag + a + " User Info")
    .setThumbnail(csm.user.avatarURL())
    .setColor("BLUE")
    .addField("User Name", a + csm.user.username + a)
    .addField("User ID", a + csm.user.id + a)
    .addField("Created Time", a + csu.tarih(csm.user.createdTimestamp) + a)
    .addField("Guild Joined Time", a + csu.tarih(csm.joinedTimestamp) + a)
    .addField("Entry Guild Order", a + csd + a)
    .addField(
      "Roles",
      `**Roles Size: ${a +
        csm.roles.cache.size +
        a}\nRoles:\n${csm.roles.cache.map(cs => cs).join(", ")}**`
    )

    .setFooter("Made By. Habip Dayan")
    .setTimestamp();
  message.channel.send(cse);
};
module.exports.conf = {
  aliases: ["ui"]
};

module.exports.help = {
  name: "user-info"
};