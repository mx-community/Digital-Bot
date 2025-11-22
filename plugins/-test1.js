let esperaRespuesta = {};

const handler = async (m, { conn, command, usedPrefix, text }) => {
  console.log('Comando recibido:', command);
  console.log('ID del remitente:', m.sender.id);
  console.log('ID del chat:', m.chat.id);

  if (command === 'prueba') {
    try {
      esperaRespuesta[m.sender.id] = true;
      let pruebaXd = `Mensaje de Prueba. Responda a este mensaje con Si para confirmar. Responda a este mensaje con No para denegar.`;
      console.log('Enviando mensaje...');
      let enviado = await conn.sendMessage(m.chat.id, { text: pruebaXd }, { quoted: m });
      console.log('Mensaje enviado:', enviado);
    } catch (error) {
      console.log('Error al enviar mensaje:', error);
    }
  }
};

handler.before = async (m, { conn }) => {
  try {
    console.log('Before ejecutado');
    const text = m.text.trim().toLowerCase();
    console.log('Texto recibido:', text);
    if (esperaRespuesta[m.sender.id]) {
      console.log('Respuesta esperada');
      if (text === 'si') {
        await conn.sendMessage(m.chat.id, { text: 'Confirmado!' }, { quoted: m });
        delete esperaRespuesta[m.sender.id];
      } else if (text === 'no') {
        await conn.sendMessage(m.chat.id, { text: 'Denegado!' }, { quoted: m });
        delete esperaRespuesta[m.sender.id];
      } else {
        await conn.sendMessage(m.chat.id, { text: 'Opción inválida. Por favor, responde con Si o No.' }, { quoted: m });
      }
      return true;
    }
  } catch (error) {
    console.log('Error en before:', error);
  }
  return true;
};

handler.command = ['prueba'];

export default handler;
