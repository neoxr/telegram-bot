exports.run = {
	usage: ['ig'],
	async : async (data, { client, _func, args, isPrefix, command }) => {
	try {
		await client.presence('typing')
		if (!args || !args[0]) return client.reply(`${_func.format.mono('Contoh')} : ${isPrefix + command} https://www.instagram.com/p/CVMpP6Cl9Vy/`)
		let { message_id } = await client.reply(_func.status.getdata)
		let json = await _func.fetchJson(global.API('neoxr', '/ig', { url: args[0] }, 'apikey'))
		if (!json.status) return client.reply(_func.status.fail)
		for (let i=0; i<json.data.length; i++) {
			(json.data[i].type == 'mp4') ? client.sendVideo(json.data[i].url) : client.sendImage(json.data[i].url)
		}
		client.remove(message_id)
	} catch {
		return client.reply(_func.status.error)
	}
},
	error: false
}
