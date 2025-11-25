import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, command, args }) => {
try {
if (!args[0]) {
return conn.reply(m.chat,
`\t〨  *I N S T A G R A M*

\t⸭ 📍 \`\`\`Proporcione un enlace de Instagram.\`\`\`

\t\t⚶ Por ejemplo:
\t*${usedPrefix + command}* https://www.instagram.com/reel/xxxxxxxx/xxxxxxx`,
m)
}

const url = args[0]
if (!url.match(/instagram\.com/)) {
return conn.reply(m.chat,
`📍  El enlace proporcionado no es valido.\n- Copie un enlace de un video de *Instagram*.`,
m)
}

await m.react('⏰')

const api1 = `https://mayapi.ooguy.com/instagram?url=${encodeURIComponent(url)}&apikey=may-f53d1d49`
const api2 = `https://apiadonix.kozow.com/download/instagram?apikey=${global.apikey}&url=${encodeURIComponent(url)}`

let mediaUrl, mediaTitle, mediaType, apiUsada = 'May API'

try {
const res = await fetch(api1, { timeout: 30000 })
if (!res.ok) throw new Error('Error en API principal')
const data = await res.json()

if (data.result?.url) {
mediaUrl = data.result.url
mediaTitle = data.result.title || 'Contenido de Instagram'
mediaType = data.result.type || 'video'
} else if (data.url) {
mediaUrl = data.url
mediaTitle = data.title || 'Contenido de Instagram'
mediaType = data.type || 'video'
} else if (data.data?.url) {
mediaUrl = data.data.url
mediaTitle = data.data.title || 'Contenido de Instagram'
mediaType = data.data.type || 'video'
}
} catch {

apiUsada = 'API Adonix'
const res2 = await fetch(api2, { timeout: 30000 })
if (!res2.ok) throw new Error('Error en API de respaldo')
const data2 = await res2.json()


const adonixData = Array.isArray(data2.data) ? data2.data[0] : data2.data
mediaUrl = adonixData?.url
mediaTitle = 'Contenido de Instagram'
mediaType = mediaUrl?.includes('.mp4') ? 'video' : 'image'
}

if (!mediaUrl) throw new Error('No se encontró contenido válido')

const isVideo = mediaType === 'video' || mediaUrl.includes('.mp4')

if (isVideo) {
await conn.sendMessage(m.chat, {
video: { url: mediaUrl },
caption: `Video`
}, { quoted: m })
} else {
await conn.sendMessage(m.chat, {
image: { url: mediaUrl },
caption: `Imagen`
}, { quoted: m })
}

await m.react('✅')

} catch (error) {
await conn.reply(m.chat,
`📍 ${error.message}`,
m )
await m.react('❌')
}
}

handler.help = ['ig']
handler.tags = ['downloader']
handler.command = ['ig', 'instagram', 'igdl']


export default handler
