import { User } from '../user'

import { Message } from '../message'

export class NomadMatch {
  id: string

  likeDislikeStatus?: string

  userAId?: string

  userA?: User

  userBId?: string

  userB?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  messages?: Message[]
}
