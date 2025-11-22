let tempStorage = {};

const handler = async (m, { conn, command, usedPrefix, text }) => {
  if (command === 'prueba') {
    tempStorage[m.sender.id] = { esperando: true };
    let pruebaXd = `Mensaje de Prueba. Responda a este mensaje con Si para confirmar. Responda a este mensaje con No para denegar.`;
    await conn.sendMessage(m.chat, { text: pruebaXd }, { quoted: m });
  }
};

handler.before = async (m, { conn }) => {
  const userData = tempStorage[m.sender.id];
  if (!userData || !userData.esperando) return;
  const text = m.text.trim().toLowerCase();
  if (text === 'si') {
    await conn.sendMessage(m.chat, { text: 'Confirmado!' }, { quoted: m });
    delete tempStorage[m.sender.id];
  } else if (text === 'no') {
    await conn.sendMessage(m.chat, { text: 'Denegado!' }, { quoted: m });
    delete tempStorage[m.sender.id];
  } else {
    await conn.sendMessage(m.chat, { text: 'Opción no válida. Por favor, responde con Si o No.' }, { quoted: m });
    // No se elimina la propiedad esperando para que el usuario pueda responder de nuevo
  }
};

handler.command = ['prueba'];

export default handler;
