const { MessageEmbed, Discord } = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db')
exports.run = async (client, message, args) => {

  const permError = new MessageEmbed()
    .setColor('RED')
    .setTitle('Başarısız')
    .setAuthor(message.author.tag, message.author.avatarURL({ size:1024, dynamic:true, format: "png"}))
    .setDescription(`Bu Komutu Kullanmak İçin <@&${ayarlar.banYetkiliRolID}> Yetkisine Sahip Olmalısın!`) 
  
if (!message.member.roles.cache.has(ayarlar.BANYetkilisi)) return message.channel.send(permError); 
  
  if(!args[0]) return message.channel.send(new MessageEmbed().setDescription(`${message.author} bir ID belirtmelisin.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  try {
    message.guild.fetchBan(args.slice(0).join(' '))
    .then(({ user, reason }) => message.channel.send(new MessageEmbed().setAuthor(user.tag, user.avatarURL()).setColor('0x348f36').addField('Banlanan Kullanıcı', `**${user.tag}** \`(${user.id})\``).setDescription(`**Ban Sebebi:** \`${reason}\``)))
  } catch(err) { message.channel.send(new MessageEmbed().setTimestamp().setColor('0x800d0d').setDescription('Belirtilen İD\'ye Ait Bir Ban Geçmişi Bulunamadı')) 
                               }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['baninfo', 'ban-bilgi','banbilgi','bansay','ban-say'],
  permLevel: 0
};

exports.help = {
  name: 'ban-sorgula',
};