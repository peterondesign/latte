import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { NomadMatchDomainFacade } from './nomadMatch.domain.facade'
import { NomadMatch } from './nomadMatch.model'

@Module({
  imports: [TypeOrmModule.forFeature([NomadMatch]), DatabaseHelperModule],
  providers: [NomadMatchDomainFacade, NomadMatchDomainFacade],
  exports: [NomadMatchDomainFacade],
})
export class NomadMatchDomainModule {}
