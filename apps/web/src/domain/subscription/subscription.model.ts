import { User } from '../user'

export class Subscription {
  id: string

  type?: string

  startDate?: string

  endDate?: string

  userId?: string

  user?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
