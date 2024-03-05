import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { ImageDomainModule } from '../domain'
import { ImageController } from './image.controller'

import { CoWorkingSpaceDomainModule } from '../../../modules/coWorkingSpace/domain'

import { ImageByCoWorkingSpaceController } from './imageByCoWorkingSpace.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    ImageDomainModule,

CoWorkingSpaceDomainModule,

],
  controllers: [
    ImageController,
    
    ImageByCoWorkingSpaceController,
    
  ],
  providers: [],
})
export class ImageApplicationModule {}
