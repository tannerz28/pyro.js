import { PyroSelfBot } from './PyroSelfBot'
const bot: PyroSelfBot = new PyroSelfBot()

bot.start()

process.on('uncaughtException', console.error)

process.on('unhandledRejection', console.error)