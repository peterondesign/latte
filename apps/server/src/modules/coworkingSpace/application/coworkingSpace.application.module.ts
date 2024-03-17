import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { CoworkingSpaceDomainModule } from '../domain'
import { CoworkingSpaceController } from './coworkingSpace.controller'

import { CityDomainModule } from '../../../modules/city/domain'

import { CoworkingSpaceByCityController } from './coworkingSpaceByCity.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    CoworkingSpaceDomainModule,

    CityDomainModule,
  ],
  controllers: [CoworkingSpaceController, CoworkingSpaceByCityController],
  providers: [],
})
export class CoworkingSpaceApplicationModule {}
