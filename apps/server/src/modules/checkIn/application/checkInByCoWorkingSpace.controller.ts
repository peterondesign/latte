import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { CheckInDomainFacade } from '@server/modules/checkIn/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { CheckInApplicationEvent } from './checkIn.application.event'
import { CheckInCreateDto } from './checkIn.dto'

import { CoworkingSpaceDomainFacade } from '../../coworkingSpace/domain'

@Controller('/v1/coworkingSpaces')
export class CheckInByCoworkingSpaceController {
  constructor(
    private coworkingSpaceDomainFacade: CoworkingSpaceDomainFacade,

    private checkInDomainFacade: CheckInDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/coworkingSpace/:coworkingSpaceId/checkIns')
  async findManyCoworkingSpaceId(
    @Param('coworkingSpaceId') coworkingSpaceId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.coworkingSpaceDomainFacade.findOneByIdOrFail(coworkingSpaceId)

    const items = await this.checkInDomainFacade.findManyByCoworkingSpace(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/coworkingSpace/:coworkingSpaceId/checkIns')
  async createByCoworkingSpaceId(
    @Param('coworkingSpaceId') coworkingSpaceId: string,
    @Body() body: CheckInCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, coworkingSpaceId }

    const item = await this.checkInDomainFacade.create(valuesUpdated)

    await this.eventService.emit<CheckInApplicationEvent.CheckInCreated.Payload>(
      CheckInApplicationEvent.CheckInCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
