import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, args }) => {

try {
if (!args[0]) {
return conn.reply(m.chat,
`\t〨  *F A C E B O O K*

\t⸭ 📍 \`\`\`Proporciona un enlace de Facebook\`\`\`

\t\t⚶ Por ejemplo:
\t*${usedPrefix + command}* https://www.facebook.com/xxx/xxxx`, m)
}

const url = args[0]
if (!url.match(/facebook\.com|fb\.watch/)) {
return conn.reply(m.chat, `📍  El enlace proporcionado no es valido.\n- Copia el enlace de un video de *Facebook*.`, m)
}

await m.react("⏰")
const apiUrl = `https://mayapi.ooguy.com/facebook?url=${encodeURIComponent(url)}&apikey=may-f53d1d49`
console.log('🔗 Solicitando a API:', apiUrl)

const response = await fetch(apiUrl, {
timeout: 30000
})

if (!response.ok) {
throw new Error(`Error en la API: ${response.status} - ${response.statusText}`)
}

const data = await response.json()
//console.log('📦 Respuesta de API:', data)

// Verificar diferentes estructuras de respuesta
if (!data.status) {
throw new Error('📍  La API no respondió correctamente')
}

let videoUrl, videoTitle

// Buscar en diferentes estructuras posibles
if (data.result && data.result.url) {
videoUrl = data.result.url
videoTitle = data.result.title || 'Video de Facebook'
} else if (data.url) {
videoUrl = data.url
videoTitle = data.title || 'Video de Facebook'
} else if (data.data && data.data.url) {
videoUrl = data.data.url
videoTitle = data.data.title || 'Video de Facebook'
} else {
throw new Error('📍  No se encontró URL del video en la respuesta')
}

console.log('🎬 URL del video encontrada:', videoUrl)
console.log('📝 Título:', videoTitle)

let tituloXd = `\t〨  *F A C E B O O K*

\t⸭ ✅ ${textbot}`
await conn.sendMessage(m.chat, { video: { url: videoUrl }, caption: tituloXd }, { quoted: m })
await m.react('✅')
} catch (error) {
await conn.reply(m.chat, `📍 ${error.message}`, m)
await m.react('❌')
}
}

handler.help = ['fb']
handler.tags = ['downloader']
handler.command = ['fb', 'facebook', 'fbd', 'fbdl']

export default handler
  
