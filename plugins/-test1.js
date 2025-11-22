let esperaRespuesta = {};

const handler = async (m, { conn }) => {
  if (m.text.startsWith('#prueba')) {
    try {
      const id = `${m.chat.id}_${m.sender.id}`;
      esperaRespuesta[id] = true;
      let pruebaXd = `Mensaje de Prueba. Responda a este mensaje con Si para confirmar. Responda a este mensaje con No para denegar.`;
      await conn.sendMessage(m.chat.id, { text: pruebaXd }, { quoted: m });
    } catch (error) {
      console.log('Error al enviar mensaje:', error);
    }
  } else {
    try {
      const id = `${m.chat.id}_${m.sender.id}`;
      if (esperaRespuesta[id]) {
        const text = m.text.trim().toLowerCase();
        if (text === 'si') {
          await conn.sendMessage(m.chat.id, { text: 'Confirmado!' }, { quoted: m });
          delete esperaRespuesta[id];
        } else if (text === 'no') {
          await conn.sendMessage(m.chat.id, { text: 'Denegado!' }, { quoted: m });
          delete esperaRespuesta[id];
        } else {
          await conn.sendMessage(m.chat.id, { text: 'Opción inválida. Por favor, responde con Si o No.' }, { quoted: m });
        }
      }
    } catch (error) {
      console.log('Error en else:', error);
    }
  }
};

handler.command = [];

export default handler;
