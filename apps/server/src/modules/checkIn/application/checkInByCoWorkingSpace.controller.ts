import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { CheckInDomainFacade } from '@server/modules/checkIn/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { CheckInApplicationEvent } from './checkIn.application.event'
import { CheckInCreateDto } from './checkIn.dto'

import { CoWorkingSpaceDomainFacade } from '../../coWorkingSpace/domain'

@Controller('/v1/coWorkingSpaces')
export class CheckInByCoWorkingSpaceController {
  constructor(
    
    private coWorkingSpaceDomainFacade: CoWorkingSpaceDomainFacade,
    
    private checkInDomainFacade: CheckInDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

@Get('/coWorkingSpace/:coWorkingSpaceId/checkIns')
  async findManyCoWorkingSpaceId(
    @Param('coWorkingSpaceId') coWorkingSpaceId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.coWorkingSpaceDomainFacade.findOneByIdOrFail(
        coWorkingSpaceId,
      )

    const items =
      await this.checkInDomainFacade.findManyByCoWorkingSpace(
        parent,
        queryOptions,
      )

    return items
  }

  @Post('/coWorkingSpace/:coWorkingSpaceId/checkIns')
  async createByCoWorkingSpaceId(
    @Param('coWorkingSpaceId') coWorkingSpaceId: string,
    @Body() body: CheckInCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, coWorkingSpaceId }

    const item = await this.checkInDomainFacade.create(valuesUpdated)

    await this.eventService.emit<CheckInApplicationEvent.CheckInCreated.Payload>(
      CheckInApplicationEvent
        .CheckInCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
  
}
