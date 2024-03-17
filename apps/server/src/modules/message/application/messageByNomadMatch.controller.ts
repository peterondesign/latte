import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { MessageDomainFacade } from '@server/modules/message/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { MessageApplicationEvent } from './message.application.event'
import { MessageCreateDto } from './message.dto'

import { NomadMatchDomainFacade } from '../../nomadMatch/domain'

@Controller('/v1/nomadMatchs')
export class MessageByNomadMatchController {
  constructor(
    private nomadMatchDomainFacade: NomadMatchDomainFacade,

    private messageDomainFacade: MessageDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/nomadMatch/:nomadMatchId/messages')
  async findManyNomadMatchId(
    @Param('nomadMatchId') nomadMatchId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.nomadMatchDomainFacade.findOneByIdOrFail(nomadMatchId)

    const items = await this.messageDomainFacade.findManyByNomadMatch(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/nomadMatch/:nomadMatchId/messages')
  async createByNomadMatchId(
    @Param('nomadMatchId') nomadMatchId: string,
    @Body() body: MessageCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, nomadMatchId }

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
