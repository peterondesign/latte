

import { User } from "../user"

import { Image } from "../image"

import { Review } from "../review"

import { CheckIn } from "../checkIn"

export class CoWorkingSpace {

id: string

title: string

address: string

description?: string

amenities?: string

noiseLevel?: string

occupancy?: number

popular?: boolean

adminId: string

admin?: User

dateCreated: string

dateDeleted: string

dateUpdated: string

images?: Image[]

reviews?: Review[]

checkIns?: CheckIn[]

}
