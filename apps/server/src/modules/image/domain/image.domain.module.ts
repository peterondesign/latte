import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { ImageDomainFacade } from './image.domain.facade'
import { Image } from './image.model'

@Module({
  imports: [
    TypeOrmModule.forFeature([Image]),
    DatabaseHelperModule,
  ],
  providers: [
    ImageDomainFacade,
    ImageDomainFacade,
  ],
  exports: [ImageDomainFacade],
})
export class ImageDomainModule {}
