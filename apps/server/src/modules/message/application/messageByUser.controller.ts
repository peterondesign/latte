import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { MessageDomainFacade } from '@server/modules/message/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { MessageApplicationEvent } from './message.application.event'
import { MessageCreateDto } from './message.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class MessageByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private messageDomainFacade: MessageDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/sender/:senderId/messages')
  async findManySenderId(
    @Param('senderId') senderId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(senderId)

    const items = await this.messageDomainFacade.findManyBySender(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/sender/:senderId/messages')
  async createBySenderId(
    @Param('senderId') senderId: string,
    @Body() body: MessageCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, senderId }

    const item = await this.messageDomainFacade.create(valuesUpdated)

    await this.eventService.emit<MessageApplicationEvent.MessageCreated.Payload>(
      MessageApplicationEvent.MessageCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/receiver/:receiverId/messages')
  async findManyReceiverId(
    @Param('receiverId') receiverId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(receiverId)

    const items = await this.messageDomainFacade.findManyByReceiver(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/receiver/:receiverId/messages')
  async createByReceiverId(
    @Param('receiverId') receiverId: string,
    @Body() body: MessageCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, receiverId }

    const item = await this.messageDomainFacade.create(valuesUpdated)

    await this.eventService.emit<MessageApplicationEvent.MessageCreated.Payload>(
      MessageApplicationEvent.MessageCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
