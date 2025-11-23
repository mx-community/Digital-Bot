
import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) {
return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba la serie que quiera buscar.\n\n• *Por ejemplo:*\n${usedPrefix + command} Naruto.`}, { quoted: m });
}
await m.react('⏳');
try {
const res = await fetch(`https://delirius-apiofc.vercel.app/search/movie?query=${text}`);
const json = await res.json();

if (!json.status || !json.data || json.data.length === 0) {
return await conn.sendMessage(m.chat, { text: `No se han encontrado resultados.\n- Verifique si esta bien escrito y vuelva a intentarlo.`}, { quoted: m });
}

let txt = '· •──• ✦ *RESULTADO* ✦ •──• ·\n\n';
json.data.forEach((movie, index) => {
txt += `⊸⊹ *Titulo:* ${movie.title}\n`;
txt += `⊸⊹ *Publucado:* ${movie.release_date}\n`;
txt += `⊸⊹ *Resumen:* ${movie.overview}\n`;
txt += `⊸⊹ *Enlace:* ${movie.video}\n\n`;
});

await conn.reply(m.chat, txt, m)
//conn.sendMessage(m.chat, { text: txt, contextInfo: { externalAdReply: { title: 'MOVIES', body: textoInfo, thumbnailUrl: movie.image, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m });
} catch (error) {
console.error(error);
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m });
}
};

handler.command = ['series', 'movie'];
export default handler;
  
