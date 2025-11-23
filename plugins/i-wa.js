import fetch from 'node-fetch'
const handler = async (m, { conn, command, args, usedPrefix, text }) => {
const user = global.db.data.users[m.sender] || {};
const name = await conn.getName(m.sender);

if (command === "info" || command === "infobot") {
let infoXd = `👋🏻 Hola usuario *@${name}*.
Espero y estes bien.

\t\t*${usedPrefix}creador*
> ╰• Información del propietario del bot.
\t\t*${usedPrefix}support*
> ╰• Envia mensaje de reporte, sugerencia o solicitud.
\t\t*${usedPrefix}donate*
> ╰• Donación voluntaria.
\t\t*${usedPrefix}tyc*
> ╰• Terminos y condiciones.

> ${textbot}`
await conn.reply(m.chat, infoXd, m)
};

if (command === "donate" || command === "donar") {
const thumb = Buffer.from(await (await fetch(`${global.mMages}`)).arrayBuffer())
let donaXd = `\t〨  *D O N A T E*

\t⸭ 💡 \`\`\`Donacion voluntaria.\`\`\`
- Ingrese los siguientes comandos a su preferencia..

\t\t#mp > *(mercado pago)*
\t\t#bk > *(brubank)*
\t\t#pay > *(paypal)*

> ${textbot}`;
await conn.sendMessage(m.chat, { text: donaXd, mentions: [m.sender], contextInfo: { externalAdReply: { 
title: "々  D O N A T E  々", 
body: botname, 
thumbnail: thumb, 
sourceUrl: null, 
mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m });
};

if (command === "mp") {
let mercado = `·─┄ · ✦ *Donación : Pago* ✦ ·

💡  Agradecemos que puedas hacer una pequeña donación voluntaria, esperamos y darle el mejor servicio.
- No es obligatorio, por ende si cambias de opinión, esta bien.

• *Plataforma:* Mercado Pago
• *ALIAS:* mp.toru
• *CVU:* 0000003100081371412489`;
await conn.sendMessage(m.chat, { text: mercado }, { quoted: m });
};

if (command === "bk") {
let brunkss = `·─┄ · ✦ *Donación : Pago* ✦ ·

💡  Agradecemos que puedas hacer una pequeña donación voluntaria, esperamos y darle el mejor servicio.
- No es obligatorio, por ende si cambias de opinión, esta bien.

• *Plataforma:* Brubank
• *ALIAS:* mdmx.mktg
• *CVU:* 1430001713041561100019`;
await conn.sendMessage(m.chat, { text: brunkss }, { quoted: m });
};

if (command === "pay") {
let pays = `·─┄ · ✦ *Donación : Pago* ✦ ·

💡  Agradecemos que puedas hacer una pequeña donación voluntaria, esperamos y darle el mejor servicio.
- No es obligatorio, por ende si cambias de opinión, esta bien.

• *Plataforma:* PayPal
• *Enlace:* https://www.paypal.me/aJosueUSDpaypal`;
await conn.sendMessage(m.chat, { text: pays }, { quoted: m });
};

if (command === "creador") {
let toruWa = `👋🏻  Hola usuario @${name}, lamentablemente el propietario del bot no tiene un enlace fijo de contacto.
Vuelva mas tarde.`;
await conn.sendMessage(m.chat, { text: toruWa }, { quoted: m });
};

if (command === "tyc" || command === "terminos") {
let terminos = `📍  No se aplicaron terminos aun.`;
await conn.reply(m.chat, terminos.trim(), m);
};

if (command === "support" || command === "soporte") {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba su sugerencia, sea nuevos comandos, aportes, colaboracion, entre otras cosas.\n\n• *Por ejemplo:*\n${usedPrefix + command} El comando #menu esta fallando.` }, { quoted: m });
let teks = `·─┄ · ✦ *Reporte : Usuario* ✦ ·
\t\t⧡ Numero : wa.me/${m.sender.split`@`[0]}
\t\t⧡ Mensaje : ${text}

> 📍  Use el comando *#respuesta* para opciones.`
conn.reply('5493873655135@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, null, { contextInfo: { mentionedJid: [m.sender] }})
conn.reply('5493873579805@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, null, { contextInfo: { mentionedJid: [m.sender] }})
await conn.sendMessage(m.chat, { text: `✓  Se ha enviado tu sugerencia a los de desarrolladores de esta comunidad.\n- Tendras respuesta cuanto antes, de ser una broma o otro intento, se te ignorara.` }, { quoted: m })
};


};

handler.command = ['info', 'infobot', 'donate', 'donar', 'mp', 'bk', 'pay', 'creador', 'tyc', 'terminos', 'support', 'soporte'];

export default handler;
  
