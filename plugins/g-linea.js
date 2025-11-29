let handler = async (m, { conn, args }) => {
try {
let id = args?.[0]?.match(/\d+\-\d+@g.us/) || m.chat;

const participantesUnicos = Object.values(conn.chats[id]?.messages || {})
.map((item) => item.key.participant)
.filter((value, index, self) => self.indexOf(value) === index);

const listaEnLinea = participantesUnicos
.map((k) => `⚶ @${k.split("@")[0]}`).join("\n") || "No hay usuarios en linea...";
const mensaje = `📍  *Lista de usuarios en linea.*\n\n${listaEnLinea}`;
await conn.sendMessage(m.chat, { text: mensaje, mentions: participantesUnicos }, { quoted: m });
} catch (error) {
console.error(error);
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = ${error.message}` }, { quoted: m });
}
};

handler.command = ["linea", "enlinea"];
handler.group = true;
handler.fail = null;

export default handler;
  
