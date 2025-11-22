let tempStorage = {};

const handler = async (m, { conn, command, usedPrefix, text }) => {
  if (command === 'prueba') {
    tempStorage[m.sender.id] = { esperando: true, mensajeId: m.id };
    let pruebaXd = `Mensaje de Prueba. Responda a este mensaje con Si para confirmar. Responda a este mensaje con No para denegar.`;
    await conn.sendMessage(m.chat, { text: pruebaXd }, { quoted: m });
  }
};

handler.before = async (m, { conn }) => {
  const userData = tempStorage[m.sender.id];
  if (!userData || !userData.esperando) return;
  if (m.quoted && m.quoted.id === userData.mensajeId) {
    const text = m.text.trim().toLowerCase();
    if (text === 'si') {
      await conn.sendMessage(m.chat, { text: 'Confirmado!' }, { quoted: m });
      delete tempStorage[m.sender.id];
    } else if (text === 'no') {
      await conn.sendMessage(m.chat, { text: 'Denegado!' }, { quoted: m });
      delete tempStorage[m.sender.id];
    } else {
      await conn.sendMessage(m.chat, { text: 'Opción inválida. Por favor, responde con Si o No.' }, { quoted: m });
    }
  }
};

handler.command = ['prueba'];

export default handler;
