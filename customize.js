let fs = require('fs')
let { decode } = require('html-entities')
let { exec } = require('child_process')
let { green, blueBright, redBright } = require('chalk')
let moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')

module.exports = async (client, _func, data) => {
	let chatText = data.text.split` `[0]
	const igEx = /^(?:https?:\/\/)?(?:www\.)?(?:instagram\.com\/)(?:tv\/|p\/|reel\/)(?:\S+)?$/;
	const tikEx = /^(?:https?:\/\/)?(?:www\.|vt\.|vm\.|t\.)?(?:tiktok\.com\/)(?:\S+)?$/;
	const ytEx = /^(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/;
	if (chatText.startsWith('@')) {
		let username = chatText.split`@`[1]
		try {
			await client.presence('typing')
			let { message_id } = await client.reply(_func.status.getdata)
			let json = await _func.fetchJson(global.API('neoxr', '/igs', { username: username.trim() }, 'apikey'))
			if (!json.status) return client.reply(_func.status.fail)
			await client.remove(message_id)
			let e = await client.reply(_func.format.mono('Fetching ' + json.data.length + ' stories . . .'))
			await client.remove(e.message_id)
			for (let i=0; i<json.data.length; i++) {
				(json.data[i].type == 'mp4') ? client.sendVideo(json.data[i].url, _func.format.mono('Stories .' + (i + 1))) : client.sendImage(json.data[i].url, _func.format.mono('Stories .' + (i + 1)))
			}
		} catch { return client.reply(_func.status.error) }
	} else if (chatText.match(igEx)) {
		try {
			await client.presence('typing')
			let { message_id } = await client.reply(_func.status.getdata)
			let json = await _func.fetchJson(global.API('neoxr', '/ig', { url: chatText }, 'apikey'))
			if (!json.status) return client.reply(_func.status.fail)
			for (let i=0; i<json.data.length; i++) {
				(json.data[i].type == 'mp4') ? client.sendVideo(json.data[i].url) : client.sendImage(json.data[i].url)
			} client.remove(message_id)
		} catch { return client.reply(_func.status.error) }
	} else if (chatText.match(tikEx)) {
		try {
			await client.presence('typing')
			let { message_id } = await client.reply(_func.status.getdata)
			let json = await _func.fetchJson(global.API('neoxr', '/tiktok', { url: chatText }, 'apikey'))
			if (!json.status) return client.reply(_func.status.fail)
			client.remove(message_id)
			client.sendVideo(json.data.video, _func.format.mono('No Watermark'))
			client.sendVideo(json.data.videoWM, _func.format.mono('Watermark'))
			client.sendAudio(json.data.audio, 'https://telegra.ph/file/ca3dbfb0d8243f10a4b5f.jpg', json.sound, '@' + global.botuser)
		} catch { return client.reply(_func.status.error) }
	} else if (chatText.match(ytEx)) {
		try {
			await client.presence('typing')
			let json = await _func.fetchJson(global.API('neoxr', '/yt', { url: chatText }, 'apikey'))
			if (!json.status) return client.reply(_func.status.fail)
			let mp3 = json.data.find(v => v.ext == 'mp3')
			let mp4 = json.data.find(v => v.ext == 'mp4')
			client.buttonMedia(json.thumb, 'image', decode(json.title), [
				[
					{ text: `MP3 (${mp3.size})`, callback_data: `/ytmp3 ${chatText}` },
					{ text: `MP4 (${mp4.size})`, callback_data: `/ytmp4 ${chatText}` },
				]
			])
		} catch { return client.reply(_func.status.error) }
	}
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(redBright.bold('[ UPDATE ]'), blueBright(moment(new Date() * 1).format('DD/MM/YY HH:mm:ss')), green.bold('~ customize.js'))
	delete require.cache[file]
	require(file)
})