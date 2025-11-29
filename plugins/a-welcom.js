import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
if (!m.messageStubType || !m.isGroup) return true

const chat = global.db.data.chats[m.chat]

const getPais = (numero) => {
const paises = {
"1": "🇺🇸 Estados Unidos", "34": "🇪🇸 España", "52": "🇲🇽 México",
"54": "🇦🇷 Argentina", "55": "🇧🇷 Brasil", "56": "🇨🇱 Chile",
"57": "🇨🇴 Colombia", "58": "🇻🇪 Venezuela", "591": "🇧🇴 Bolivia",
"593": "🇪🇨 Ecuador", "595": "🇵🇾 Paraguay", "598": "🇺🇾 Uruguay",
"502": "🇬🇹 Guatemala", "503": "🇸🇻 El Salvador", "504": "🇭🇳 Honduras",
"505": "🇳🇮 Nicaragua", "506": "🇨🇷 Costa Rica", "507": "🇵🇦 Panamá",
"51": "🇵🇪 Perú", "53": "🇨🇺 Cuba", "91": "🇮🇳 India"
}
for (let i = 1; i <= 3; i++) {
const prefijo = numero.slice(0, i)
if (paises[prefijo]) return paises[prefijo]
}
return "🌎 Desconocido"
}

const usuarioJid = m.messageStubParameters[0] || m.key.participant
const numeroUsuario = usuarioJid.split('@')[0]
const pais = getPais(numeroUsuario)

const ppUrl = await conn.profilePictureUrl(usuarioJid, 'image')
.catch(_ => global.mMages)

const thumbBuffer = await fetch('https://qu.ax/fyaMp.jpg').then(res => res.buffer())

const fkontakk = {
key: { participants: "0@s.whatsapp.net", remoteJid: "status@broadcast", fromMe: false, id: "Halo" },
message: { locationMessage: { name: "T O R U  :  WELCOME", jpegThumbnail: thumbBuffer } },
participant: "0@s.whatsapp.net"
}

const fechaObj = new Date()
const hora = fechaObj.toLocaleTimeString('es-AR', { timeZone: 'America/Buenos_Aires' })
const fecha = fechaObj.toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Buenos_Aires' })
const dia = fechaObj.toLocaleDateString('es-AR', { weekday: 'long', timeZone: 'America/Buenos_Aires' })
const groupSize = participants.length + ((m.messageStubType === 27) ? 1 : ((m.messageStubType === 28 || m.messageStubType === 32) ? -1 : 0))

const fakeContext = {
contextInfo: {
isForwarded: true,
mentionedJid: [usuarioJid],
externalAdReply: {
title: botname,
body: textbot,
mediaUrl: null,
description: null,
previewType: "PHOTO",
thumbnailUrl: "https://qu.ax/KoYAF.jpg",
sourceUrl: "https://whatsapp.com",
mediaType: 1,
renderLargerThumbnail: true
}
}
}

const welcomeMessage = `\t〤  *ＢＩＥＮＶＥＮＩＤＯ*

*"👋🏻 Hola, bienvenido al grupo, espero que en este dia, tarde o noche, estes bien. Siéntete cómodo, usa el comando #menu para ver una lista de comandos."*


\t\t⧡ Grupo : ${groupMetadata.subject}
\t\t⧡ Usuario : @${numeroUsuario}
\t\t⧡ Miembros : ${groupSize}

> ${textbot}`

const byeMessage = `\t〤  *ＡＤＩＯＳ* 

*"👋🏻 Damos la despedida a un participante menos, esperamos y este bien en este momento."*


\t\t⧡ Grupo : ${groupMetadata.subject}
\t\t⧡ Usuario : @${numeroUsuario}
\t\t⧡ Miembros : ${groupSize}

> ${textbot}`

if (chat?.welcome && m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
await conn.sendMessage(m.chat, {
image: { url: ppUrl },
caption: welcomeMessage,
...fakeContext,
footer: "Bienvenido.",
mentions: [usuarioJid]
}, { quoted: fkontakk })
}

if (chat?.welcome && (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE || m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE)) {
await conn.sendMessage(m.chat, {
image: { url: ppUrl },
caption: byeMessage,
...fakeContext,
footer: "Adiós.",
mentions: [usuarioJid]
}, { quoted: fkontakk })
}
  }
