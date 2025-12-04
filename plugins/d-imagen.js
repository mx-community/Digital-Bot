import axios from 'axios'
const handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.sendMessage(m.chat, { text: `Proporcione un texto para buscar imágenes.\n\n\t\t⚶ Por ejemplo:\n*#${command}* Arboles` }, { quoted: m })
try {
await m.react('⏰')
const res = await getGoogleImageSearch(text)
const urls = await res.getAll()
if (urls.length < 2) return conn.sendMessage(m.chat, { text: `No hay suficientes imagenes.` }, { quoted: m })
const medias = urls.slice(0, 10).map(url => ({ type: 'image', data: { url } }))
const caption = `· ┄ · ⊸ 𔓕 *Images  :  Search*

\t\t＃ Busqueda : *${text}*
\t\t＃ Imagenes : *${urls.length} images*
\t\t＃ Fuente : *Google*

> ${textbot}`
await conn.sendSylphy(m.chat, medias, { caption, quoted: m })
await m.react('✅')
} catch (error) {
await m.react('📍')
conn.reply(m.chat, `${error.message}`, m)
}}

handler.help = ['imagen']
handler.tags = ['download']
handler.command = ['imagen', 'image']

export default handler

function getGoogleImageSearch(query) {
const apis = [`${global.APIs.delirius.url}/search/gimage?query=${encodeURIComponent(query)}`, `${global.APIs.siputzx.url}/api/images?query=${encodeURIComponent(query)}`]
return { getAll: async () => {
for (const url of apis) {
try {
const res = await axios.get(url)
const data = res.data
if (Array.isArray(data?.data)) {
const urls = data.data.map(d => d.url).filter(u => typeof u === 'string' && u.startsWith('http'))
if (urls.length) return urls
}} catch {}
}
return []
},
getRandom: async () => {
const all = await this.getAll()
return all[Math.floor(Math.random() * all.length)] || null
}}}
