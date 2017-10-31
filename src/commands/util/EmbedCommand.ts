import { Message } from 'discord.js'
import { Command, CommandMessage, CommandoClient } from 'discord.js-commando'
import * as colorString from 'color-string'
import * as path from 'path'
const yargs = require('yargs')
const jsonfile = require('jsonfile')

export default class EmbedCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'embed',
      aliases: [],
      group: 'util',
      memberName: 'embed',
      description: 'Creates a RichEmbed.',
      guildOnly: false,
      args: [
        {
          key: 'message',
          prompt: 'What do you want the embed to say?',
          type: 'string'
        }
      ]
    })
  }

  public async run(msg: CommandMessage, args: {message: string}): Promise<Message | Message[]> {
    const { message } = args

    msg.delete()

    let embedColor

    const file = path.resolve(__dirname, '../../../config.json')
    return await jsonfile.readFile(file, (err: Error, obj: any) => {
      const argv = yargs.parse(message.split(' '))

      console.log(argv)

      embedColor = argv.color || obj.embedColor

      return msg.embed({
        color: parseInt(`0x${colorString.to.hex(colorString.get(embedColor).value)}`.replace('#', '')) || 0x2196f3,
        description: argv._.join(' ')
      })
    })
  }
}
