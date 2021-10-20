global.token = ''
global.owner_id = '950419831'
global.owner_user = 'wildan_izzudin'
global.APIs = { 
	neoxr: 'https://api.neoxr.eu.org/api'
}
global.APIKeys = { 
	'https://api.neoxr.eu.org/api': 'yourkey'
}
global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')

module.exports = (bot) => {
	if (bot) {
		global.botid = bot.id
		global.botname = bot.first_name
		global.botuser = bot.username
	}
}