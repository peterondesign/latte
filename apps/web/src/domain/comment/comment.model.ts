

import { User } from "../user"

export class Comment {

id: string

content: string

userId: string

user?: User

profileUserId: string

profileUser?: User

dateCreated: string

dateDeleted: string

dateUpdated: string

}
