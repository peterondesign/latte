import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { PreferenceDomainModule } from '../domain'
import { PreferenceController } from './preference.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { PreferenceByUserController } from './preferenceByUser.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    PreferenceDomainModule,

    UserDomainModule,
  ],
  controllers: [PreferenceController, PreferenceByUserController],
  providers: [],
})
export class PreferenceApplicationModule {}
