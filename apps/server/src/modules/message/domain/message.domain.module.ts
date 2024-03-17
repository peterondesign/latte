import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { MessageDomainFacade } from './message.domain.facade'
import { Message } from './message.model'

@Module({
  imports: [TypeOrmModule.forFeature([Message]), DatabaseHelperModule],
  providers: [MessageDomainFacade, MessageDomainFacade],
  exports: [MessageDomainFacade],
})
export class MessageDomainModule {}
