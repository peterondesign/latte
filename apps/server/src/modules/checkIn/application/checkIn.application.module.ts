import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { CheckInDomainModule } from '../domain'
import { CheckInController } from './checkIn.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { CheckInByUserController } from './checkInByUser.controller'

import { CoworkingSpaceDomainModule } from '../../../modules/coworkingSpace/domain'

import { CheckInByCoworkingSpaceController } from './checkInByCoworkingSpace.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    CheckInDomainModule,

    UserDomainModule,

    CoworkingSpaceDomainModule,
  ],
  controllers: [
    CheckInController,

    CheckInByUserController,

    CheckInByCoworkingSpaceController,
  ],
  providers: [],
})
export class CheckInApplicationModule {}
