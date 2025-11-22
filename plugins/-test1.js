let tempStorage = {};

const handler = async (m, { conn, command, usedPrefix, text }) => {
  if (command === 'prueba') {
    tempStorage[m.sender.id] = { esperando: true, timestamp: Date.now() };
    let pruebaXd = `Mensaje de Prueba. Responda a este mensaje con Si para confirmar. Responda a este mensaje con No para denegar.`;
    await conn.sendMessage(m.chat, { text: pruebaXd }, { quoted: m });
  }
};

handler.before = async (m, { conn }) => {
  const userData = tempStorage[m.sender.id];
  if (!userData || !userData.esperando) return;
  const text = m.text.trim().toLowerCase();
  const tiempoTranscurrido = (Date.now() - userData.timestamp) / 1000;
  if (tiempoTranscurrido > 30) {
    await conn.sendMessage(m.chat, { text: 'Tiempo de espera agotado. Por favor, vuelve a intentarlo.' }, { quoted: m });
    delete tempStorage[m.sender.id];
    return;
  }
  if (text === 'si') {
    await conn.sendMessage(m.chat, { text: 'Confirmado!' }, { quoted: m });
    delete tempStorage[m.sender.id];
  } else if (text === 'no') {
    await conn.sendMessage(m.chat, { text: 'Denegado!' }, { quoted: m });
    delete tempStorage[m.sender.id];
  } else {
    await conn.sendMessage(m.chat, { text: 'Opción no válida. Por favor, responde con Si o No.' }, { quoted: m });
  }
  // Verificar si se debe eliminar el usuario después de una respuesta inválida
  if (tempStorage[m.sender.id] && tiempoTranscurrido > 30) {
    await conn.sendMessage(m.chat, { text: 'Tiempo de espera agotado. Por favor, vuelve a intentarlo.' }, { quoted: m });
    delete tempStorage[m.sender.id];
  }
};

// Agregar un intervalo para eliminar usuarios inactivos
setInterval(() => {
  Object.keys(tempStorage).forEach((id) => {
    const userData = tempStorage[id];
    if (userData.esperando && (Date.now() - userData.timestamp) / 1000 > 30) {
      delete tempStorage[id];
    }
  });
}, 1000); // Verificar cada segundo

handler.command = ['prueba'];

export default handler;
