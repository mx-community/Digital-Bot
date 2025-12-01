import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, usedPrefix, command }) => {
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
str = `💪🏻 \`${name2}\` *golpeó a* \`${name || who}\`.`;
} else if (m.quoted) {
str = `💪🏻 \`${name2}\` *golpeo a* \`${name || who}\`.`;
} else {
str = `💪🏻 \`${name2}\` *se golpeó a sí mismo.*`.trim();
}

if (m.isGroup) { 
let punch = [ 'https://telegra.ph/file/8e60a6379c1b72e4fbe0f.mp4', 'https://telegra.ph/file/8ac9ca359cac4c8786194.mp4', 'https://telegra.ph/file/cc20935de6993dd391af1.mp4', 'https://telegra.ph/file/9c0bba4c6b71979e56f55.mp4', 'https://telegra.ph/file/5d22649b472e539f27df9.mp4', 'https://telegra.ph/file/804eada656f96a04ebae8.mp4', 'https://telegra.ph/file/3a2ef7a12eecbb6d6df53.mp4', 'https://telegra.ph/file/c4c27701496fec28d6f8a.mp4', 'https://telegra.ph/file/c8e5a210a3a34e23391ee.mp4', 'https://telegra.ph/file/70bac5a760539efad5aad.mp4' ];
const video = punch[Math.floor(Math.random() * punch.length)];
let mentions = [who];
conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
 }
}


//Kiss
if (command === "kiss" || command === "beso") {
if (m.mentionedJid.length > 0) {
str = `❤️ \`${name2}\` *beso a* \`${name || who}\`.`;
} else if (m.quoted) {
str = `❤️ \`${name2}\` *se beso a* \`${name || who}\`.`;
} else {
str = `❤️ \`${name2}\` *se beso a sí mismo/a.*`.trim();
}

if (m.isGroup) { 
let kiss = [ 'https://media.tenor.com/_8oadF3hZwIAAAPo/kiss.mp4', 'https://media.tenor.com/cQzRWAWrN6kAAAPo/ichigo-hiro.mp4', 'https://media.tenor.com/kmxEaVuW8AoAAAPo/kiss-gentle-kiss.mp4', 'https://media.tenor.com/NO6j5K8YuRAAAAPo/leni.mp4', 'https://media.tenor.com/xYUjLVz6rJoAAAPo/mhel.mp4', 'https://media.tenor.com/ZDqsYLDQzIUAAAPo/shirayuki-zen-kiss-anime.mp4', 'https://media.tenor.com/LrKmxrDxJN0AAAPo/love-cheek.mp4', 'https://media.tenor.com/lyuW54_wDU0AAAPo/kiss-anime.mp4' ];
const video = kiss[Math.floor(Math.random() * kiss.length)];
let mentions = [who];
conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
 }
}

//preg
if (command === "preg" || command === "preñar") {
if (m.mentionedJid.length > 0) {
str = `❤️ \`${name2}\` *embarazó a* \`${name || who}\`.`;
} else if (m.quoted) {
str = `❤️ \`${name2}\` *embarazó a* \`${name || who}\`.`;
} else {
str = `❤️ \`${name2}\` *se embarazo a sí mismo/a.*`.trim();
}

if (m.isGroup) { 
let pregg = [ 'https://files.catbox.moe/tb5mah.mp4', 'https://files.catbox.moe/49hszx.mp4', 'https://files.catbox.moe/5wba6r.mp4', 'https://files.catbox.moe/tv04zm.mp4' ];
 //[ 'https://files.catbox.moe/6elx4y.jpg', 'https://files.catbox.moe/q548zn.jpg', 'https://files.catbox.moe/93r4km.jpg' ];
const imagen = pregg[Math.floor(Math.random() * pregg.length)];
let mentions = [who];
//conn.sendMessage(m.chat, { image: { url: imagen }, caption: str, mentions: mentions }, { quoted: m })
 conn.sendMessage(m.chat, { video: { url: imagen }, gifPlayback: true, caption: str, mentions }, { quoted: m });
 }
}


