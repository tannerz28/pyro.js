import { CommandoClient } from 'discord.js-commando'
import * as path from 'path';

const { token, userId, prefix }: { token: string, userId: string, prefix: string } = require('../config.json')

export class PyroSelfBot {
  private client: CommandoClient
  public start(): void {
    console.log('Starting selfbot')
    this.client = new CommandoClient({
      owner: userId,
      commandPrefix: prefix
    })

    this.client.on('ready', () => {
      console.log('Pyro.js ready')
      this.client.user.setGame('Pyro.js Selfbot')
    })

    this.client.login(token)
      .catch((err: any) => {
        console.log(`Pyro.js failed to login: ${err}`)
    })

    this.client.registry
      .registerGroups([
        ['util', 'Util']
      ])
      .registerDefaults()
      .registerCommandsIn(path.join(__dirname, 'commands'))
  }
}