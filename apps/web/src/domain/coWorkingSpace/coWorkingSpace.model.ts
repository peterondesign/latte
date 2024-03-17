import { City } from '../city'

import { Review } from '../review'

import { CheckIn } from '../checkIn'

export class CoworkingSpace {
  id: string

  name?: string

  address?: string

  priceRange?: string

  amenities?: string

  photosUrl?: string

  hoursOfOperation?: string

  googleRating?: number

  averageNoiseLevel?: string

  averageWifiStrength?: string

  cityId?: string

  city?: City

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  reviews?: Review[]

  checkIns?: CheckIn[]
}
