import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { ReviewDomainModule } from '../domain'
import { ReviewController } from './review.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { ReviewByUserController } from './reviewByUser.controller'

import { CoWorkingSpaceDomainModule } from '../../../modules/coWorkingSpace/domain'

import { ReviewByCoWorkingSpaceController } from './reviewByCoWorkingSpace.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    ReviewDomainModule,

UserDomainModule,

CoWorkingSpaceDomainModule,

],
  controllers: [
    ReviewController,
    
    ReviewByUserController,
    
    ReviewByCoWorkingSpaceController,
    
  ],
  providers: [],
})
export class ReviewApplicationModule {}
