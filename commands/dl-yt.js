exports.run = {
	usage: ['ytmp3', 'ytmp4'],
	async : async (data, { client, _func, args, isPrefix, command }) => {
	try {
		await client.presence('typing')
		if (!args || !args[0]) return client.reply(`${_func.format.mono('Contoh')} : ${isPrefix + command} https://youtu.be/SRQmwK8Z5Nw`)
		try { client.callback() } catch {}
		let { message_id } = await client.reply(_func.status.getdata)
		let json = await _func.fetchJson(global.API('neoxr', '/yt', { url: args[0] }, 'apikey'))
		if (!json.status) return client.reply(_func.status.fail)
		if (command == 'ytmp3') {
			let dom = json.data.find(v => v.ext == 'mp3')
			let chSize = _func.overSize(dom.size, 45)
			if (chSize.oversize) return client.reply(`Ukuran file ${_func.format.mono(dom.size)}, karena bot ini menggunakan server dengan spek rendah ukuran file dibatasi maksimal ${_func.format.mono('45 MB')}, silahkan download sendiri via link : ${dom.link}`).then(() => {
				client.remove(message_id)
			})
			client.sendAudio(dom.link, json.thumb, json.title, global.botname).then(() => {
				client.remove(message_id)
			})
		} else if (command == 'ytmp4') {
			let dom = json.data.find(v => v.ext == 'mp4')
			let chSize = _func.overSize(dom.size, 45)
			if (chSize.oversize) return client.reply(`Ukuran file ${_func.format.mono(dom.size)}, karena bot ini menggunakan server dengan spek rendah ukuran file dibatasi maksimal ${_func.format.mono('45 MB')}, silahkan download sendiri via link : ${dom.link}`).then(() => {
				client.remove(message_id)
			})
			client.sendVideo(dom.link).then(() => {
				client.remove(message_id)
			})
		}
	} catch {
		return client.reply(_func.status.error)
	}},
	error: false
}