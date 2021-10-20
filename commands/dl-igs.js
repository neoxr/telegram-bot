exports.run = {
	usage: ['igs'],
	async : async (data, { client, _func, args, isPrefix, command }) => {
	try {
		await client.presence('typing')
		if (!args || !args[0]) return client.reply(`${_func.format.bold('Contoh')} : ${isPrefix + command} awkarin`)
		let { message_id } = await client.reply(_func.status.getdata)
		let json = await _func.fetchJson(global.API('neoxr', '/igs', { username: args[0] }, 'apikey'))
		if (!json.status) return client.reply(_func.status.fail)
		await client.remove(message_id)
		let e = await client.reply(_func.format.mono('Fetching ' + json.data.length + ' stories . . .'))
		await client.remove(e.message_id)
		for (let i=0; i<json.data.length; i++) {
			(json.data[i].type == 'mp4') ? client.sendVideo(json.data[i].url, _func.format.mono('Stories .' + (i + 1))) : client.sendImage(json.data[i].url, _func.format.mono('Stories .' + (i + 1)))
		}
	} catch {
		return client.reply(_func.status.error)
	}},
	error: false
}