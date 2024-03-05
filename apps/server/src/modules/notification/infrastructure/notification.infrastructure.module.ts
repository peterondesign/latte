import { Module } from '@nestjs/common'
import { SocketModule } from '@server/libraries/socket'
import { AuthorizationDomainModule } from '@server/modules/authorization/domain'
import { NotificationDomainModule } from '../domain'

import { NotificationCoWorkingSpaceSubscriber } from './subscribers/notification.coWorkingSpace.subscriber'

import { NotificationImageSubscriber } from './subscribers/notification.image.subscriber'

import { NotificationReviewSubscriber } from './subscribers/notification.review.subscriber'

import { NotificationCheckInSubscriber } from './subscribers/notification.checkIn.subscriber'

import { NotificationCommentSubscriber } from './subscribers/notification.comment.subscriber'

@Module({
  imports: [AuthorizationDomainModule, NotificationDomainModule, SocketModule],
  providers: [

NotificationCoWorkingSpaceSubscriber,

NotificationImageSubscriber,

NotificationReviewSubscriber,

NotificationCheckInSubscriber,

NotificationCommentSubscriber,

],
  exports: [],
})
export class NotificationInfrastructureModule {}
