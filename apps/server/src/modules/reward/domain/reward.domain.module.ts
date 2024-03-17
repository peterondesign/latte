import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { RewardDomainFacade } from './reward.domain.facade'
import { Reward } from './reward.model'

@Module({
  imports: [TypeOrmModule.forFeature([Reward]), DatabaseHelperModule],
  providers: [RewardDomainFacade, RewardDomainFacade],
  exports: [RewardDomainFacade],
})
export class RewardDomainModule {}
