let { Telegraf } = require('telegraf')
let { Clients, Serialize } = require('./system/extra')
let Spinnies = require('spinnies')
let spinnies = new Spinnies()
let fs = require('fs')
let config = require('./system/config')
let conn = new Telegraf(global.token)

conn.on('message', async (data) => {
	Serialize(data)
	let client = new Clients(data)
	global.cmd = Object.fromEntries(fs.readdirSync('./commands/').filter(v => v.endsWith('.js')).map(file => [ file, require('./commands/' + file) ]))
	let handler = require('./handler')(client, data)
})

conn.on('callback_query', async (data) => {
	Serialize(data)
	let client = new Clients(data)
	global.cmd = Object.fromEntries(fs.readdirSync('./commands/').filter(v => v.endsWith('.js')).map(file => [ file, require('./commands/' + file) ]))
	let handler = require('./handler')(client, data)
})

conn.launch()
conn.telegram.getMe().then((bot) => {
	spinnies.add('start', { text: 'Connecting . . .' })
	setTimeout(() => {
		spinnies.succeed('start', { text: `Connected, you login as ${bot.first_name}` })
	}, 2000)    
	require('./system/config')(bot)
})

process.once('SIGINT', () => conn.stop('SIGINT'))
process.once('SIGTERM', () => conn.stop('SIGTERM'))