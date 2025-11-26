import uploadImage from '../lib/uploadImage.js'
import { sticker } from '../lib/sticker.js'
let handler = async (m, {conn, text, usedPrefix, command}) => {
let user = global.db.data.users[m.sender]
let f = user.botname || global.botname
let g = user.botname && user.botname ? user.botname : user.botname && !user.botname ? '' : global.botname
let [atas, bawah] = text.split`,`
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) return conn.reply(m.chat, `Ejemplo Hola, Hola`, m)
if (!/image\/(jpe?g|png)/.test(mime)) return conn.reply(m.chat, `responda a una imagen.`, m)
m.reply(global.wait)
let img = await q.download()
let url = await uploadImage(img)
let meme = `https://api.memegen.link/images/custom/${encodeURIComponent(atas ? atas : '')}/${encodeURIComponent(bawah ? bawah : '')}.png?background=${url}`
let stiker = await sticker(false, meme, f, g)
if (stiker) await conn.sendFile(m.chat, stiker, '', botname, m, '', {asSticker: 1})
}
handler.help = ['smeme (teks|teks)']
handler.tags = ['sticker']
handler.command = ["smeme"]



export default handler
  
