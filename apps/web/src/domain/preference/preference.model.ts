import { User } from '../user'

export class Preference {
  id: string

  preferenceData?: string

  userId?: string

  user?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
