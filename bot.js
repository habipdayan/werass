const db = require('quick.db')
const Discord = require('discord.js');
const client = new Discord.Client({ disableMentions: 'everyone' });
const ayarlar = require('./ayarlar.json');
const fs = require('fs');
Discord.Constants.DefaultOptions.ws.properties.$browser = 'Discord Android'
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.on('ready', () => {
    
      console.log ('_________________________________________');
      console.log (`Kullanıcı İsmi     : ${client.user.username}`);
      console.log (`Sunucular          : ${client.guilds.cache.size}`);
      console.log (`Kullanıcılar       : ${client.users.cache.size}`);
      console.log (`Prefix             : ${ayarlar.prefix}`);
      console.log (`Durum              : Bot Çevrimiçi!`);
      console.log ('_________________________________________');
    
    });


client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

client.on('message', async message => {
const cdb = require("croxydb") //gerekli modül
if(message.guild){
  const data1 = cdb.get("cd1."+message.guild.id)
  const data2 = cdb.get("cd2."+message.channel.id+message.guild.id)
  
  if(data1){
  const blacklist = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "Amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "sik", "yarrak", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "amq"];

  let content = message.content.split(' ');
  
  content.forEach(kelime => {
  if(blacklist.some(küfür => küfür === kelime))  {
  if(!message.member.permissions.has('BAN_MEMBERS')){
  message.delete({timeout: 1000});
  message.reply("**Lütfen Küfür Etme!!:no_entry_sign: **")
  }
  }
  })
  }

    if(!data1 && data2){
  const blacklist = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "Amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "sik", "yarrak", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "amq"];

  let content = message.content.split(' ');
  
  content.forEach(kelime => {
  if(blacklist.some(küfür => küfür === kelime))  {
  if(!message.member.permissions.has('BAN_MEMBERS')){
  message.delete({timeout: 1000});
  message.reply("**Lütfen Küfür Etme!!:no_entry_sign: **")
  }
  }
  })
  }
  
}
  });

client.on("message", async message => { 
if(message.channel.type == "dm"){
const csl = client.channels.cache.get('896671716309360661')
const cse = new Discord.MessageEmbed()
.setTitle("Bota Bir DM Geldi")
.setColor("Gold")
.setThumbnail(client.user.avatarURL)
.setDescription(`**Gönderen Kişi: \`${message.author.tag}\`**`)
.addField("Gelen Mesaj", "```"+message.content+"```")
.setTimestamp()
.setFooter('By Habip Dayan')
csl.send(cse)
}
})

client.on("message", async message => {
let cdb = require("croxydb")
    let uyarisayisi = await cdb.fetch(`reklamuyari_${message.author.id}`);
    let reklamkick = await cdb.fetch(`reklamkick_${message.guild.id}`)
    let kullanici = message.member;
    if (reklamkick == 'kapali') return;
    if (reklamkick == 'acik') {
        const reklam = ["discord.app", "discord.gg", "invite", "discordapp", "discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az",];
        if (reklam.some(word => message.content.toLowerCase().includes(word))) {
            if (!message.member.hasPermission("ADMINISTRATOR")) {
                message.delete({timeout:100});
                cdb.add(`reklamuyari_${message.author.id}`, 1) //uyarı puanı ekleme
                if (uyarisayisi === null) {
                    let uyari = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setFooter('Reklam kick sistemi', client.user.avatarURL())
                        .setDescription(`<@${message.author.id}> reklam kick sistemine yakalandın! Reklam yapmaya devam edersen kickleniceksin (1/3)`)
                        .setTimestamp()
                    message.channel.send(uyari)               
}
                if (uyarisayisi === 1) {
                    let uyari = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setFooter('Reklam kick sistemi', client.user.avatarURL())
                        .setDescription(`<@${message.author.id}> reklam kick sistemine yakalandın! Reklam yapmaya devam edersen kickleniceksin (2/3)`)
                        .setTimestamp()
                    message.channel.send(uyari)
                }
                if (uyarisayisi === 2) {
                    message.delete({timeout:100});
                    await kullanici.kick({
                        reason: `Reklam kick sistemi`,
                    })
                    let uyari = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setFooter('Reklam kick sistemi', client.user.avatarURL())
                        .setDescription(`<@${message.author.id}> 3 adet reklam uyarısı aldığı için kicklendi. Bir kez daha yaparsa banlanacak`)
                        .setTimestamp()
                    message.channel.send(uyari)
                }
                if (uyarisayisi === 3) {
                    message.delete({timeout:100});
                    await kullanici.ban({
                        reason: `Reklam ban sistemi`,
                    })
                    cdb.delete(`reklamuyari_${message.author.id}`)
                    let uyari = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setFooter('Reklam kick sistemi', client.user.avatarURL())
                        .setDescription(`<@${message.author.id}> kick yedikten sonra tekrar devam ettiği için banlandı.`)
                        .setTimestamp()
                    message.channel.send(uyari)
                }

            }
        }
    }
}); //Discord Code Share _ AlpSu

   client.on('messageDelete', async (message) => {
	const cdb = require('croxydb');
	
	
    if (message.author.id == client.user.id)
        return;
    else
        cdb.set(`${message.guild.id}.silinenMesaj.${message.channel.id}.mesaj`, message.content)

cdb.set(`${message.guild.id}.silinenMesaj.${message.channel.id}.sahipId`, message.author.id)
         
});   

