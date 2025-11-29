import fetch from 'node-fetch';
import baileys from '@whiskeysockets/baileys';

const { generateWAMessageContent, generateWAMessageFromContent, proto } = baileys;

const STICKERLY_API = `https://delirius-apiofc.vercel.app/search/stickerly`;

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba lo que quiera buscar en Sticker.Ly\n\n• Por ejemplo:\n*${usedPrefix + command}* Caballo Juan` }, { quoted: m })
await m.react('⏰');

try {
const res = await fetch(`${STICKERLY_API}?query=${encodeURIComponent(text)}`);
const json = await res.json();

if (!json.status || !json.data || json.data.length === 0) {
return conn.sendMessage(m.chat, { text: `📍  No se han encontrado resultados.` }, { quoted: m });
}

const results = json.data.slice(0, 10);

async function createImage(url) {
const { imageMessage } = await generateWAMessageContent(
{ image: { url } },
{ upload: conn.waUploadToServer }
);
return imageMessage;
}

let cards = [];
for (let pack of results) {
let image = await createImage(pack.preview);

cards.push({
body: proto.Message.InteractiveMessage.Body.fromObject({
text: `\t\t⧡ Pack : ${pack.name}\n\t\t⧡ Autor : ${pack.author}\n\t\t⧡ Stickers : *${pack.sticker_count}* stickers\n\t\t⧡ Vistas : *${pack.view_count}* vistas\n\t\t⧡ Exports : *${pack.export_count}* exportados`
}),
footer: proto.Message.InteractiveMessage.Footer.fromObject({
text: botname
}),
header: proto.Message.InteractiveMessage.Header.fromObject({
title: '',
hasMediaAttachment: true,
imageMessage: image
}),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
buttons: [
{
name: 'cta_copy',
buttonParamsJson: JSON.stringify({
display_text: "Copiar 📥",
id: "sly",
copy_code: `#sly ${pack.url}`
})
}
]
})
});
}

const msg = generateWAMessageFromContent(m.chat, {
viewOnceMessage: {
message: {
messageContextInfo: {
deviceListMetadata: {},
deviceListMetadataVersion: 2
},
interactiveMessage: proto.Message.InteractiveMessage.fromObject({
body: proto.Message.InteractiveMessage.Body.create({
text: `\t〤  *S T I C K E R  :  L Y*\n\n- Busqueda : *${text}*\n- Resultados : *${results.length}* packs`
}),
footer: proto.Message.InteractiveMessage.Footer.create({
text: botname
}),
header: proto.Message.InteractiveMessage.Header.create({
hasMediaAttachment: false
}),
carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
cards
})
})
}
}
}, { quoted: m });

await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
await m.react('✅');

} catch (e) {
console.error(e);
await conn.reply(m.chat, `📍 ${e.message}`, m);
//m.reply('*Error en la búsqueda o envío del mensaje.*');
}
};

handler.help = ['stickerly <texto>'];
handler.tags = ['sticker', 'search'];
handler.command = ['stickerly', 'slys'];

export default handler;
