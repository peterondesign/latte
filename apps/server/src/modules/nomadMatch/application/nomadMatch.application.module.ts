import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { NomadMatchDomainModule } from '../domain'
import { NomadMatchController } from './nomadMatch.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { NomadMatchByUserController } from './nomadMatchByUser.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    NomadMatchDomainModule,

    UserDomainModule,
  ],
  controllers: [NomadMatchController, NomadMatchByUserController],
  providers: [],
})
export class NomadMatchApplicationModule {}
