/*import fs from 'fs';
import fetch from 'node-fetch';
let apkSession = new Map();
let handler = async (m, { conn, text, usedPrefix, command, args }) => {
  if (command === 'apk' && text) {
 await conn.sendMessage(m.chat, { text: `Buscando resultados, espere un momento...` }, { quoted: m })
try {
const response = await fetch(`https://delirius-apiofc.vercel.app/download/apk?query=${encodeURIComponent(text)}`);
const data = await response.json();
if (!data.status || !data.data)
  throw new Error("No se encontró la aplicación.");
const app = data.data;
apkSession.set(m.chat, { app });
const thumbXd = (await conn.getFile(app.image))?.data
  let description = `·─┄ · ✦ *Apk : Download* ✦ ·

⊹ ✎ *Nombre:* ${app.name}
⊹ ✎ *Paquete:* ${app.id}
⊹ ✎ *Publicado:* ${app.publish}
⊹ ✎ *Tamaño total:* ${app.size}
⊹ ✎ *Descargas:* ${app.stats.downloads.toLocaleString()}
⊹ ✎ *Estrellas:* ${app.stats.rating.average}

📍  Se ha encontrado esta aplicación.
- Responda a este mensaje con los siguientes comandos para descargar.

*${usedPrefix}si* 
*${usedPrefix}-y`;
await conn.sendMessage(m.chat, { text: description, mentions: [m.sender], contextInfo: { externalAdReply: { 
title: app.name, 
body: app.publish, 
thumbnail: thumbXd, 
sourceUrl: null, 
mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
return;
 }

if (args[0] === 'si' || args[0] === '-y') {
let session = apkSession.get(m.chat);
if (!session) {
return conn.sendMessage(m.chat, { text: `📍  Debes realizar una busqueda primero para despues descargarlo con este comando.\n\n• *Busque usando el comando:*\n${usedPrefix + command}\n\n• Por ejemplo:\n*${usedPrefix + command}* WhatsApp.`}, { quoted: m });
}
let { app } = session;
const downloadUrl = app.download;
await conn.sendMessage(m.chat, { text: `Descargando el archivo, espere un momento...` }, { quoted: m });
await conn.sendMessage(m.chat, { document: { url: downloadUrl }, mimetype: "application/vnd.android.package-archive", fileName: `${app.name}.apk`, caption: `❒ *Nombre:* ${app.name}\n❒ *Bot:* ${botname}` }, { quoted: m });
return;
  }


  if (command === 'apk' && !text) {
return conn.sendMessage(m.chat, { text: `📍  Ingrese el comando y escriba el nombre de la aplicacion que desea buscar.\n\n• Por ejemplo:\n*${usedPrefix + command}* WhatsApp` }, { quoted: m });
}
};

handler.command = /^(apk|app)$/i;
export default handler;*/
                       

import { search, download } from 'aptoide-scraper'

var handler = async (m, { conn, usedPrefix, command, text }) => {
let pruebaXd = `\t〨  *A P K  :  D L*

\t⸭ 📌 \`\`\`Proporcione el nombre del apk.\`\`\`

\t\t⚶ Por ejemplo:
\t*${usedPrefix + command}* WhatsApp`
if (!text) return conn.sendMessage(m.chat, { text: pruebaXd }, { quoted: m })
try {
await m.react("⏰")
  //conn.sendMessage(m.chat, { text: `Buscando resultados, espere un momento...` }, { quoted: m })
let searchA = await search(text)
let data5 = await download(searchA[0].id)
let apkResultado = `\t〨  *A P K  :  D L*

\t⸭ ✅ ${data5.name}

\t ⧡ Publicado : ${data5.lastup}
\t ⧡ Peso : ${data5.size}
\t ⧡ Paquete : ${data5.package}

> ${textbot}`
const thumb = (await conn.getFile(data5.icon))?.data
await conn.sendMessage(m.chat, { text: apkResultado, mentions: [m.sender], contextInfo: { externalAdReply: { 
title: data5.name, 
body: botname, 
thumbnail: thumb, 
sourceUrl: null, 
mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
  
  //await conn.sendMessage(m.chat, { text: apkResultado }, { quoted: m })
//conn.sendFile(m.chat, data5.icon, 'thumbnail.jpg', txt, null, rcanal)
if (data5.size.includes('GB') || data5.size.replace(' MB', '') > 999) {
  await m.react("💾")
return await conn.sendMessage(m.chat, { text: `📍  El archivo es demasiado pesado para descargar.\n- El limite maximo de descarga es de 999MB.` }, { quoted: m })
}
await conn.sendMessage(m.chat, { document: { url: data5.dllink }, mimetype: 'application/vnd.android.package-archive', fileName: data5.name + '.apk', caption: null }, { quoted: m })
  await m.react("✅")
} catch (error) {
  await m.react("❌")
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = ${error}` }, { quoted: m })
}}

handler.tags = ['descargas']
handler.help = ['apk']
handler.command = ['apk', 'app']

export default handler

