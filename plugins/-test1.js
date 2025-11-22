let esperaRespuesta = {};

const handler = async (m, { conn, command, usedPrefix, text }) => {
  if (command === 'prueba') {
    let id = m.sender.id + m.chat.id;
    esperaRespuesta[id] = { esperando: true, mensaje: m };
    let pruebaXd = `Mensaje de Prueba. Responda a este mensaje con Si para confirmar. Responda a este mensaje con No para denegar.`;
    await conn.sendMessage(m.chat, { text: pruebaXd }, { quoted: m });
  } else {
    let id = m.sender.id + m.chat.id;
    if (esperaRespuesta[id] && esperaRespuesta[id].esperando) {
      if (m.text.toLowerCase() === 'si') {
        await conn.sendMessage(m.chat, { text: 'Confirmado!' }, { quoted: m });
      } else if (m.text.toLowerCase() === 'no') {
        await conn.sendMessage(m.chat, { text: 'Denegado!' }, { quoted: m });
      } else {
        await conn.sendMessage(m.chat, { text: 'Opción inválida. Por favor, responde con Si o No.' }, { quoted: m });
        return;
      }
      delete esperaRespuesta[id];
    }
  }
};

handler.command = ['prueba'];

export default handler;
