import { User } from '../user'

export class Reward {
  id: string

  points?: number

  tier?: string

  userId?: string

  user?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
