let WAMessageStubType = (await import('@whiskeysockets/baileys')).default;
import fetch from 'node-fetch';
import PhoneValidator from '../lib/PhoneValidator.js';
const phoneValidator = new PhoneValidator();
function resolveLidToJid(rawId) {
if (!rawId) return null;

if (rawId.endsWith('@s.whatsapp.net')) return rawId;

if (rawId.endsWith('@lid')) {
const lidKey = rawId.replace('@lid', '');
const detection = phoneValidator.detectPhoneInLid(lidKey);

if (detection.isPhone && detection.jid) {
return detection.jid;
}

return rawId;
}

if (/^\d+$/.test(rawId)) {
return `${rawId}@s.whatsapp.net`;
}

return rawId;
}

async function getUserName(conn, jid) {
try {
const user = global.db.data.users[jid];
if (user && typeof user.name === 'string' && user.name.trim() && !/undef|undefined|null|nan/i.test(user.name)) {
return user.name.trim();
}

const contactName = await conn.getName(jid);
if (contactName) return contactName;

return jid.split('@')[0];
} catch {
return jid.split('@')[0];
}
}


export async function before(m, { conn, participants, groupMetadata }) {
if (!m.messageStubType || !m.isGroup) return true;

// Usa /tourl sobre una imagen para hacerla url y ponerla aquí si deseas cambiar dichas imágenes.
let imgWelcome = 'https://qu.ax/KoYAF.jpg';
let imgBye = 'https://qu.ax/KoYAF.jpgc';

let chat = global.db.data.chats[m.chat];
const getMentionedJid = () => {
return m.messageStubParameters.map(param => resolveLidToJid(param));
};

let whoRaw = m.messageStubParameters[0];
let who = resolveLidToJid(whoRaw);
let userName = await getUserName(conn, who);

let total = groupMetadata.participants.length;

if (chat.welcome && m.messageStubType === 27) {
await conn.sendMessage(m.chat, {
image: { url: imgWelcome },
caption: `\t〨  *ＢＩＥＮＶＥＮＩＤＯ*

\t⸭ 👋🏻 \`\`\`Bienvenido nuevo integrante, has el favor de leer las reglas.\`\`\`

\t⧡ Usuarios : @${who.split('@')[0]}
\t⧡ Participantes : *${total}* participantes

> ${textbot}`.trim(),
mentions: getMentionedJid()
}, { quoted: fkontak });
}

if (chat.welcome && (m.messageStubType === 28 || m.messageStubType === 32)) {
await conn.sendMessage(m.chat, {
image: { url: imgBye },
caption: `\t〨   *ＤＥＳＰＥＤＩＤＡ*

\t⸭ 👋🏻 \`\`\`Un participante ha salido.\`\`\`

\t⧡ Usuarios : @${who.split('@')[0]}
\t⧡ Participantes : *${total}* participantes

> ${textbot}`.trim(),
mentions: getMentionedJid()
}, { quoted: fkontak });
}
}


