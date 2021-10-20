exports.run = {
	usage: ['tiktok', 'tikwm', 'tikmp3'],
	async : async (data, { client, _func, args, isPrefix, command }) => {
	try {
		await client.presence('typing')
		if (!args || !args[0]) return client.reply(`${_func.format.mono('Contoh')} : ${isPrefix + command} https://vt.tiktok.com/ZSeF1d6BM/`)
		let { message_id } = await client.reply(_func.status.getdata)
		let json = await _func.fetchJson(global.API('neoxr', '/tiktok', { url: args[0] }, 'apikey'))
		if (!json.status) return client.reply(_func.status.fail)
		if (command == 'tiktok') {
			await client.presence('upload_video')
			client.sendVideo(json.data.video).then(() => {
				client.remove(message_id)
			})
		} else if (command == 'tikwm') {
			await client.presence('upload_video')
			client.sendVideo(json.data.videoWM).then(() => {
				client.remove(message_id)
			})
		} else if (command == 'tikmp3') {
			await client.presence('upload_audio')
			client.sendAudio(json.data.audio).then(() => {
				client.remove(message_id)
			})
		}
	} catch {
		return client.reply(_func.status.error)
	}},
	error: false
}