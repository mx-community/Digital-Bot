import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
import fs from 'fs'
import moment from 'moment-timezone'
import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn, usedPrefix, args, command, __dirname, participants }) => {
try {
const user = global.db.data.users[m.sender] || {}
const name = await conn.getName(m.sender)
const thumbBot = Buffer.from(await (await fetch(`${global.mImagen}`)).arrayBuffer())
const premium = user.premium ? '✓' : '✘'
const limit = user.limit || 0
const totalreg = Object.keys(global.db.data.users).length
const groupUserCount = m.isGroup ? participants.length : '-'
const groupsCount = Object.values(conn.chats).filter(v => v.id.endsWith('@g.us')).length
const uptime = clockString(process.uptime() * 1000)
const dFormato = new Date(new Date + 3600000)
const fecha = new Date(Date.now())
const locale = 'es-AR'
const dia = fecha.toLocaleDateString(locale, { weekday: 'long' })
const fechaTxt = fecha.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
const hora = `${moment.tz('America/Buenos_Aires').format('HH:mm:ss')}`
 //d.toLocaleString('es-AR', {hour: 'numeric', minute: 'numeric', second: 'numeric', hour: true})
//fecha.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })
const totalCommands = Object.keys(global.plugins).length
const userId = m.sender.split('@')[0]
const phone = PhoneNumber('+' + userId)
const pais = phone.getRegionCode() || 'Desconocido'
const perfil = await conn.profilePictureUrl(conn.user.jid, 'image').catch(() => `${global.mMages}`)

await m.react('👋🏻')
if (!args[0]) {
let menu = `> ${hora}, ${dia} ${fechaTxt}

🜲 Usuario : @${name}
ᗢ Premium : ${premium}
✦ Version : ${vs} (/mx_toru)
⚉ Bot : ${(conn.user.jid == global.conn.user.jid ? 'Principal' : 'PreBot')}

\t\t⚶ 📍 \`\`\`Categorías:
⧡ #menu ⧿ all
⧡ #menu ⧿ info
⧡ #menu ⧿ descargas
⧡ #menu ⧿ grupos
⧡ #menu ⧿ rpg
⧡ #menu ⧿ settings
⧡ #menu ⧿ logos
⧡ #menu ⧿ search
⧡ #menu ⧿ stickers
⧡ #menu ⧿ tools
⧡ #menu ⧿ rw\`\`\`

\t⚶ Por ejemplo:
*#menu all*`
return conn.sendMessage(m.chat, { text: menu, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
} else if (args[0] === '1' || args[0] === 'info') {
let menu1 = `🜲 Usuario : @${name}
ᗢ Premium : ${premium}
⚉ Bot : ${(conn.user.jid == global.conn.user.jid ? 'Principal.' : 'Servidor.')}


\t\t⚶ 📍\`\`\`Informacion:
#support   <text>
#alquilar
#terminos <text>
#creador
#ping
#canal
#status
#infobot
#donate
#ds
#mp
#bk
#pay\`\`\`

> ${textbot}`
return conn.sendMessage(m.chat, { text: menu1, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} else if (args[0] === "descargas" || args[0] === "2") {
let menu2 = `🜲 Usuario : @${name}
ᗢ Premium : ${premium}
⚉ Bot : ${(conn.user.jid == global.conn.user.jid ? 'Principal.' : 'Servidor.')}


\t\t⚶ 📍\`\`\`Descargas:
#github   <link>
#apk      <text>
#facebook <link>.
#instagram <link>.
#play     <text o link>
#mediafire<link>
#twitter  <link>
#tiktok   <link>
#a-tiktok <link>
#p-tiktok <link>
#pinterest <link>\`\`\`

> ${textbot}
`
return conn.sendMessage(m.chat, { text: menu2, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} else if (args[0] === "grupos" || args[0] === "3") {
let menu3 = `🜲 Usuario : @${name}
ᗢ Premium : ${premium}
⚉ Bot : ${(conn.user.jid == global.conn.user.jid ? 'Principal.' : 'Servidor.')}


\t\t⚶ 📍 \`\`\`Para grupos:
#add  <nro>
#kick     <reply>
#delete   <reply>
#promote  <reply>
#demote   <reply>
#warn     <reply>
#unwarn  <reply>
#g-img   <reply>
#g-name   <texto>
#g-desc   <texto>
#g-welcome <texto>
#d-bay <texto>
#link\`\`\`

> ${textbot}
`
return conn.sendMessage(m.chat, { text: menu3, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} else if (args[0] === "rpg" || args[0] === "4") {
let menu4 = `🜲 Usuario : @${name}
ᗢ Premium : ${premium}
⚉ Bot : ${(conn.user.jid == global.conn.user.jid ? 'Principal.' : 'Servidor.')}


\t\t⚶ 📍\`\`\`Juegos rpg:
#lb 
#cofre
#levelup 
#work 
#fishing
#mining
#ret <query>
#ret2 <query>
#dep <query>
#dep2 <query>
#give <query>
#give2 <texto>\`\`\`

> ${textbot}
`
return conn.sendMessage(m.chat, { text: menu4, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} else if (args[0] === "ajustes" || args[0] === "5") {
let menu5 = `🜲 Usuario : @${name}
ᗢ Premium : ${premium}
⚉ Bot : ${(conn.user.jid == global.conn.user.jid ? 'Principal.' : 'Servidor.')}


\t\t⚶ 📍\`\`\`Ajustes:
#hweb <link>
#lid
#getpic <mention>
#hd <query>
#cid <link>
#trad <texto>
#calc <query>\`\`\`

> ${textbot}`
return conn.sendMessage(m.chat, { text: menu5, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: null, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} else if (args[0] === "logos" || args[0] === "6") {
let menu6 = `🜲 Usuario : @${name}
ᗢ Premium : ${premium}
⚉ Bot : ${(conn.user.jid == global.conn.user.jid ? 'Principal.' : 'Servidor.')}


\t\t⚶ 📍\`\`\`Crear logos:
#logo1    <texto>
#logo2    <texto>
#logo3    <texto>
#logo4    <texto>
#logo5    <texto>
#logo6    <texto>
#logo7    <texto>
#logo8    <texto>
#logo9    <texto>
#logo10   <texto>
#logo11   <texto>
#logo12   <texto>
#logo13   <texto>
#logo14   <texto>
#logo15   <texto>
#logo16   <texto>
#logo17   <texto>
#logo18   <texto>
#logo19   <texto>
#logo20   <texto>
#logo21   <texto>
#logo22   <texto>
#logo23   <texto>
#logo24   <texto>
#logo25   <texto>
#logo26   <texto>
#logo27   <texto>
#logo28   <texto>
#logo29   <texto>
#logo30   <texto>
#logo31   <texto>
#logo32   <texto>
#logo33   <texto>
#logo34   <texto>
#logo35   <texto>
#logo36   <texto>
#logo37   <texto>
\`\`\`

> ${textbot}`
return conn.sendMessage(m.chat, { text: menu6, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: null, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} else if (args[0] === "perfil" || args[0] === "7") {
let menu7 = `🜲 Usuario : @${name}
ᗢ Premium : ${premium}
⚉ Bot : ${(conn.user.jid == global.conn.user.jid ? 'Principal.' : 'Servidor.')}


\t\t⚶ 📍\`\`\`Perfil:
#perfil   
#myp  
#registro <query>
#mycode
#dreg <code>
#p-genero <texto>
#d-genero 
#p-cumple <texto>
#d-cumple 
#p-desc  <texto>
#d-desc   
#p-age <nro>\`\`\`

> ${textbot}`
return conn.sendMessage(m.chat, { text: menu7, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: null, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} else if (args[0] === "search" || args[0] === "8") {
let menu8 = `🜲 Usuario : @${name}
ᗢ Premium : ${premium}
⚉ Bot : ${(conn.user.jid == global.conn.user.jid ? 'Principal.' : 'Servidor.')}


\t\t⚶ 📍\`\`\`Busquedas:
#tiktoks  <texto>
#imagen   <texto>
#spotifys  <texto>
#apples   <texto>
#capcuts  <texto>
#sounds  <texto>
\`\`\`

> ${textbot}`
return conn.sendMessage(m.chat, { text: menu8, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: null, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} else if (args[0] === "stickers" || args[0] === "9") {
let menu9 = `╭🜲 Usuario : @${name}
ᗢ Premium : ${premium}
⚉ Bot : ${(conn.user.jid == global.conn.user.jid ? 'Principal.' : 'Servidor.')}


\t\t⚶ 📍\`\`\`Stickers:
#sticker  <reply>
#brat     <texto>
#emojix   <query>
#qc       <text>
#exif    <text>
#d-exif\`\`\`

> ${textbot}`
return conn.sendMessage(m.chat, { text: menu9, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: null, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} else if (args[0] === "tools" || args[0] === "10") {
let menu10 = `🜲 Usuario : @${name}
ᗢ Premium : ${premium}
⚉ Bot : ${(conn.user.jid == global.conn.user.jid ? 'Principal.' : 'Servidor.')}


\t\t⚶ 📍\`\`\`Convertidores:
#upload
#turl <reply>
#catbox <reply>
#timg <reply>
#tgif <reply>
#tmp3 <reply>
#tvid <reply>\`\`\`

> ${textbot}`
return conn.sendMessage(m.chat, { text: menu10, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: null, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} else if (args[0] === "completo" || args[0] === "all" || args[0] === "0") {
let menuAll = `${hora}, ${dia} ${fechaTxt}

🜲 Usuario : @${name}
ᗢ Premium : ${premium}
⚉ Bot : ${(conn.user.jid == global.conn.user.jid ? 'Principal.' : 'Servidor.')}


\`\`\`⚶ INFORMACIÓN •
#support   <text>
#alquilar
#terminos <text>
#creador
#ping
#canal
#status
#infobot
#donate
#ds
#mp
#bk
#pay


⚶ DESCARGAS •
#github   <link>
#apk      <text>
#facebook <link>.
#instagram <link>.
#play     <text o link>
#mediafire<link>
#twitter  <link>
#tiktok   <link>
#a-tiktok <link>
#p-tiktok <link>
#pinterest <link>


⚶ PARA GRUPOS •
#add  <nro>
#kick     <reply>
#delete   <reply>
#promote  <reply>
#demote   <reply>
#warn     <reply>
#unwarn  <reply>
#g-img   <reply>
#g-name   <texto>
#g-desc   <texto>
#g-welcome <texto>
#d-bay <texto>
#link


⚶ JUEGOS RPG •
#lb 
#cofre
#levelup 
#work 
#fishing
#mining
#ret <query>
#ret2 <query>
#dep <query>
#dep2 <query>
#give <query>
#give2 <texto>


⚶ AJUSTES •
#hweb <link>
#lid
#getpic <mention>
#hd <query>
#cid <link>
#trad <texto>
#calc <query>


⚶ CREAR LOGOS •
#logo1    <texto>
#logo2    <texto>
#logo3    <texto>
#logo4    <texto>
#logo5    <texto>
#logo6    <texto>
#logo7    <texto>
#logo8    <texto>
#logo9    <texto>
#logo10   <texto>
#logo11   <texto>
#logo12   <texto>
#logo13   <texto>
#logo14   <texto>
#logo15   <texto>
#logo16   <texto>
#logo17   <texto>
#logo18   <texto>
#logo19   <texto>
#logo20   <texto>
#logo21   <texto>
#logo22   <texto>
#logo23   <texto>
#logo24   <texto>
#logo25   <texto>
#logo26   <texto>
#logo27   <texto>
#logo28   <texto>
#logo29   <texto>
#logo30   <texto>
#logo31   <texto>
#logo32   <texto>
#logo33   <texto>
#logo34   <texto>
#logo35   <texto>
#logo36   <texto>
#logo37   <texto>


⚶ PERFIL •
#perfil   
#myp  
#registro <query>
#mycode
#dreg <code>
#p-genero <texto>
#d-genero 
#p-cumple <texto>
#d-cumple 
#p-desc  <texto>
#d-desc   
#p-age <nro>


⚶ BUSQUEDAS •
#tiktoks  <texto>
#imagen   <texto>
#spotifys  <texto>
#apples   <texto>
#capcuts  <texto>
#sounds  <texto>


⚶ STICKERS •
#sticker  <reply>
#brat     <texto>
#emojix   <query>
#qc       <text>
#exif    <text>
#d-exif


⚶ CONVERTIDORES •
#upload
#turl <reply>
#catbox <reply>
#timg <reply>
#tgif <reply>
#tmp3 <reply>
#tvid <reply>


⚶ SISTEMA •
#temblor
#pais <text>
#clima <text>\`\`\`

> ${textbot}`
return conn.sendMessage(m.chat, { text: menuAll, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} else if (args[0] === "sistema" || args[0] === "11") {
let menu10 = `🜲 Usuario : @${name}
ᗢ Premium : ${premium}
⚉ Bot : ${(conn.user.jid == global.conn.user.jid ? 'Principal.' : 'Servidor.')}


\t\t⚶ 📍\`\`\`Busquedas:
#temblor
#pais <text>
#clima <text>\`\`\`

> ${textbot}`
 return conn.sendMessage(m.chat, { text: menu10, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
}
} catch (e) {
console.error(e)
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = ${e}` }, { quoted: m })
}
}
handler.help = ['help  <category>', 'menu  <category>']
handler.tags = ['menus']
handler.command = ['menu', 'help']


export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

 function clockString(ms) {
const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}
 
/*
╭───[ ⛉ PROPIETARIO ⛉ ]─•
│#   │
│#│
│# │✎ texto.
│# │✎ texto.
│#  │✎ reply.
│#   │✎ texto.
│# │
│#    │✎ query.
│#    │✎ query.
╰─────────────────•
*/
