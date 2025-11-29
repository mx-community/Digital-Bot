let handler = async(m, { conn, text, usedPrefix, command }) => {
let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let name = conn.getName(who)
if (!who) return conn.reply(m.chat, `mensione`, m)
  let love = `❪ ✎ › El amor de *@${who.split(`@`)[0]}* hacia a ti es un *${Math.floor(Math.random() * 100)}%*`
conn.sendMessage(m.chat, {text: love, mentions: [who]}, {quoted: m})}
handler.command = ["love"]
export default handler
