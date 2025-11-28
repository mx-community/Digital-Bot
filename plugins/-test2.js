import fetch from 'node-fetch'
const handler = async (m, { conn, command, args usedPrefix, text }) => {
const user = global.db.data.users[m.sender] || {};
const name = await conn.getName(m.sender);

if (command === "rw" || command === "c" || command === "claim" || command === "harem" || command === "votec" || command === "wimage" || command === "winfo") {
let infoXd = `\t〤  *U P D A T E*

📍 \`\`\`Estos comandos estan en actualización, esperamos y puedas comprender.\`\`\``
await conn.reply(m.chat, infoXd, m)
};

};

handler.command = ['rw', 'c', 'claim', 'harem', 'votec', 'wimage', 'winfo'];

export default handler;
