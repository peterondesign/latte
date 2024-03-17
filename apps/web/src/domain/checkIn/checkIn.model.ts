import { User } from '../user'

import { CoworkingSpace } from '../coworkingSpace'

export class CheckIn {
  id: string

  userId?: string

  user?: User

  coworkingSpaceId?: string

  coworkingSpace?: CoworkingSpace

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
