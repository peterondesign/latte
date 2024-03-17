import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { CityDomainModule } from '../domain'
import { CityController } from './city.controller'

@Module({
  imports: [AuthenticationDomainModule, CityDomainModule],
  controllers: [CityController],
  providers: [],
})
export class CityApplicationModule {}
