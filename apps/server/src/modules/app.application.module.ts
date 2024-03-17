import { Module } from '@nestjs/common'
import { AuthenticationApplicationModule } from './authentication/application'
import { AuthorizationApplicationModule } from './authorization/application'
import { UserApplicationModule } from './user/application'

import { CityApplicationModule } from './city/application'

import { CoworkingSpaceApplicationModule } from './coworkingSpace/application'

import { ReviewApplicationModule } from './review/application'

import { NomadMatchApplicationModule } from './nomadMatch/application'

import { MessageApplicationModule } from './message/application'

import { SubscriptionApplicationModule } from './subscription/application'

import { CheckInApplicationModule } from './checkIn/application'

import { RewardApplicationModule } from './reward/application'

import { PreferenceApplicationModule } from './preference/application'

import { AiApplicationModule } from './ai/application/ai.application.module'
import { NotificationApplicationModule } from './notification/application/notification.application.module'
import { UploadApplicationModule } from './upload/application/upload.application.module'

@Module({
  imports: [
    AuthenticationApplicationModule,
    UserApplicationModule,
    AuthorizationApplicationModule,
    NotificationApplicationModule,
    AiApplicationModule,
    UploadApplicationModule,

    CityApplicationModule,

    CoworkingSpaceApplicationModule,

    ReviewApplicationModule,

    NomadMatchApplicationModule,

    MessageApplicationModule,

    SubscriptionApplicationModule,

    CheckInApplicationModule,

    RewardApplicationModule,

    PreferenceApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppApplicationModule {}
