let handler = async (m, {conn, usedPrefix, command, args, isOwner, isAdmin, isROwner, text}) => {
const primaryBot = global.db.data.chats[m.chat].primaryBot
if (primaryBot && conn.user.jid !== primaryBot) throw !1
let chat = global.db.data.chats[m.chat]
let bot = global.db.data.settings[conn.user.jid] || {}
let type = command.toLowerCase()
let isEnable = chat[type] !== undefined ? chat[type] : false
if (args[0] === 'on' || args[0] === 'enable') {
if (isEnable) return conn.reply(m.chat, `📍  Ese comando ya esta activo. Entendelo.`, m)
isEnable = true
} else if (args[0] === 'off' || args[0] === 'disable') {
if (!isEnable) return conn.reply(m.chat, `📍  Ese comando ya esta desactivado. Entendelo.`, m)
isEnable = false
} else {
let funciones = `\t〤  *F U N C I O N E S*

\t⸭ 📍 \`\`\`Funciones para el bot.\`\`\`

\t\t⚶ Por ejemplo:
\t*#${command}* on

------- Funciones :
${readMore}
✎ *Bienvenidas:*
\t⧡ #f-welcome *(on/off)*

✎ *Modo Admin:*
\t⧡ #f-admin *(on/off)*

✎ *Detector:*
\t⧡ #f-detect *(on/off)*

✎ *Anti Enlaces:*
\t⧡ #f-link *(on/off)*

✎ *Menu Basico:*
\t⧡ #f-menu *(on/off)*

✎ *Modo RPG:*
\t⧡ #f-rpg *(on/off)*

✎ *Modo Juego:*
\t⧡ #f-game *(on/off)*

✎ *Chat Bot:*
\t⧡ #f-bot *(on/off)*

✎ *Modo Descargas:*
\t⧡ #f-dl *(on/off)*

✎ *Anti Ver:*
\t⧡ #f-view *(on/off)*

✎ *Auto Aceptar:*
\t⧡ #f-acept *(on/off)*

✎ *Auto Rechazar:*
\t⧡ #f-refuse *(on/off)*

✎ *Solo Latam:*
\t⧡ #f-latam *(on/off)*

✎ *Anti Privado:*
\t⧡ #f-priv *(on/off)*

✎ *Servidores:*
\t⧡ #f-server *(on/off)*`


return conn.reply(m.chat, funciones, m)
}
let isAll = false
switch (type) {
case 'f-welcome': {
if (!m.isGroup) {
if (!isOwner) {
global.dfail('group', m, conn)
throw false
}} else if (!isAdmin) {
global.dfail('admin', m, conn)
throw false
}
chat.welcome = isEnable
break
}
case 'f-admin': {
if (!m.isGroup) {
if (!isOwner) {
global.dfail('group', m, conn)
throw false
}} else if (!isAdmin) {
global.dfail('admin', m, conn)
throw false
}
chat.fAdmin = isEnable
break
}
case 'f-view': {
if (!m.isGroup) {
if (!isOwner) {
global.dfail('group', m, conn)
throw false
}} else if (!isAdmin) {
global.dfail('admin', m, conn)
throw false
}
chat.fViewonce = isEnable
break
}
case 'f-priv': {
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
bot.fPrivado = isEnable
break
}
case 'f-acept': {
if (!m.isGroup) {
if (!isOwner) {
global.dfail('group', m, conn)
throw false
}} else if (!isAdmin) {
global.dfail('admin', m, conn)
throw false
}
chat.fAceptar = isEnable
break
}
case 'f-refuse': {
if (!m.isGroup) {
if (!isOwner) {
global.dfail('group', m, conn)
throw false
}} else if (!isAdmin) {
global.dfail('admin', m, conn)
throw false
}
chat.fRechazar = isEnable
break
}
case 'f-bot': {
if (!m.isGroup) {
if (!isOwner) {
global.dfail('group', m, conn)
throw false
}} else if (!isAdmin) {
global.dfail('admin', m, conn)
throw false
}
chat.fChatgp = isEnable
break
}
case 'f-dl': {
if (!m.isGroup) {
if (!isOwner) {
global.dfail('group', m, conn)
throw false
}} else if (!isAdmin) {
global.dfail('admin', m, conn)
throw false
}
chat.fDescargas = isEnable
break
}
case 'f-detect': {
if (!m.isGroup) {
if (!isOwner) {
global.dfail('group', m, conn)
throw false
}} else if (!isAdmin) {
global.dfail('admin', m, conn)
throw false
}
chat.detect = isEnable
break
}
case 'f-link': {
if (!m.isGroup) {
if (!isOwner) {
global.dfail('group', m, conn)
throw false
}} else if (!isAdmin) {
global.dfail('admin', m, conn)
throw false
}
chat.fEnlaces = isEnable
break
}
case 'f-menu': {
if (!m.isGroup) {
if (!isOwner) {
global.dfail('group', m, conn)
throw false
}} else if (!isAdmin) {
global.dfail('admin', m, conn)
throw false
}
chat.fMenu = isEnable
break
}
case 'f-rpg': {
if (!m.isGroup) {
if (!isOwner) {
global.dfail('group', m, conn)
throw false
}} else if (!isAdmin) {
global.dfail('admin', m, conn)
throw false
}
chat.fRpg = isEnable
break
}
case 'f-game': {
if (!m.isGroup) {
if (!isOwner) {
global.dfail('group', m, conn)
throw false
}} else if (!isAdmin) {
global.dfail('admin', m, conn)
throw false
}
chat.fJuegos = isEnable
break
}}
chat[type] = isEnable

let toruAc = `\t〤  *F U N C I O N*

\t⸭ ✅ Comando ( *${type}* ) ${isEnable ? 'activado' : 'desactivado'} con exito en ${isAll ? 'todos los chats.' : 'este grupo.'}`
conn.reply(m.chat, toruAc, m)
}


handler.command = ["f-welcome", "f-admin", "f-view", "f-priv", "f-acept", "f-latam", "f-refuse", "f-bot", "f-dl", "f-detect", "f-link", "f-menu", "f-rpg", "f-game"]

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
  