//Hug
if (command === "hug" || command === "abrazo") {
if (m.mentionedJid.length > 0) {
str = `🫂 \`${name2}\` *abrazo a* \`${name || who}\`.`;
} else if (m.quoted) {
str = `🫂 \`${name2}\` *abrazo a* \`${name || who}\`.`;
} else {
str = `🫂 \`${name2}\` *se abraza asi mismo/a.*`.trim();
}

if (m.isGroup) { 
let hug = [ 'https://media.tenor.com/20DCjTUJnsMAAAPo/hugging-each-other-david-martinez.mp4', 'https://media.tenor.com/c6BBsLFmn7AAAAPo/chuunibyou-hug.mp4', 'https://media.tenor.com/UWdOymsSvFkAAAPo/bna-hug-bna.mp4', 'https://media.tenor.com/x7El3HRvEHEAAAPo/kon-hug.mp4', 'https://media.tenor.com/gqC-f_diA9EAAAPo/jujutsu-kaisen-hug.mp4', 'https://media.tenor.com/I6YEqtV4gv8AAAPo/anime-hug-hug.mp4', 'https://media.tenor.com/8o4fWGwBY1EAAAPo/aharensan-aharen.mp4', 'https://media.tenor.com/ifQBuYGBX1AAAAPo/levi-love.mp4' ];
const video = hug[Math.floor(Math.random() * hug.length)];
let mentions = [who];
conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
 }
}

//kill
if (command === "kill" || command === "matar") {
if (m.mentionedJid.length > 0) {
str = `🔪 \`${name2}\` *mato a* \`${name || who}\`.`;
} else if (m.quoted) {
str = `🔪 \`${name2}\` *mato a* \`${name || who}\`.`;
} else {
str = `🔪 \`${name2}\` *se mata asi mismo/a.*`.trim();
}

if (m.isGroup) { 
let kill = [ 'https://media.tenor.com/jrnH6CdNne0AAAPo/2s.mp4', 'https://media.tenor.com/NbBCakbfZnkAAAPo/die-kill.mp4', 'https://media.tenor.com/SIrXZQWK9WAAAAPo/me-friends.mp4', 'https://media.tenor.com/Ay1Nm0X2VP8AAAPo/falling-from-window-anime-death.mp4', 'https://media.tenor.com/rblZGXCYSmAAAAPo/akame.mp4', 'https://media.tenor.com/dtXcyLvxLLkAAAPo/akame.mp4', 'https://media.tenor.com/WakyzIJP0t0AAAPo/angels-of-death-anime-boy-bandage.mp4', 'https://media.tenor.com/wa_191SsAEwAAAPo/nana-anime.mp4' ];
const video = kill[Math.floor(Math.random() * kill.length)];
let mentions = [who];
conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
 }
}

//poke
if (command === "poke" || command === "picar") {
if (m.mentionedJid.length > 0) {
str = `📌 \`${name2}\` *pico a* \`${name || who}\`.`;
} else if (m.quoted) {
str = `📌 \`${name2}\` *pico a* \`${name || who}\`.`;
} else {
str = `📌 \`${name2}\` *se pica a sí mismo/a.*`.trim();
}

if (m.isGroup) { 
let poke = [ 'https://qu.ax/dzdVR.mp4', 'https://qu.ax/AXLDz.mp4', 'https://qu.ax/AJEfp.mp4', 'https://qu.ax/LEYfb.mp4', 'https://qu.ax/WNGYF.mp4', 'https://qu.ax/WFWaY.mp4', 'https://qu.ax/ditle.mp4', 'https://qu.ax/dzdVR.mp4' ];
const video = poke[Math.floor(Math.random() * poke.length)];
let mentions = [who];
conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
 }
}

//pat
if (command === "pat" || command === "acariciar") {
if (m.mentionedJid.length > 0) {
str = `❤️ \`${name2}\` *acarició a* \`${name || who}\`.`;
} else if (m.quoted) {
str = `❤️ \`${name2}\` *acarició a* \`${name || who}\`.`;
} else {
str = `❤️ \`${name2}\` *se acaricia solo/a.*`.trim();
}

if (m.isGroup) { 
let pat = [ 'https://telegra.ph/file/f75aed769492814d68016.mp4', 'https://telegra.ph/file/4f24bb58fe580a5e97b0a.mp4', 'https://telegra.ph/file/30206abdcb7b8a4638510.mp4', 'https://telegra.ph/file/ecd7aeae5b2242c660d41.mp4', 'https://telegra.ph/file/6d3ba201bcdd1fd2c1408.mp4', 'https://telegra.ph/file/d5dbdcf845d2739dbe45e.mp4', 'https://telegra.ph/file/c9a529908d4e0b71d7c5a.mp4', 'https://telegra.ph/file/b7bc277ddef1af913827c.mp4', 'https://telegra.ph/file/8b01e180dfb7e98d5a4f8.mp4', 'https://telegra.ph/file/901f13852aa65f9628d96.mp4'];
const video = kiss[Math.floor(Math.random() * kiss.length)];
let mentions = [who];
conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
 }
}

}

handler.help = ['punch'];
handler.tags = ['anime'];
handler.command = ['punch', 'pegar', 'kiss', 'beso', 'poke', 'picar', 'preg', 'embarazar', 'kill', 'matar', 'abrazo', 'hug'];
handler.group = true;

export default handler;


  
