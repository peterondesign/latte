import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { CoWorkingSpaceDomainModule } from '../domain'
import { CoWorkingSpaceController } from './coWorkingSpace.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { CoWorkingSpaceByUserController } from './coWorkingSpaceByUser.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    CoWorkingSpaceDomainModule,

UserDomainModule,

],
  controllers: [
    CoWorkingSpaceController,
    
    CoWorkingSpaceByUserController,
    
  ],
  providers: [],
})
export class CoWorkingSpaceApplicationModule {}
