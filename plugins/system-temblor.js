import fetch from 'node-fetch';
let handler = async (m, { conn, args, text, usedPrefix, command }) => {
try {
const response = await fetch("https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json");
const data = (await response.json()).Infogempa.gempa;
const message = `
\t〨  *DETECTOR  :  TERREMOTO*

〆 Ubicación :
> *${data.Wilayah}*
〆 Impacto :
> *${data.Potensi}*
〆 Fecha y Hora
> *${data.Tanggal} / ${data.Jam}*


\t〨  *DETALLES*
\t⸭ Sentido :
> ${data.Dirasakan.length > 3 ? `${data.Dirasakan}` : 'No verificado.'}

\t⧡ Magnitud : *${data.Magnitude}*
\t⧡ Profundidad : *${data.Kedalaman}*
\t⧡ Coordenadas : *${data.Coordinates}*

> ${textbot} `;
await conn.sendMessage(m.chat, { image: { url: 'https://data.bmkg.go.id/DataMKG/TEWS/' + data.Shakemap }, caption: message }, { quoted: m })
//conn.sendMessage(m.chat, { text: message, contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnailUrl: 'https://data.bmkg.go.id/DataMKG/TEWS/' + data.Shakemap, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m });
} catch (error) {
console.error(error);
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = ${error}` }, { quoted: m });
}
};


handler.command = ["terremoto", "temblor", "tremor"];

export default handler;
  