client.on("message", async message => {
let kanal = "896868835930554399"
if(message.channel.id === kanal){
if(!message.member.user.bot){
message.delete({timeout: 1000})
}
}
})

 client.on('ready', () => {
  setInterval(function() {
     let knl =  client.channels.cache.get("896671716309360661")
     if(knl){
knl.send("**Weras her zaman yanınızda. Discord sunucumuza arkadaşlarınızı davet edin.**")
     }
    }, 1800000) //1000 = 1 Saniye
}) 

client.on("message", async message => {
  let data = ["sa", "Sa", "sA", "SA", "sea", "Sea", "SEA"];
  if (data.includes(message.content)) {
    message.reply("Aleyküm selam hoşgeldiniz.");
  }
});

client.on("message", async message => {
  let data = [
    "gnydn",
    "günaydın",
    "Günaydın",
    "gunaydin",
    "gunaydın",
    "Gunaydın",
    "Gunaydin"
  ];
  if (data.includes(message.content)) {
    message.reply("Günaydın. Hoşgeldiniz.");
  }
});

client.on("message", async message => {
  let data = [
    "iyi geceler",
    "iyi akşamlar",
    "iyi gclr",
    "ii geceler",
    "iyi aksamlar",
    "Iyi Geceler",
    "İyi geceler",
    "İyi akşamlar"
  ];
  if (data.includes(message.content)) {
    message.reply("İyi akşamlar. Görüşmek üzere.");
  }
});

setInterval(() => {
 client.channels.cache.get("896671716309360661").send('Merhaba! Arkadaşarınızı davet ederek sunucumuza destek olabilirsiniz.')
}, 600000)

client.on('guildMemberAdd', (member) => {
let rol = db.fetch(`otorol_${member.guild.id}`)
let kanal = db.fetch(`otokanal_${member.guild.id}`)
if(!kanal) return
if(!rol) return 
let kanalbulundu = member.guild.channels.cache.get(kanal)
let rolbulundu = member.guild.roles.cache.get(rol)
if(!kanalbulundu) return console.log(`${member.guild.name} Sunucusunda kanalı bulamadım! `)
if(!rolbulundu)return console.log(`${member.guild.name} Sunucusunda Rolü bulamadım! `)


member.roles.add(rol)
kanalbulundu.send(member.user.username + ' Hoşgeldin ``' + rolbulundu.name +  '`` Rolü Başarıyla verildi')// Yazıyı Kendinize göre ayarlayın
})

client.on('guildMemberAdd', async member => { 

const kanal = "894661339673403452"
const log =  client.channels.cache.get(kanal)
let user = client.users.cache.get(member.id);

log.send(`**<@${user.id}> Sunucuya Hoş Geldin Seninle Birlikte __${member.guild.memberCount}__ Kişiyiz!**`)

}) //Dcs Ekibi

//Çıkış
client.on('guildMemberRemove', async member => { 

const kanal = "894661339673403452"
const log =  client.channels.cache.get(kanal)
let user = client.users.cache.get(member.id);

log.send(`**\`${user.tag}\`  Sunucudan Ayrıldı! Geriye __${member.guild.memberCount}__ Kişi Kaldık!**`)

})

const disbut = require('discord-buttons')
disbut(client);

client.on('message', async (message) => {
    if (message.content.startsWith('!yardım')) {
      let button = new disbut.MessageButton()
      .setStyle('green') 
      .setLabel('Buraya Tıkla')
      .setID('Buraya Tıkla')
      let embed = new Discord.MessageEmbed()
      .addField(`**ÖZEL KOMUTLAR İÇİN**`,`:point_down: :point_down: :point_down: `)
      message.channel.send({
        button: button,
          embed: embed
      })
      client.ws.on('INTERACTION_CREATE', async interaction => {
          
          client.api.interactions(interaction.id, interaction.token).callback.post({
              data: {
                  type: 4,
                  data: {
                      content: "!tokatat\n!kullanıcıbilgi<@kullanıcı>\n!kahve\n!ilginçbilgi\n!havadurumu\n!fakemesaj\n!banner", // Yardım Menüsü Buraya Gelecek
                      flags: "64" // Bunu Ellemeyin
                    }
                }
            }) 
       });
    }
});


client.login(process.env.token);