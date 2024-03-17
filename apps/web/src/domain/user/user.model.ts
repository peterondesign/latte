import { Notification } from '../notification'

import { Review } from '../review'

import { NomadMatch } from '../nomadMatch'

import { Message } from '../message'

import { Subscription } from '../subscription'

import { CheckIn } from '../checkIn'

import { Reward } from '../reward'

import { Preference } from '../preference'

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

  reviews?: Review[]

  nomadMatchsAsUserA?: NomadMatch[]

  nomadMatchsAsUserB?: NomadMatch[]

  messagesAsSender?: Message[]

  messagesAsReceiver?: Message[]

  subscriptions?: Subscription[]

  checkIns?: CheckIn[]

  rewards?: Reward[]

  preferences?: Preference[]
}
