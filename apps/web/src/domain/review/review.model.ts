

import { User } from "../user"

import { CoWorkingSpace } from "../coWorkingSpace"

export class Review {

id: string

content: string

userId: string

user?: User

coWorkingSpaceId: string

coWorkingSpace?: CoWorkingSpace

dateCreated: string

dateDeleted: string

dateUpdated: string

}
