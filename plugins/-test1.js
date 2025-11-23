import fetch from 'node-fetch';
let handler = async (m, { conn, args, text, usedPrefix, command }) => {
try {
const response = await fetch("https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json");
const data = (await response.json()).Infogempa.gempa;
const message = `
⫹⫺ *TERREMOTO DETECTADO* ⫹⫺
⊸⊹ *Ubicación:* ${data.Wilayah}
⊸⊹ *Fecha:* ${data.Tanggal}
⊸⊹ *Hora:* ${data.Jam}
⊸⊹ *Impacto:* ${data.Potensi}


*[ DETALLE ESPESIFICO ]*
❒ *Magnitud:* ${data.Magnitude}
❒ *Profundidad:* ${data.Kedalaman}
❒ *Coordenadas:* ${data.Coordinates}
❒ *Sentido:* ${data.Dirasakan.length > 3 ? `${data.Dirasakan}` : 'No verificado.'}`;
await conn.reply(m.chat, message, m)
  
  //conn.sendMessage(m.chat, { text: message, contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnailUrl: 'https://data.bmkg.go.id/DataMKG/TEWS/' + data.Shakemap, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m });
} catch (error) {
console.error(error);
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m });
}
};


handler.command = ["terremoto", "temblor", "tremor"];

export default handler;
