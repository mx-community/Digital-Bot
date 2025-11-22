let handler = async (m, { args, text, command, usedPrefix, conn }) => {
if (!args[0]) {
return conn.sendMessage(m.chat, { text: `Ingrese el comando mas un enlace de un canal de WhatsApp y el texto para enviar una reaccion.\n\n• *Por ejemplo:*\n${usedPrefix + command} https://whatsapp.con/channel/ Hola` }, { quoted: m });
}
if (!args[0].startsWith("https://whatsapp.com/channel/")) {
return m.reply("No es un enlace válido.");
}
const mxReaccion = { a: '🅐', b: '🅑', c: '🅒', d: '🅓', e: '🅔', f: '🅕', g: '🅖', h: '🅗', i: '🅘', j: '🅙', k: '🅚', l: '🅛', m: '🅜', n: '🅝', o: '🅞', p: '🅟', q: '🅠', r: '🅡', s: '🅢', t: '🅣', u: '🅤', v: '🅥', w: '🅦', x: '🅧', y: '🅨', z: '🅩', '0': '⓿', '1': '➊', '2': '➋', '3': '➌', '4': '➍', '5': '➎', '6': '➏', '7': '➐', '8': '➑', '9': '➒' };
const alanmx = args.slice(1).join(' ').toLowerCase();
const alanjs = alanmx.split('').map(c => {
if (c === ' ') return '―';
return mxReaccion[c] || c;
}).join('');

try {
const link = args[0];
const channelId = link.split('/')[4];
const messageId = link.split('/')[5];
const res = await conn.newsletterMetadata("invite", channelId);
await conn.newsletterReactMessage(res.id, messageId, alanjs);
return conn.sendMessage(m.chat, { text: `✓  Se ha enviado la reaccion con exito al canal *${res.name}*.\n- Tu reaccion fue: ${alanjs}` }, { quoted: m });
} catch (e) {
console.error(e);
return await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m });
}};
handler.command = ["e-canal", "e-channel"]
export default handler
                    
