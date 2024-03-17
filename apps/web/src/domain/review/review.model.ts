import { User } from '../user'

import { CoworkingSpace } from '../coworkingSpace'

export class Review {
  id: string

  content?: string

  rating?: number

  userId?: string

  user?: User

  coworkingSpaceId?: string

  coworkingSpace?: CoworkingSpace

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
