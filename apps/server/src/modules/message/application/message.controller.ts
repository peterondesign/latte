import { Request } from 'express'

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common'
import { EventService } from '@server/libraries/event'
import { Message, MessageDomainFacade } from '@server/modules/message/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { MessageApplicationEvent } from './message.application.event'
import { MessageCreateDto, MessageUpdateDto } from './message.dto'

@Controller('/v1/messages')
export class MessageController {
  constructor(
    private eventService: EventService,
    private messageDomainFacade: MessageDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.messageDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: MessageCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.messageDomainFacade.create(body)

    await this.eventService.emit<MessageApplicationEvent.MessageCreated.Payload>(
      MessageApplicationEvent.MessageCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:messageId')
  async findOne(
    @Param('messageId') messageId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.messageDomainFacade.findOneByIdOrFail(
      messageId,
      queryOptions,
    )

    return item
  }

  @Patch('/:messageId')
  async update(
    @Param('messageId') messageId: string,
    @Body() body: MessageUpdateDto,
  ) {
    const item = await this.messageDomainFacade.findOneByIdOrFail(messageId)

    const itemUpdated = await this.messageDomainFacade.update(
      item,
      body as Partial<Message>,
    )
    return itemUpdated
  }

  @Delete('/:messageId')
  async delete(@Param('messageId') messageId: string) {
    const item = await this.messageDomainFacade.findOneByIdOrFail(messageId)

    await this.messageDomainFacade.delete(item)

    return item
  }
}
