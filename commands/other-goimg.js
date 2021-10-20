let gis = require('g-i-s')
exports.run = {
	usage: ['goimg'],
	async : async (data, { client, _func, text, isPrefix, command }) => {
	try {
		await client.presence('typing')
		if (!text) return client.reply(`${_func.format.mono('Contoh')} : ${isPrefix + command} kucing`)
		let { message_id } = await client.reply(_func.status.getdata)
		gis(encodeURIComponent(text), logResults)
		async function logResults(error, results) {
		if (error) {
			await client.presence('typing')
			client.reply(_func.status.fail)
		} else {
			let data = JSON.parse(JSON.stringify(results, null, '  '));
    		for(let i = 0; i < 5; i++) {
    			var rand = Math.floor(data.length * Math.random())
    			client.sendImage(data[rand].url, `›  ${_func.format.mono(`${data[rand].width} × ${data[rand].height}`)}`)
    		}}
		}
		client.remove(message_id)
	} catch {
		return client.reply(_func.status.error)
	}},
	error: false
}
