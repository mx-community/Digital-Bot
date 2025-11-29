const handler = async (m, {conn, isAdmin, isOwner, args, usedPrefix, command}) => {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn);
throw false;
}
const isClose = { 'open': 'not_announcement', 'abrir': 'not_announcement', 'buka': 'not_announcement', 'on': 'not_announcement', '1': 'not_announcement', 'close': 'announcement', 'cerrar': 'announcement', 'tutup': 'announcement', 'off': 'announcement', '0': 'announcement', }[(args[0] || '')];
if (isClose === undefined) {
const mensaje = `Ingrese el comando mas la opcion y el tiempo deseado para cerrar o abrir.\n\n• *Por ejemplo:*\n${usedPrefix + command} abrir 3\n${usedPrefix + command} cerrar 3`;
conn.sendMessage(m.chat, { text: mensaje }, { quoted: m });
throw false;
}
const timeoutset = 86400000 * args[1] / 24;
await conn.groupSettingUpdate(m.chat, isClose).then(async (_)=> {
conn.sendMessage(m.chat, { text: `✓  Se ha ${isClose == 'announcement' ? 'cerrado' : 'abierto'} el grupo${args[1] ? ` durante ${clockString(timeoutset)} hora/s` : '.'} ` }, { quoted: m });
});
if (args[1]) {
setTimeout(async () => {
await conn.groupSettingUpdate(m.chat, `${isClose == 'announcement' ? 'not_announcement' : 'announcement'}`).then(async (_)=>{
conn.sendMessage(m.chat, { text: `✓  El grupo se ha ${isClose == 'not_announcement' ? 'cerrado, solo los administradores del grupo pueden hablar.' : 'abierto, ahora todos los miembros pueden hablar.'}` }, { quoted: m });
});
}, timeoutset);
}
};

handler.command = ["gtime", "grouptime"]
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
export default handler;

function clockString(ms) {
const h = Math.floor(ms / 3600000);
const m = Math.floor(ms / 60000) % 60;
const s = Math.floor(ms / 1000) % 60;
console.log({ms, h, m, s});
return [h, m, s].map((v) => v.toString().padStart(2, 0) ).join(':');
}
