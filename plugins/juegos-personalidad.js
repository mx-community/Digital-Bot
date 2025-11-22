let handler = async (m, { conn, command, usedPrefix, text, args }) => {

if (command === "person") {
if (!text) return conn.reply(m.chat, `Por favor, ingrese el nombre de alguna persona.`, m)
let personalidad = `· •─• ✦ *PERSONALIDAD:*\n⊸⊹ *Nombre:* ${text}\n⊸⊹ *Alegria:* ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%'])}\n⊸⊹ *Maldad:* ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%'])}\n⊸⊹ *Tipo:* ${pickRandom(['De buen corazón','Arrogante','Tacaño','Generoso','Humilde','Tímido','Cobarde','Entrometido','Cristal','No binarie XD', 'Pendejo'])}\n⊸⊹ *Estado:* ${pickRandom(['Pesado','De malas','Distraido','En masturbación','Chismoso','Egoista','De compras','Viendo anime','Solitario','Vago','Mujeriego','En el celular', 'Alegre', 'Sonriente'])}\n⊸⊹ *Inteligencia:* ${pickRandom(['9%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%'])}\n⊸⊹ *Coraje:* ${pickRandom(['9%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%'])}\n⊸⊹ *Miedo:* ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%'])}\n⊸⊹ *Tristesa:* ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%'])}\n⊸⊹ *Rencor:* ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%'])}\n⊸⊹ *Amor:* ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%'])}\n⊸⊹ *Genero:* ${pickRandom(['Hombre', 'Mujer', 'Homosexual', 'Bisexual', 'Pansexual', 'Feminista', 'Heterosexual', 'Macho alfa', 'Mujerzona', 'Marimacha', 'Palosexual', 'PlayStationSexual', 'Sr. Manuela', 'Pollosexual'])}`
conn.sendMessage(m.chat, { text: personalidad, contextInfo: { externalAdReply: { title: text, body: "Personalidad verificada.", thumbnailUrl: global.mMages, sourceUrl: null, mediaType: 1, showAdAttribution: false, renderLargerThumbnail: false }}}, { quoted: m })
}
}
handler.command = ['person']
export default handler

global.iq = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "32", "34", "45", "54", "64", "67", "53", "84", "23", "69", "152", "167", "194", "200", "258", "295", "310", "373", "400", "424", "463", "484", "???", "934", "924", "735", "853", "993", "1.535", "1.426", "1.242", "1.928", "3.000"]


function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]
}
