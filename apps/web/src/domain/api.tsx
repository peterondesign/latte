import { AiApi } from './ai/ai.api'
import { AuthenticationApi } from './authentication/authentication.api'
import { AuthorizationApi } from './authorization/authorization.api'
import { UploadApi } from './upload/upload.api'

import { UserApi } from './user/user.api'

import { NotificationApi } from './notification/notification.api'

import { CityApi } from './city/city.api'

import { CoworkingSpaceApi } from './coWorkingSpace/coWorkingSpace.api'

import { ReviewApi } from './review/review.api'

import { NomadMatchApi } from './nomadMatch/nomadMatch.api'

import { MessageApi } from './message/message.api'

import { SubscriptionApi } from './subscription/subscription.api'

import { CheckInApi } from './checkIn/checkIn.api'

import { RewardApi } from './reward/reward.api'

import { PreferenceApi } from './preference/preference.api'

export namespace Api {
  export class Ai extends AiApi {}
  export class Authentication extends AuthenticationApi {}
  export class Authorization extends AuthorizationApi {}
  export class Upload extends UploadApi {}

  export class User extends UserApi {}

  export class Notification extends NotificationApi {}

  export class City extends CityApi {}

  export class CoworkingSpace extends CoworkingSpaceApi {}

  export class Review extends ReviewApi {}

  export class NomadMatch extends NomadMatchApi {}

  export class Message extends MessageApi {}

  export class Subscription extends SubscriptionApi {}

  export class CheckIn extends CheckInApi {}

  export class Reward extends RewardApi {}

  export class Preference extends PreferenceApi {}
}
