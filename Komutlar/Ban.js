const { MessageEmbed } = require('discord.js');
const data = require('quick.db')
const moment = require('moment')
const jdb = new data.table("cezalar");
const kdb = new data.table("kullanici");
const ayarlar = require("../ayarlar.json");
exports.run = async (client, message, args) => { 
  
 const permError = new MessageEmbed()
    .setColor('RED')
    .setTitle('Başarısız')
    .setAuthor(message.author.tag, message.author.avatarURL({ size:1024, dynamic:true, format: "png"}))
    .setDescription(`Bu Komutu Kullanmak İçin <@&${ayarlar.BANYetkilisi}> Yetkisine Sahip Olmalısın!`) 
  
if (!message.member.roles.cache.has(ayarlar.BANYetkilisi)) return message.channel.send(permError); 
  
const banlog = message.guild.channels.cache.find(c => c.id === ayarlar.BANKanal)
  
if (args[0] && (args[0].includes('bilgi') || args[0].includes('info'))){
if(!args[1] || isNaN(args[1])) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Geçerli bir ban yemiş kullanıcı ID'si belirtmelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
return message.guild.fetchBan(args.slice(1).join(' ')).then(({ user, reason }) => message.channel.send(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('0x330033').setTimestamp().setDescription(`**Banlanan Üye:** ${user.tag} (\`${user.id}\`)\n**Ban Sebebi:** ${reason ? reason : "Belirtilmemiş!"}`))).catch(err => message.channel.send(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp().setDescription("Belirtilen ID numarasına sahip bir ban bulunamadı!")).then(x => x.delete({timeout: 5000})));
}
  
let kullanici = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
let sebep = args.splice(1).join(" ")
if(!kullanici) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Bir kullanıcı etiketlemelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(!sebep) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Bir sebep belirtmelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(message.member.roles.highest.position <= kullanici.roles.highest.position) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Etiketlenen kullanıcı sizden üst/aynı pozisyondadır.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(!kullanici.bannable)return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Etiketlenen kullanıcı yasaklanamaz.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(kullanici.id === message.author.id)return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Kendini sunucudan yasaklayamazsın.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(kullanici.id === client.user.id)return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Bir botu sunucudan yasaklayamazsın`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(kullanici.id === message.guild.OwnerID) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Sunucu sahibini sunucudan yasaklayamazsın.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
kullanici.ban({reason: sebep}).then(x => message.react('<a:Banned:828394374928138240>')).catch();
    let muteler = jdb.get(`tempmute`) || [];
                if (!muteler.some(j => j.id == kullanici.id)) {
                  kdb.add(`kullanici.${message.author.id}.mute`, 1);
                    data.add('case', 1)
                    const numara = await data.fetch('case')
                      moment.locale("tr");
                  
                };    
message.channel.send(new MessageEmbed().setDescription(`${message.author} Tarafından. Adlı Kullanıcı ${kullanici} \`${sebep}\` Sebebinden Dolayı Banlandı.`).setImage("https://media2.giphy.com/media/fe4dDMD2cAU5RfEaCU/giphy.gif").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('0x348f36').setTimestamp()) 
banlog.send(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('red').setTimestamp().setDescription(`**Sunucudan Yasaklandı !**\n**Banlayan Yetkili:** ${message.author} \n**Banlanan Üye:** ${kullanici.user} \n**Banlanan Üye İd:**\`${kullanici.user.id}\`\n**Banlanma Nedeni:**\`${sebep}\`\n**Tarih:** \`${moment(Date.now()).add(10,"hours").format("HH:mm:ss DD MMMM YYYY")}\` `).setImage("https://media2.giphy.com/media/fe4dDMD2cAU5RfEaCU/giphy.gif"));
}

exports.conf = {
    aliases: ['yasakla'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'ban'
  };