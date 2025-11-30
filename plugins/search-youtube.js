import fetch from 'node-fetch'
import yts from 'yt-search'
import axios from 'axios'

const MAX_FILE_SIZE_MB = 80
const CACHE_TIME = 10 * 60 * 1000
let ytCache = {}

function formatNumber(num) {
return num.toLocaleString('en-US')
}

async function getSize(url) {
try {
const res = await axios.head(url)
const len = res.headers['content-length']
return len ? parseInt(len, 10) : 0
} catch {
return 0
}
}

function formatSize(bytes) {
const units = ['B', 'KB', 'MB', 'GB']
let i = 0
while (bytes >= 1024 && i < units.length - 1) {
bytes /= 1024
i++
}
return `${bytes.toFixed(2)} ${units[i]}`
}

async function getshadowa(url) {
try {
const api = `https://api-shadowxyz.vercel.app/download/ytmp3V2?url=${encodeURIComponent(url)}`
const res = await fetch(api)
const data = await res.json()

if (data?.status === true && data?.result?.download_url) {
return {
link: data.result.download_url,
format: 'mp3'
}
}
return null
} catch {
return null
}
}

async function getshadowv(url) {
try {
const api = `https://api-shadowxyz.vercel.app/download/ytmp4V2?url=${encodeURIComponent(url)}`
const res = await fetch(api)
const data = await res.json()

if (data?.status === true && data?.result?.download_url) {
return {
link: data.result.download_url,
format: 'mp4'
}
}
return null
} catch {
return null
}
}

var handler = async (m, { text, conn }) => {
if (!text) return conn.reply(m.chat, `Ingrese el comando y escriba lo que quiera buscar para descargar.\n\n• Por ejemplo:\n*${usedPrefix + command}* Rosas`, m)

try {
await m.react('⏰')
const results = await yts(text)
const videos = results.videos.slice(0, 15)
if (!videos.length) return conn.reply(m.chat, '📍  No han se encontraron resultados.\n- Intente especificar el nombre.', m)

ytCache[m.sender] = { results: videos, timestamp: Date.now() }

let caption = `·─┄ · ✦ *Search : YouTube* ✦ ·

\t\t⧡ Busqueda : *${text}*
\t\t⧡ Resultados : *15*

📍  Responda a este mensaje con *V* o *A* con su número.

\t⚶ Por ejemplo:
v1
a1`

for (let i = 0; i < videos.length; i++) {
const v = videos[i]
caption += `\t⚶ *${i + 1}:* ${v.title}\n`
caption += `\t⚶ Duracion : *${v.timestamp || 'Desconocida'}*\n`
caption += `\t⚶ Publicado : *${v.ago || 'N/D'}*\n`
caption += `\t⚶ Vistas : *${formatNumber(v.views)}*\n\n`
}
await conn.sendMessage(m.chat, { image: { url: videos[0].thumbnail }, caption }, { quoted: m })
await m.react('✅')
} catch (e) {
await m.react('❌')
conn.reply(m.chat, `📍 ${e.message}`, m)
}
}

handler.before = async (m, { conn }) => {
if (!m.text) return
const match = m.text.trim().match(/^(a|v)(\d{1,2})$/i)
if (!match) return

const type = match[1].toLowerCase() === 'a' ? 'audio' : 'video'
const index = parseInt(match[2]) - 1

const userCache = ytCache[m.sender]
if (!userCache || !userCache.results[index] || Date.now() - userCache.timestamp > CACHE_TIME)
return conn.reply(m.chat, '📍  La lista de selección ha caducado.\n- Use de nuevo el comando.', m)

const video = userCache.results[index]

try {
await m.react('⏰')

const apiData = type === 'video'
? await getshadowa(video.url)
: await getshadowv(video.url)

if (!apiData) return conn.reply(m.chat, `📍 error_api`, m)

const size = await getSize(apiData.link)
const mb = size / (1024 * 1024)
const sendAsDoc = mb > MAX_FILE_SIZE_MB

const caption = `📡 *${video.title}*\n🌾 *Duración:* ${video.timestamp || 'Desconocida'}\n💮 *Tamaño:* ${formatSize(size)}`

if (sendAsDoc) {
await conn.sendMessage(m.chat, { document: { url: apiData.link }, fileName: `${video.title}.${apiData.format}`, mimetype: type === 'audio' ? 'audio/mpeg' : 'video/mp4', caption: `🎬  *download-youtube_video.mp4*  [doc]` }, { quoted: m } )
} else if (type === 'audio') {
await conn.sendMessage(m.chat, { audio: { url: apiData.link }, fileName: `${video.title}.mp3`, mimetype: 'audio/mpeg', ptt: false, "🎧  *download-songs_audio.mp3*  [doc]" }, { quoted: m } )
} else {
await conn.sendMessage(m.chat, { video: { url: apiData.link }, fileName: `${video.title}.mp4`, mimetype: 'video/mp4', "🎬  *download-youtube_video.mp4*  [doc]" }, { quoted: m } )
}

await m.react('✅')
} catch (e) {
await m.react('❌')
conn.reply(m.chat, `📍 ${e.message}`, m)
}
}

handler.help = ['ytbuscar <texto>']
handler.tags = ['search']
handler.command = ['songs', 'yts']

export default handler
       
