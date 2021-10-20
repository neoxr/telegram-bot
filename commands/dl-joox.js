exports.run = {
	usage: ['joox'],
	async : async (data, { client, _func, text, isPrefix, command }) => {
	try {
		await client.presence('typing')
		if (!text) return client.reply(`${_func.format.bold('Contoh')} : ${isPrefix + command} seize day`)
		let { message_id } = await client.reply(_func.status.getdata)
		let json = await _func.fetchJson(global.API('neoxr', '/joox', { q: text }, 'apikey'))
		if (!json.status) return client.reply(_func.status.fail)
		client.sendAudio(json.data.url, json.thumb, json.title, global.botname).then(() => {
			client.remove(message_id)
		})
	} catch {
		return client.reply(_func.status.error)
	}},
	error: false
}