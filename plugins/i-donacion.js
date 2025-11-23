import fetch from 'node-fetch'
let tempStorage = {};
const handler = async (m, { conn, command, usedPrefix, text }) => {
if (command === 'donate' || command === 'donar') {
tempStorage[m.sender.id] = { esperando: true, timestamp: Date.now() };
const thumb = Buffer.from(await (await fetch(`${global.mMages}`)).arrayBuffer())
let donaXd = `\t〨  *D O N A T E*

\t⸭ 💡 \`\`\`Donacion voluntaria.\`\`\`
- Responda a este mensaje con los siguientes.

\t\tM > *(mercado pago)*
\t\tB > *(brubank)*
\t\tP > *(paypal)*

⏰ \`\`\`10 segundos de espera.\`\`\``;
await conn.sendMessage(m.chat, { text: donaXd, mentions: [m.sender], contextInfo: { externalAdReply: { 
title: "々  D O N A T E  々", 
body: botname, 
thumbnail: thumb, 
sourceUrl: null, 
mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
//await conn.sendMessage(m.chat, { text: donaXd }, { quoted: m });
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
if (text === 'm') {
let mercado = `·─┄ · ✦ *Donación : Pago* ✦ ·

💡  Agradecemos que puedas hacer una pequeña donación voluntaria, esperamos y darle el mejor servicio.
- No es obligatorio, por ende si cambias de opinión, esta bien.

• *Plataforma:* Mercado Pago
• *ALIAS:* mp.toru
• *CVU:* 0000003100081371412489`;
await conn.sendMessage(m.chat, { text: mercado }, { quoted: m });
delete tempStorage[m.sender.id];
} else if (text === 'b') {
let brunkss = `·─┄ · ✦ *Donación : Pago* ✦ ·

💡  Agradecemos que puedas hacer una pequeña donación voluntaria, esperamos y darle el mejor servicio.
- No es obligatorio, por ende si cambias de opinión, esta bien.

• *Plataforma:* Brubank
• *ALIAS:* mdmx.mktg
• *CVU:* 1430001713041561100019`;
await conn.sendMessage(m.chat, { text: brunkss }, { quoted: m });
delete tempStorage[m.sender.id];
} else if (text === 'p') {
let pays = `·─┄ · ✦ *Donación : Pago* ✦ ·

💡  Agradecemos que puedas hacer una pequeña donación voluntaria, esperamos y darle el mejor servicio.
- No es obligatorio, por ende si cambias de opinión, esta bien.

• *Plataforma:* PayPal
• *Enlace:* https://www.paypal.me/aJosueUSDpaypal`;
await conn.sendMessage(m.chat, { text: pays }, { quoted: m });
} else {
await conn.sendMessage(m.chat, { text: '\t〨  *D O N A T E*\n\n\t⸭ 📍 ```Opcion no valida.```\n- Responda únicamente con *"c"*, *"b"* o *"p"*.' }, { quoted: m });
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

handler.command = ['donate', 'donar'];

export default handler;
