exports.run = {
	usage: ['start', 'tutorial', 'other'],
	async : async (data, { client, _func, isPrefix, command }) => {
		if (command == 'start') return client.button(menu(_func), [
			[
				{ text: 'Tutorial', callback_data: isPrefix + 'tutorial' },
				{ text: 'Command', callback_data: isPrefix + 'other' }
			],
			[{ text: 'Source Code', url: 'https://github.com/neoxr/telegram-bot/' }]
		])
		if (command == 'tutorial') return client.button(tutorial(isPrefix), [
			[{ text: 'Kembali', callback_data: isPrefix + 'start' }]
		])
		if (command == 'other') return client.button(cmd(isPrefix), [
			[{ text: 'Kembali', callback_data: isPrefix + 'start' }]
		])
	}
}

const menu = (_func) => {
	return `Halo, saya adalah bot yang dibuat oleh [Wildan Izzudin](https://t.me/${global.owner_user}) dengan menggunakan bahasa pemrograman javascript.

Keterangan :
• ${_func.format.mono('Scraping metadata')} – Sedang proses mengambil data.
• ${_func.format.mono('Can\'t get metadata')} – Data tidak berhasil didapatkan / gagal.
• ${_func.format.mono('Error, something went wrong!')} – Terjadi error pada script atau server api sedang down.
`
}

const tutorial = (prefix) => {
return `
1. Download story instagram hanya tinggal mengirimkan usernamenya dengan awalan @, Contoh : @awkarin. (Hanya di Private Chat)

2. Download postingan IG, Tiktok dan Youtube cukup dengan mengirimkan Linknya saja. (Hanya di Private Chat)

3. Download lagu, terdapat 3 provider dengan ${prefix}play (Youtube), ${prefix}joox (Joox) dan ${prefix}scplay (Soundcloud).`
}

const cmd = (prefix) => {
return `
Downloader :

${prefix}ig, ${prefix}igs, ${prefix}joox, ${prefix}play, ${prefix}scplay, ${prefix}tiktok, ${prefix}tikwm, ${prefix}tikmp3

Utilities :

${prefix}goimg, ${prefix}lirik
`
	
}
