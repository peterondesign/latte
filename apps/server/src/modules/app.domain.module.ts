import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from './authentication/domain'
import { AuthorizationDomainModule } from './authorization/domain'

import { UserDomainModule } from './user/domain'

import { NotificationDomainModule } from './notification/domain'

import { CoWorkingSpaceDomainModule } from './coWorkingSpace/domain'

import { ImageDomainModule } from './image/domain'

import { ReviewDomainModule } from './review/domain'

import { CheckInDomainModule } from './checkIn/domain'

import { CommentDomainModule } from './comment/domain'

@Module({
  imports: [
    AuthenticationDomainModule,
    AuthorizationDomainModule,
    UserDomainModule,
    NotificationDomainModule,

CoWorkingSpaceDomainModule,

ImageDomainModule,

ReviewDomainModule,

CheckInDomainModule,

CommentDomainModule,

],
  controllers: [],
  providers: [],
})
export class AppDomainModule {}
