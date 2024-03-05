import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { CommentDomainModule } from '../domain'
import { CommentController } from './comment.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { CommentByUserController } from './commentByUser.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    CommentDomainModule,

UserDomainModule,

],
  controllers: [
    CommentController,
    
    CommentByUserController,
    
  ],
  providers: [],
})
export class CommentApplicationModule {}
