import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { CheckInDomainFacade } from './checkIn.domain.facade'
import { CheckIn } from './checkIn.model'

@Module({
  imports: [TypeOrmModule.forFeature([CheckIn]), DatabaseHelperModule],
  providers: [CheckInDomainFacade, CheckInDomainFacade],
  exports: [CheckInDomainFacade],
})
export class CheckInDomainModule {}
