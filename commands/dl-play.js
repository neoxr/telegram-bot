let { decode } = require('html-entities')
let yts = require('yt-search')
exports.run = {
	usage: ['play'],
	async : async (data, { client, _func, text, isPrefix, command }) => {
	try {
		await client.presence('typing')
		if (!text) return client.reply(`${_func.format.bold('Contoh')} : ${isPrefix + command} seize day`)
		let { message_id } = await client.reply(_func.status.getdata)
		let ytsearch = await yts(text)
		let yt = ytsearch.all.find(video => video.seconds < 300) // =< 5 min :v
		let json = await _func.fetchJson(global.API('neoxr', '/yt', { url: 'https://youtu.be/' + yt.videoId }, 'apikey'))
		let dom = json.data.find(v => v.ext == 'mp3')
		let chSize = _func.overSize(dom.size, 45)
		if (chSize.oversize) return client.reply(`Ukuran file ${_func.format.mono(dom.size)}, karena bot ini menggunakan server dengan spek rendah ukuran file dibatasi maksimal ${_func.format.mono('45 MB')}, silahkan download sendiri via link : ${dom.link}`).then(() => {
			client.remove(message_id)
		})
		client.sendAudio(dom.link, json.thumb, decode(json.title).replace(/[/]/gi, ''), global.botname).then(() => {
			client.remove(message_id)
		})
	} catch {
		return client.reply(_func.status.error)
	}
},
	error: false
}