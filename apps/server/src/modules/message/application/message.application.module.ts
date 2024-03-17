import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { MessageDomainModule } from '../domain'
import { MessageController } from './message.controller'

import { NomadMatchDomainModule } from '../../../modules/nomadMatch/domain'

import { MessageByNomadMatchController } from './messageByNomadMatch.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { MessageByUserController } from './messageByUser.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    MessageDomainModule,

    NomadMatchDomainModule,

    UserDomainModule,
  ],
  controllers: [
    MessageController,

    MessageByNomadMatchController,

    MessageByUserController,
  ],
  providers: [],
})
export class MessageApplicationModule {}
