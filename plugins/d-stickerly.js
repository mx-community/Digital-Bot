import fetch from "node-fetch"
import fs from "fs"
import path from "path"
import { sticker } from "../lib/sticker.js"

const API_STICKERLY = "https://delirius-apiofc.vercel.app/download/stickerly"

let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0])
return m.reply(
`Ingrese el comando mas un enlace de un pack de Sticker.ly\n\n• Por ejemplo:\n*${usedPrefix + command}* https://sticker.ly/s/MJ41LV`
)

await m.react("⏰")

try {
const res = await fetch(`${API_STICKERLY}?url=${encodeURIComponent(args[0])}`)
if (!res.ok) throw new Error(`❌ Error al conectar con la API (${res.status})`)
const json = await res.json()

if (!json.status || !json.data || !json.data.stickers?.length)
throw new Error("⚠️ No se pudo obtener el pack. Verifica el enlace.")

const data = json.data

const info = `
\t〤  *S T I C K E R  :  L Y*

\t⚶ *PROPIEDAD*
\t⧡ Pack : *${data.name}*
\t⧡ Autor : *${data.author}* (@${data.username})
\t⧡ Seguidores : *${data.followers}* seguidores

⚶ *DETALLES*
\t⧡ Stickers : *${data.total}* stickers
\t⧡ Vistas : *${data.viewCount}* vistas
\t⧡ Exports : *${data.exportCount}* exportados
\t⧡ Animados : *${data.isAnimated ? "Sí" : "No"}*
`.trim()

await conn.sendMessage(
m.chat,
{
text: info,
contextInfo: {
externalAdReply: {
title: `${data.name}`,
body: botname,
thumbnailUrl: data.preview,
sourceUrl: data.url,
mediaType: 1,
renderLargerThumbnail: false,
},
},
},
{ quoted: m }
)

let success = 0
let failed = 0

for (const stick of data.stickers) {
try {
const imgRes = await fetch(stick)
if (!imgRes.ok) throw new Error("No se pudo descargar el sticker")

const imgBuffer = Buffer.from(await imgRes.arrayBuffer())
const stickerBuf = await sticker(imgBuffer, false, data.name, data.author)

await conn.sendMessage(m.chat, { sticker: stickerBuf }, { quoted: m })
success++
await new Promise((resolve) => setTimeout(resolve, 600)) // previene flood
} catch (err) {
failed++
console.log("⚠️ Error con un sticker:", err.message)
}
}

await m.react("✅")

m.reply(`✅  Se han enviado *${success}* correctamente y *${failed}* fallos.`)

} catch (e) {
console.error("❌ Error general:", e)
m.reply(`📍 ${e.message}`)
await m.react("❌")
}
}

handler.help = ["stickerlydl <url>"]
handler.tags = ["sticker", "download"]
handler.command = ["sly", "stickerly"]

export default handler
