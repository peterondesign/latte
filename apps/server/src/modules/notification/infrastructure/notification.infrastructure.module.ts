import { Module } from '@nestjs/common'
import { SocketModule } from '@server/libraries/socket'
import { AuthorizationDomainModule } from '@server/modules/authorization/domain'
import { NotificationDomainModule } from '../domain'

import { NotificationCitySubscriber } from './subscribers/notification.city.subscriber'

import { NotificationCoworkingSpaceSubscriber } from './subscribers/notification.coworkingSpace.subscriber'

import { NotificationReviewSubscriber } from './subscribers/notification.review.subscriber'

import { NotificationNomadMatchSubscriber } from './subscribers/notification.nomadMatch.subscriber'

import { NotificationMessageSubscriber } from './subscribers/notification.message.subscriber'

import { NotificationSubscriptionSubscriber } from './subscribers/notification.subscription.subscriber'

import { NotificationCheckInSubscriber } from './subscribers/notification.checkIn.subscriber'

import { NotificationRewardSubscriber } from './subscribers/notification.reward.subscriber'

import { NotificationPreferenceSubscriber } from './subscribers/notification.preference.subscriber'

@Module({
  imports: [AuthorizationDomainModule, NotificationDomainModule, SocketModule],
  providers: [
    NotificationCitySubscriber,

    NotificationCoworkingSpaceSubscriber,

    NotificationReviewSubscriber,

    NotificationNomadMatchSubscriber,

    NotificationMessageSubscriber,

    NotificationSubscriptionSubscriber,

    NotificationCheckInSubscriber,

    NotificationRewardSubscriber,

    NotificationPreferenceSubscriber,
  ],
  exports: [],
})
export class NotificationInfrastructureModule {}
