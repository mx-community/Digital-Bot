import fs from 'fs';
import archiver from 'archiver';
const handler = async (m, {conn, args, usedPrefix, command, text}) => {
let who
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text
else who = m.chat

if (command === 'base') {
//Base de datos simple
//conn.sendMessage(m.chat, { text: `ⴵ Procesando base de datos...` }, { quoted: m });
await m.react("⏰")
const db = await fs.readFileSync('./database.json');
return await conn.sendMessage(m.chat, {document: db, mimetype: 'application/json', fileName: 'database.json'}, {quoted: m});
await m.react("✅")
}

if (command === 'base2' || command === 'json') {
//Base de datos basado en programas.
const databaseFolder = './database';
const zipPath = './database_backup.zip';
let option = parseInt(text);
if (![1, 2].includes(option)) return await conn.sendMessage(m.chat, { text: `Debe de usar el comando de la siguiente manera.\n\n• *Por ejemplo:*\n#${command} cs\n#${command} db` }, { quoted: m });
try {
let d = new Date();
let date = d.toLocaleDateString('es', { day: 'numeric', month: 'long', year: 'numeric' });
if (option === 'cs') {  
const path = conn.user.jid !== global.conn.user.jid ? `./MdmxSesion/${conn.user.jid.split`@`[0]}/creds.json` : `./MdmxDirector/creds.json`;
if (!fs.existsSync(path)) return await conn.sendMessage(m.chat, { text: `✘ The 'creds.json' file does not exist...` }, { quoted: m });
let creds = fs.readFileSync(path);
await conn.sendMessage(m.chat, { text: `ⴵ Procesando archivo 'creds.json', aguarde....` }, { quoted: m });
await conn.sendMessage(m.sender, { document: creds, mimetype: 'application/json', fileName: `creds.json` }, { quoted: m });
} else if (option === 'db') { 
if (!fs.existsSync(databaseFolder)) return await conn.sendMessage(m.chat, { text: `✘ The 'database.json' file does not exist...` }, { quoted: m });
await conn.sendMessage(m.chat, { text: `ⴵ Procesando archivo 'database.json', aguarde...` }, { quoted: m });
const output = fs.createWriteStream(zipPath);
const archive = archiver('zip', { zlib: { level: 9 } });
output.on('close', async () => {
console.log(`New file: ${archive.pointer()} bytes`);
await conn.sendMessage(m.sender, { document: fs.readFileSync(zipPath), mimetype: 'application/zip', fileName: `database.zip` }, { quoted: m });
fs.unlinkSync(zipPath);
});
archive.on('error', (err) => { throw err; });
archive.pipe(output);
archive.directory(databaseFolder, false);
archive.finalize();
}
} catch (e) {
await conn.sendMessage(m.chat, { text: `📍 ${e.message}` }, { quoted: m })
console.log(e)
}
}

if (command === '-vip' || command === '-premium') {
if (!who) return conn.sendMessage(m.chat, { text: `Ingrese el comando y mensiona a un usuario premium para quitar su puesto premium.\n\n• *Por ejemplo:*\n${usedPrefix}${command} @${m.sender.split`@`[0]}`, mentions: [m.sender] }, { quoted: m });
if (!global.prems.includes(who.split`@`[0])) return conn.sendMessage(m.chat, { text: `📍  El usuario mensionado no es un usuario premium.\n- Busca usuarios premium con la lista: *${usedPrefix}list prem*` }, { quoted: m });
let index = global.prems.findIndex(v => (v.replace(/[^0-9]/g, '') + '@s.whatsapp.net') === (who.replace(/[^0-9]/g, '') + '@s.whatsapp.net'));
await m.react("⏰")
global.prems.splice(index, 1);
conn.sendMessage(m.chat, { text: `✅  El usuario @${who.split`@`[0]} fue descartado de los usuarios premium con exito.`, mentions: [who] }, { quoted: m });
await m.react("✅")
}

if (command === '-mod' || command === '-moderator') {
if (!who) return conn.sendMessage(m.chat, { text: `Ingrese el comando y mensiona a un usuario moderador para quitar su puesto moderador.\n\n• *Por ejemplo:*\n${usedPrefix}${command} @${m.sender.split`@`[0]}`, mentions: [m.sender] }, { quoted: m });
if (!global.mods.includes(who.split`@`[0])) return conn.sendMessage(m.chat, { text: `📍  El usuario mensionado no es un usuario moderador.\n- Busca usuarios moderadores con la lista: *${usedPrefix}list mod*` }, { quoted: m });
let index = global.mods.findIndex(v => (v.replace(/[^0-9]/g, '') + '@s.whatsapp.net') === (who.replace(/[^0-9]/g, '') + '@s.whatsapp.net'));
await m.react("⏰")
global.mods.splice(index, 1);
conn.sendMessage(m.chat, { text: `✅  El usuario @${who.split`@`[0]} fue descartado de los usuarios moderadores con exito.`, mentions: [who] }, { quoted: m });
await m.react("✅")
}

if (command === '-admin' || command === '-administrador') {
if (!who) return conn.sendMessage(m.chat, { text: `Ingrese el comando y mensiona a un usuario administrador del bot para quitar su puesto admin.\n\n• *Por ejemplo:*\n${usedPrefix}${command} @${m.sender.split`@`[0]}`, mentions: [m.sender] }, { quoted: m });
if (!global.owner.includes(who.split`@`[0])) return conn.sendMessage(m.chat, { text: `✅  El usuario mensionado no es un usuario administrador del bot.\n- Busca usuarios admins del bot con la lista: *${usedPrefix}list admin*` }, { quoted: m });
let index = global.owner.findIndex(v => (v.replace(/[^0-9]/g, '') + '@s.whatsapp.net') === (who.replace(/[^0-9]/g, '') + '@s.whatsapp.net'));
await m.react("⏰")
global.owner.splice(index, 1);
conn.sendMessage(m.chat, { text: `✓ _El usuario @${who.split`@`[0]} fue descartado de los usuarios administradores del con exito._`, mentions: [who] }, { quoted: m });
await m.react("✅")
}

};
handler.command = /^(ls|bs)$/i;
handler.owner = true;
export default handler;
                                       
