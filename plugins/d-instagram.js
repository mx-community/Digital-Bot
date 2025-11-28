import fetch from 'node-fetch'
import axios from 'axios'
const handler = async (m, {conn, args, command, usedPrefix}) => {
let ponloXd = `\t〤  *I N S T A G R A M*

\t⸭ 📌 \`\`\`Proporcione un enlace de Instagram.\`\`\`

\t⚶ Por ejemplo:
*${usedPrefix + command}* https://www.instagram.com/xxxx/xxxx/xxxx`
if (!args[0]) conn.sendMessage(m.chat, { text: ponloXd }, { quoted: m })
let videoToru = `\t〤  *I N S T A G R A M*\n\n\t⸭ ✅ \`\`\`Video descargado de Instagram.\`\`\``
let imageToru = `\t〤  *I N S T A G R A M*\n\n\t\t⸭ ✅ \`\`\`Imagen descargada de Instagram.\`\`\``
let conToru = `\t〤  *I N S T A G R A M*\n\n\t\t⸭ ✅ \`\`\`Contenido descargado de Instagram.\`\`\``
await m.react("⏰")
try {
const res = await fetch(`https://api.siputzx.my.id/api/d/igdl?url=${args}`)
const data = await res.json()
const fileType = data.data[0].url.includes('.webp') ? 'image' : 'video'
const downloadUrl = data.data[0].url
if (fileType === 'image') {
await conn.sendFile(m.chat, downloadUrl, 'ig.jpg', imageToru, m, null)
} else if (fileType === 'video') {
await conn.sendFile(m.chat, downloadUrl, 'ig.mp4', videoToru, m, null)
}
} catch {
try {
const apiUrl = `${apis}/download/instagram?url=${encodeURIComponent(args[0])}`
const apiResponse = await fetch(apiUrl)
const delius = await apiResponse.json()
if (!delius || !delius.data || delius.data.length === 0) return m.react('❌')
const downloadUrl = delius.data[0].url
const fileType = delius.data[0].type
if (!downloadUrl) return m.react('❌')
if (fileType === 'image') {
await conn.sendFile(m.chat, downloadUrl, 'ig.jpg', imageToru, m, null)
} else if (fileType === 'video') {
await conn.sendFile(m.chat, downloadUrl, 'ig.mp4', videoToru, m, null)
} else {
return m.react('❌')
}
} catch (e) {
await conn.reply(m.chat, `📍 ${e.message}`, m)
console.log(e)
}
}
}
}
handler.help = ['instagram <link ig>']
handler.tags = ['downloader']
handler.command = ["instagram", "ig"]
export default handler
           
