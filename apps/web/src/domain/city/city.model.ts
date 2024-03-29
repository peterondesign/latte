import { CoworkingSpace } from '../coworkingSpace'

export class City {
  id: string

  name?: string

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  coworkingSpaces?: CoworkingSpace[]
}
