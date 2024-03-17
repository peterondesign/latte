import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { PreferenceDomainFacade } from './preference.domain.facade'
import { Preference } from './preference.model'

@Module({
  imports: [TypeOrmModule.forFeature([Preference]), DatabaseHelperModule],
  providers: [PreferenceDomainFacade, PreferenceDomainFacade],
  exports: [PreferenceDomainFacade],
})
export class PreferenceDomainModule {}
