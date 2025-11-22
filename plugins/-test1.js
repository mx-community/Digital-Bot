let esperaRespuesta = {};

const handler = async (m, { conn, command, usedPrefix, text }) => {
  if (command === 'prueba') {
    esperaRespuesta[m.sender.id] = true;
    let pruebaXd = `Mensaje de Prueba. Responda a este mensaje con Si para confirmar. Responda a este mensaje con No para denegar.`;
    await conn.sendMessage(m.chat, { text: pruebaXd }, { quoted: m });
  }
};

handler.before = async (m, { conn }) => {
  const text = m.text.trim().toLowerCase();
  if (esperaRespuesta[m.sender.id]) {
    if (text === 'si') {
      await conn.sendMessage(m.chat, { text: 'Confirmado!' }, { quoted: m });
      delete esperaRespuesta[m.sender.id];
    } else if (text === 'no') {
      await conn.sendMessage(m.chat, { text: 'Denegado!' }, { quoted: m });
      delete esperaRespuesta[m.sender.id];
    } else {
      await conn.sendMessage(m.chat, { text: 'Opción inválida. Por favor, responde con Si o No.' }, { quoted: m });
    }
    return true;
  }
  return true;
};

handler.command = ['prueba'];

export default handler;
