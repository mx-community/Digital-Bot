import fetch from 'node-fetch'
let handler = async function (m, { conn, args, groupMetadata, usedPrefix, command }) {
if (!m.isGroup) return conn.sendMessage(m.chat, { text: `📍  Este comando solo puede usarse en grupos.` }, { quoted: m })

const participantes = groupMetadata?.participants || []

participantes.sort((a, b) => (a.id > b.id ? 1 : -1))
const porPagina = 20
const paginaSolicitada = Number(args[0]) || 1
const totalPaginas = Math.ceil(participantes.length / porPagina)
if (paginaSolicitada < 1 || paginaSolicitada > totalPaginas) {
return m.reply(`📍  La pagina no existe, ingrese el comando *${usedPrefix + command} 1 al ${totalPaginas}*`)
}

const inicio = (paginaSolicitada - 1) * porPagina
const fin = inicio + porPagina
const paginaActual = participantes.slice(inicio, fin)

const tarjetas = paginaActual.map((p, index) => {
const jid = p.id
const username = '@' + jid.split('@')[0]

 
const lid = p.lid ? p.lid + '' : p.userLid ? p.userLid + '@lid' : 'Undefined'

const rol = p.admin === 'superadmin' ? 'Principal G.' : p.admin === 'admin' ? 'Admin G.' : 'Participante.'

return [
`🜲 Usuario #${inicio + index + 1} : ${username}`,
`✎ LID : *${lid}*`,
`⚶ Tipo : *${rol}*`,
].join('\n')
}).join('\n\n')

const mencionados = paginaActual.map(p => p.id)

const totalAdmins = participantes.filter(p => p.admin).length
const totalMiembros = participantes.length - totalAdmins

const thumb = Buffer.from(await (await fetch(`${global.mMages}`)).arrayBuffer())
 
const texto = `
\t〨  [ ${groupMetadata.subject} ]

⚶ Participantes : *${participantes.length}*
⚶ Admins : *${totalAdmins}*

----

${tarjetas}

> 📍  Puede usar *${usedPrefix + command} 2* para ver la siguiente pagina.`

return conn.sendMessage(m.chat, { text: texto, mentions: [mencionados], contextInfo: { externalAdReply: { 
title: botname, 
body: textbot, 
thumbnail: thumb, 
sourceUrl: null, 
mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
 
 //await conn.sendMessage(m.chat, { image: { url: thumb }, caption: texto, mentions: mencionados }, { quoted: m })
}

handler.command = ['lids']
handler.help = ['lids']
handler.tags = ['group']
handler.group = true

export default handler
