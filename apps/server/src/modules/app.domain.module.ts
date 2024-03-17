import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from './authentication/domain'
import { AuthorizationDomainModule } from './authorization/domain'

import { UserDomainModule } from './user/domain'

import { NotificationDomainModule } from './notification/domain'

import { CityDomainModule } from './city/domain'

import { CoworkingSpaceDomainModule } from './coworkingSpace/domain'

import { ReviewDomainModule } from './review/domain'

import { NomadMatchDomainModule } from './nomadMatch/domain'

import { MessageDomainModule } from './message/domain'

import { SubscriptionDomainModule } from './subscription/domain'

import { CheckInDomainModule } from './checkIn/domain'

import { RewardDomainModule } from './reward/domain'

import { PreferenceDomainModule } from './preference/domain'

@Module({
  imports: [
    AuthenticationDomainModule,
    AuthorizationDomainModule,
    UserDomainModule,
    NotificationDomainModule,

    CityDomainModule,

    CoworkingSpaceDomainModule,

    ReviewDomainModule,

    NomadMatchDomainModule,

    MessageDomainModule,

    SubscriptionDomainModule,

    CheckInDomainModule,

    RewardDomainModule,

    PreferenceDomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppDomainModule {}
