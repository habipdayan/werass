  const Discord = require('discord.js');
const db= require('croxydb');

exports.run = async (client, message, args) => {
	var kanal = message.mentions.channels.first();
	
    var silinenMesaj;// = db.get(`${message.guild.id}.silinenMesaj.${message.channel.id}.mesaj`);
    var silinenMesajSahip;// = db.get(`${message.guild.id}.silinenMesaj.${message.channel.id}.sahipId`);
    var veriKontrol;// = db.has(`${message.guild.id}.silinenMesaj.${message.channel.id}.mesaj`);
	
	if (!kanal) {
		silinenMesaj = db.get(`${message.guild.id}.silinenMesaj.${message.channel.id}.mesaj`);
		silinenMesajSahip = db.get(`${message.guild.id}.silinenMesaj.${message.channel.id}.sahipId`);
        veriKontrol = db.has(`${message.guild.id}.silinenMesaj.${message.channel.id}.mesaj`);
		
		if (silinenMesaj == '')
			return message.channel.send('Silinen embed mesajlarının içeriğini gösteremiyorum.');
		
		var embed = new Discord.MessageEmbed()
            .setAuthor('Bu Kanalda Silinen Son Mesaj')
            .addField(`Mesaj Sahibi:`, `<@${silinenMesajSahip}>`)
            .addField('Mesaj İçeriği:', silinenMesaj)
			.addField('Mesajın silindiği kanal:', `<#${message.channel.id}>`)
            .setColor('#FF0045')
            .setTimestamp()
            .setFooter(`${message.author.tag} tarafından kullanıldı`)
			
		message.channel.send({embed});
	} else {
		silinenMesaj = db.get(`${message.guild.id}.silinenMesaj.${kanal.id}.mesaj`);
		silinenMesajSahip = db.get(`${message.guild.id}.silinenMesaj.${kanal.id}.sahipId`);
        veriKontrol = db.has(`${message.guild.id}.silinenMesaj.${kanal.id}.mesaj`);
		
		if (silinenMesaj == '')
			return message.channel.send('Silinen embed mesajlarının içeriğini gösteremiyorum.');
		
		var embed = new Discord.MessageEmbed()
			.setAuthor('Bu Kanalda Silinen Son Mesaj')
            .addField(`Mesaj Sahibi:`, `<@${silinenMesajSahip}>`)
            .addField('Mesaj İçeriği:', silinenMesaj)
		    .addField('Mesajın silindiği kanal:', `<#${kanal.id}>`)
            .setColor('#FF0045')
            .setTimestamp()
            .setFooter(`${message.author.tag} tarafından kullanıldı`)
			
		message.channel.send({embed});
	}
}
exports.conf = {
aliases: []
}
exports.help = {
name: "snipe"
} 
