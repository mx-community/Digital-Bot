import util from 'util'
import path from 'path'
let user = a => '@' + a.split('@')[0]
function handler(m, { groupMetadata, command, conn, text, usedPrefix}) {

if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba el texto que desea colocar en el top.\n\n• *Por ejemplo:*\n${usedPrefix + command} Mancos` }, { quoted: m })
let ps = groupMetadata.participants.map(v => v.id)
let a = ps.getRandom()
let b = ps.getRandom()
let c = ps.getRandom()
let d = ps.getRandom()
let e = ps.getRandom()
let f = ps.getRandom()
let g = ps.getRandom()
let h = ps.getRandom()
let i = ps.getRandom()
let j = ps.getRandom()
let k = Math.floor(Math.random() * 70);

let top = `•─• •⟤ *TOP* ⟥• •─•
• _Los_ 10 _${text} encontrados en el grupo._
    
1. ${user(a)}
2. ${user(b)}
3. ${user(c)}
4. ${user(d)}
5. ${user(e)}
6. ${user(f)}
7. ${user(g)}
8. ${user(h)}
9. ${user(i)}
10. ${user(j)}`
//await m.react("❤️")
await conn.sendMessage(m.chat, { text: top, mentions: [a, b, c, d, e, f, g, h, i, j] }, { quoted: m })
}
handler.command = ['top']
handler.group = true
export default handler

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]}


