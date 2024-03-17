import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { CityDomainFacade } from './city.domain.facade'
import { City } from './city.model'

@Module({
  imports: [TypeOrmModule.forFeature([City]), DatabaseHelperModule],
  providers: [CityDomainFacade, CityDomainFacade],
  exports: [CityDomainFacade],
})
export class CityDomainModule {}
