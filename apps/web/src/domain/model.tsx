import { AuthorizationRole as AuthorizationRoleModel } from './authorization/authorization.model'

import { User as UserModel } from './user/user.model'

import { Notification as NotificationModel } from './notification/notification.model'

import { City as CityModel } from './city/city.model'

import { CoworkingSpace as CoworkingSpaceModel } from './coworkingSpace/coworkingSpace.model'

import { Review as ReviewModel } from './review/review.model'

import { NomadMatch as NomadMatchModel } from './nomadMatch/nomadMatch.model'

import { Message as MessageModel } from './message/message.model'

import { Subscription as SubscriptionModel } from './subscription/subscription.model'

import { CheckIn as CheckInModel } from './checkIn/checkIn.model'

import { Reward as RewardModel } from './reward/reward.model'

import { Preference as PreferenceModel } from './preference/preference.model'

export namespace Model {
  export class AuthorizationRole extends AuthorizationRoleModel {}

  export class User extends UserModel {}

  export class Notification extends NotificationModel {}

  export class City extends CityModel {}

  export class CoworkingSpace extends CoworkingSpaceModel {}

  export class Review extends ReviewModel {}

  export class NomadMatch extends NomadMatchModel {}

  export class Message extends MessageModel {}

  export class Subscription extends SubscriptionModel {}

  export class CheckIn extends CheckInModel {}

  export class Reward extends RewardModel {}

  export class Preference extends PreferenceModel {}
}
