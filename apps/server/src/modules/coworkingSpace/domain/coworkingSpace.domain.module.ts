import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { CoworkingSpaceDomainFacade } from './coworkingSpace.domain.facade'
import { CoworkingSpace } from './coworkingSpace.model'

@Module({
  imports: [TypeOrmModule.forFeature([CoworkingSpace]), DatabaseHelperModule],
  providers: [CoworkingSpaceDomainFacade, CoworkingSpaceDomainFacade],
  exports: [CoworkingSpaceDomainFacade],
})
export class CoworkingSpaceDomainModule {}
