import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { RewardDomainModule } from '../domain'
import { RewardController } from './reward.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { RewardByUserController } from './rewardByUser.controller'

@Module({
  imports: [AuthenticationDomainModule, RewardDomainModule, UserDomainModule],
  controllers: [RewardController, RewardByUserController],
  providers: [],
})
export class RewardApplicationModule {}
