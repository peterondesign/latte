

import { User } from "../user"

import { CoWorkingSpace } from "../coWorkingSpace"

export class CheckIn {

id: string

checkInTime: string

userId: string

user?: User

coWorkingSpaceId: string

coWorkingSpace?: CoWorkingSpace

dateCreated: string

dateDeleted: string

dateUpdated: string

}
