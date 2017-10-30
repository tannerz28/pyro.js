import { PyroSelfBot } from './PyroSelfBot'
const bot: PyroSelfBot = new PyroSelfBot()

bot.start()

process.on('uncaughtException', err => {
  console.log(err)
})

process.on('unhandledRejection', err => {
  console.log(err)
})