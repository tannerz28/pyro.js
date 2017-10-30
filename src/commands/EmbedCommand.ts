import { Message } from 'discord.js'
import { Command, CommandMessage, CommandoClient } from 'discord.js-commando'
const { embedColor }: { embedColor: string } = require('../../config.json')

export default class EmbedCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'embed',
      aliases: [],
      group: 'util',
      memberName: 'embed',
      description: 'Creates a RichEmbed.',
      guildOnly: false,
      throttling: {
        usages: 3,
        duration: 5
      },
      args: [
        {
          key: 'message',
          prompt: 'What do want the embed to say?',
          type: 'string'
        }
      ]
    })
  }

  public async run(msg: CommandMessage, args: {message: string[]}): Promise<Message | Message[]> {
    const { message } = args
    
    msg.delete();

    return msg.embed({
      color: 0x2196f3,
      description: message
    })
  }
}