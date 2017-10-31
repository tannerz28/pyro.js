import { CommandoClient } from 'discord.js-commando'
import * as path from 'path'

const { token, userId, prefix }: { token: string, userId: string, prefix: string } = require('../config.json')

export class PyroSelfBot {
  private client: CommandoClient
  public start (): void {
    console.log('Starting Pyro.js')
    this.client = new CommandoClient({
      owner: userId,
      commandPrefix: prefix,
      selfbot: true
    })

    this.client.on('ready', () => {
      console.log('Pyro.js ready')
      this.client.user.setPresence({
        game: {
          name: 'Pyro.js',
          url: 'https://github.com/tannerz28/pyro.js'
        }
      })
    })

    this.client.on('message', async msg => {
      if (msg.author.id.toString() !== userId) {
        return
      }
    })

    this.client.on('error', console.error)

    this.client.registry
      .registerGroups([
        ['util', 'Util']
      ])
      .registerDefaults()
      .registerCommandsIn(path.join(__dirname, 'commands'))

    this.client.login(token)
      .catch((err: any) => {
        console.log(`Pyro.js failed to login: ${err}`)
      })
  }
}
