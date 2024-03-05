import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { CoWorkingSpaceDomainFacade } from './coWorkingSpace.domain.facade'
import { CoWorkingSpace } from './coWorkingSpace.model'

@Module({
  imports: [
    TypeOrmModule.forFeature([CoWorkingSpace]),
    DatabaseHelperModule,
  ],
  providers: [
    CoWorkingSpaceDomainFacade,
    CoWorkingSpaceDomainFacade,
  ],
  exports: [CoWorkingSpaceDomainFacade],
})
export class CoWorkingSpaceDomainModule {}
