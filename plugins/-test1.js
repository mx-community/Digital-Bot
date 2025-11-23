import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, usedPrefix }) => {
let who;

if (m.mentionedJid.length > 0) {
who = m.mentionedJid[0];
} else if (m.quoted) {
who = m.quoted.sender;
} else {
who = m.sender;
}

let name = conn.getName(who);
let name2 = conn.getName(m.sender);
let str;

//Comienzo de comandos.
//Golpear
if (command === "punch" || command === "pegar") {
if (m.mentionedJid.length > 0) {
str = `\`${name2}\` *golpeó a* \`${name || who}\`.`;
} else if (m.quoted) {
str = `\`${name2}\` *coñazio a* \`${name || who}\`.`;
} else {
str = `\`${name2}\` *se golpeó a sí mismo.*`.trim();
}

if (m.isGroup) { 
punch = [ 'https://telegra.ph/file/8e60a6379c1b72e4fbe0f.mp4', 'https://telegra.ph/file/8ac9ca359cac4c8786194.mp4', 'https://telegra.ph/file/cc20935de6993dd391af1.mp4', 'https://telegra.ph/file/9c0bba4c6b71979e56f55.mp4', 'https://telegra.ph/file/5d22649b472e539f27df9.mp4', 'https://telegra.ph/file/804eada656f96a04ebae8.mp4', 'https://telegra.ph/file/3a2ef7a12eecbb6d6df53.mp4', 'https://telegra.ph/file/c4c27701496fec28d6f8a.mp4', 'https://telegra.ph/file/c8e5a210a3a34e23391ee.mp4', 'https://telegra.ph/file/70bac5a760539efad5aad.mp4' ];
const video = punch[Math.floor(Math.random() * punch.length)];
let mentions = [who];
conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
 }
}

//Kiss
if (command === "kiss" || command === "beso") {
if (m.mentionedJid.length > 0) {
str = `\`${name2}\` *beso a* \`${name || who}\`.`;
} else if (m.quoted) {
str = `\`${name2}\` *se beso a* \`${name || who}\`.`;
} else {
str = `\`${name2}\` *se beso a sí mismo/a.*`.trim();
}

if (m.isGroup) { 
let kiss = [ 'https://media.tenor.com/_8oadF3hZwIAAAPo/kiss.mp4', 'https://media.tenor.com/cQzRWAWrN6kAAAPo/ichigo-hiro.mp4', 'https://media.tenor.com/kmxEaVuW8AoAAAPo/kiss-gentle-kiss.mp4', 'https://media.tenor.com/NO6j5K8YuRAAAAPo/leni.mp4', 'https://media.tenor.com/xYUjLVz6rJoAAAPo/mhel.mp4', 'https://media.tenor.com/ZDqsYLDQzIUAAAPo/shirayuki-zen-kiss-anime.mp4', 'https://media.tenor.com/LrKmxrDxJN0AAAPo/love-cheek.mp4', 'https://media.tenor.com/lyuW54_wDU0AAAPo/kiss-anime.mp4' ];

punch = [ 'https://telegra.ph/file/8e60a6379c1b72e4fbe0f.mp4', 'https://telegra.ph/file/8ac9ca359cac4c8786194.mp4', 'https://telegra.ph/file/cc20935de6993dd391af1.mp4', 'https://telegra.ph/file/9c0bba4c6b71979e56f55.mp4', 'https://telegra.ph/file/5d22649b472e539f27df9.mp4', 'https://telegra.ph/file/804eada656f96a04ebae8.mp4', 'https://telegra.ph/file/3a2ef7a12eecbb6d6df53.mp4', 'https://telegra.ph/file/c4c27701496fec28d6f8a.mp4', 'https://telegra.ph/file/c8e5a210a3a34e23391ee.mp4', 'https://telegra.ph/file/70bac5a760539efad5aad.mp4' ];
const video = kiss[Math.floor(Math.random() * kiss.length)];
let mentions = [who];
conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
 }
}





}

handler.help = ['punch'];
handler.tags = ['anime'];
handler.command = ['punch', 'pegar', 'kiss', 'beso'];
handler.group = true;

export default handler;

                          
