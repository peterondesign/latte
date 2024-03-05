import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { CheckInDomainModule } from '../domain'
import { CheckInController } from './checkIn.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { CheckInByUserController } from './checkInByUser.controller'

import { CoWorkingSpaceDomainModule } from '../../../modules/coWorkingSpace/domain'

import { CheckInByCoWorkingSpaceController } from './checkInByCoWorkingSpace.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    CheckInDomainModule,

UserDomainModule,

CoWorkingSpaceDomainModule,

],
  controllers: [
    CheckInController,
    
    CheckInByUserController,
    
    CheckInByCoWorkingSpaceController,
    
  ],
  providers: [],
})
export class CheckInApplicationModule {}
