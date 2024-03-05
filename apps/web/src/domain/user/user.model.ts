

import { Notification } from "../notification"

import { CoWorkingSpace } from "../coWorkingSpace"

import { Review } from "../review"

import { CheckIn } from "../checkIn"

import { Comment } from "../comment"

export enum UserStatus {
  CREATED = 'CREATED',
  VERIFIED = 'VERIFIED',
}
export class User {
  id: string
  email: string
  status: UserStatus
  name: string
  pictureUrl: string
  password: string
  dateCreated: string
  dateUpdated: string
  notifications?: Notification[]

coWorkingSpacesAsAdmin?: CoWorkingSpace[]

reviews?: Review[]

checkIns?: CheckIn[]

comments?: Comment[]

commentsAsProfileUser?: Comment[]

}
