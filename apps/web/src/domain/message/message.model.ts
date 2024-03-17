import { NomadMatch } from '../nomadMatch'

import { User } from '../user'

export class Message {
  id: string

  content?: string

  nomadMatchId?: string

  nomadMatch?: NomadMatch

  senderId?: string

  sender?: User

  receiverId?: string

  receiver?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
