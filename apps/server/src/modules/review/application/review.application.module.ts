import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { ReviewDomainModule } from '../domain'
import { ReviewController } from './review.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { ReviewByUserController } from './reviewByUser.controller'

import { CoworkingSpaceDomainModule } from '../../../modules/coworkingSpace/domain'

import { ReviewByCoworkingSpaceController } from './reviewByCoworkingSpace.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    ReviewDomainModule,

    UserDomainModule,

    CoworkingSpaceDomainModule,
  ],
  controllers: [
    ReviewController,

    ReviewByUserController,

    ReviewByCoworkingSpaceController,
  ],
  providers: [],
})
export class ReviewApplicationModule {}
