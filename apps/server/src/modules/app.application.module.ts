import { Module } from '@nestjs/common'
import { AuthenticationApplicationModule } from './authentication/application'
import { AuthorizationApplicationModule } from './authorization/application'
import { UserApplicationModule } from './user/application'

import { CoWorkingSpaceApplicationModule } from './coWorkingSpace/application'

import { ImageApplicationModule } from './image/application'

import { ReviewApplicationModule } from './review/application'

import { CheckInApplicationModule } from './checkIn/application'

import { CommentApplicationModule } from './comment/application'

import { AiApplicationModule } from './ai/application/ai.application.module'
import { NotificationApplicationModule } from './notification/application/notification.application.module'
import { UploadApplicationModule } from './upload/application/upload.application.module'

@Module({
  imports: [
    AuthenticationApplicationModule,
    UserApplicationModule,
    AuthorizationApplicationModule,
    NotificationApplicationModule,
    AiApplicationModule,
    UploadApplicationModule,

CoWorkingSpaceApplicationModule,

ImageApplicationModule,

ReviewApplicationModule,

CheckInApplicationModule,

CommentApplicationModule,

],
  controllers: [],
  providers: [],
})
export class AppApplicationModule {}
