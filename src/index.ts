import { PyroSelfBot } from './PyroSelfBot'
const bot: PyroSelfBot = new PyroSelfBot()

//bot.start()

process.on('uncaughtException', err => {

})

process.on('unhandledRejection', err => {
})