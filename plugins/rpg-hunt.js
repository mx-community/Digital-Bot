import fetch from 'node-fetch'
import moment from 'moment-timezone'

let handler = async (m, { conn, usedPrefix, command }) => {
if (!db.data.chats[m.chat].fRpg && m.isGroup) {
return conn.sendMessage(m.chat, { text: `⦗ ᗢ ⦘ El comando *${usedPrefix + command}* está desactivado en este grupo.\n- Activalo si eres admin de la siguiente manera.\n\n• Por ejemplo:\n*${usedPrefix}f-rpg on*` }, { quoted: m })
}

let thumb
let perdidas
let iconicos
let user = global.db.data.users[m.sender]
if (!user) {
global.db.data.users[m.sender] = { exp: 0, coin: 0, health: 100, lastHunt: 0 }
user = global.db.data.users[m.sender]
}
user.coin = user.coin || 0
user.exp = user.exp || 0
user.health = user.health || 100
user.lastHunt = user.lastHunt || 0  
if (user.health < 5)
return conn.reply(m.chat, `📍  No tienes la salud suficiente para usar este comando.\n- Usa *#curar* para aumentar tu salud.`, m)
const cooldown = 15 * 60 * 1000
const now = Date.now()
if (now < user.lastHunt) {
const restante = user.lastHunt - now
return conn.reply(m.chat, `📍  Debes esperar *${formatTime(restante)}* para volver a usar el comando.`, m)
}
user.lastHunt = now + cooldown
const evento = pickRandom(eventos)
let monedas, experiencia, salud
if (evento.tipo === 'victoria') {
thumb = Buffer.from(await (await fetch(`https://qu.ax/xOFra.jpg`)).arrayBuffer())
perdidas = "+"
iconicos = "🗡️"
monedas = Math.floor(Math.random() * 10001) + 1000
experiencia = Math.floor(Math.random() * 91) + 30
salud = Math.floor(Math.random() * 5) + 3
user.coin += monedas
user.exp += experiencia
user.health -= salud
} else {
thumb = Buffer.from(await (await fetch(`https://qu.ax/OlnDv.jpg`)).arrayBuffer())
perdidas = "-"
iconicos = "❌"
monedas = Math.floor(Math.random() * 2001) + 4000
experiencia = Math.floor(Math.random() * 41) + 30
salud = Math.floor(Math.random() * 5) + 3
user.coin -= monedas
user.exp -= experiencia
user.health -= salud
if (user.coin < 0) user.coin = 0
if (user.exp < 0) user.exp = 0
}
if (user.health < 0) user.health = 0
let exitoXd = `\t〤  *H U N T  :  R P G*

\t⸭ ${iconicos} ${evento.mensaje}

\t\t⚶ ${currency} : *${perdidas}${monedas.toLocaleString()}*
\t\t⚶ ${currency2} : *${perdidas}${experiencia.toLocaleString()}*

> ${textbot}`
conn.reply(m.chat, exitoXd, m)
}

handler.tags = ['rpg']
handler.help = ['cazar', 'hunt']
handler.command = ['cazar', 'hunt']
handler.group = true

export default handler

function formatTime(ms) {
const totalSec = Math.ceil(ms / 1000)
const min = Math.floor((totalSec % 3600) / 60)
const sec = totalSec % 60
const parts = []
if (min > 0) parts.push(`${min} minuto${min !== 1 ? 's' : ''}`)
parts.push(`${sec} segundo${sec !== 1 ? 's' : ''}`)
return parts.join(' ')
}
function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]
}
const eventos = [
{ tipo: 'victoria', mensaje: '¡Con gran valentía, lograste cazar un Oso! La caza fue intensa, pero tu habilidad te llevó a la victoria, ganaste.' },
{ tipo: 'victoria', mensaje: '¡Has cazado un Tigre feroz! Tras una persecución electrizante, triunfaste, ganaste.' },
{ tipo: 'victoria', mensaje: 'Lograste cazar un Elefante con astucia y persistencia. Fue un reto, pero lo lograste, ganaste.' },
{ tipo: 'victoria', mensaje: '¡Has cazado un Panda! La caza fue tranquila, pero exitosa, ganaste.' },
{ tipo: 'victoria', mensaje: 'Cazaste un Jabalí tras un rastreo emocionante. ¡Buen trabajo! ganaste.' },
{ tipo: 'victoria', mensaje: 'Con gran destreza, atrapaste un Cocodrilo. ¡Una hazaña impresionante! ganaste.' },
{ tipo: 'victoria', mensaje: '¡Has cazado un Gallo! No fue difícil, pero sigue siendo una victoria, ganaste.' },
{ tipo: 'victoria', mensaje: 'Con paciencia lograste cazar un Caballo. ¡Bien hecho! ganaste.' },
{ tipo: 'victoria', mensaje: 'Localizaste un grupo de ciervos y capturaste al más robusto. Tu puntería fue impecable, ganaste.' },
{ tipo: 'victoria', mensaje: 'Te internaste en la niebla del bosque y cazaste un zorro plateado que nadie había logrado atrapar, ganaste.' },
{ tipo: 'derrota', mensaje: 'Tu presa se escapó y no lograste cazar nada esta vez, perdiste.' },
{ tipo: 'derrota', mensaje: 'Tropezaste mientras apuntabas y la presa huyó. Tu esfuerzo fue en vano, perdiste.' },
{ tipo: 'derrota', mensaje: 'Un rugido te distrajo y no lograste dar en el blanco, perdiste.' },
{ tipo: 'derrota', mensaje: 'Tu arco se rompió justo en el momento crucial. Sin herramienta, fallaste, perdiste.' },
{ tipo: 'derrota', mensaje: 'Un aguacero repentino arruinó tu ruta de caza. Regresaste sin recompensa, perdiste.' }
]

  
