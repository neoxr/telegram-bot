let lyricsParse = require('lyrics-parse')
let { decode } = require('html-entities')
exports.run = {
	usage: ['lirik'],
	async : async (data, { client, _func, text, isPrefix, command }) => {
	try {
		await client.presence('typing')
		if (!text) return client.reply(`${_func.format.mono('Contoh')} : ${isPrefix + command} lathi`)
		let { message_id } = await client.reply(_func.status.getdata)
		let lyrics = await lyricsParse(text, '')
		await client.presence('typing')
		lyrics ? client.reply(unescape(decode(lyrics))) : client.reply(_func.status.fail)
		client.remove(message_id)
	} catch {
		return client.reply(_func.status.error)
	}},
	error: false
}
