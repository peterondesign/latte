import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { CheckInDomainFacade } from '@server/modules/checkIn/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { CheckInApplicationEvent } from './checkIn.application.event'
import { CheckInCreateDto } from './checkIn.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class CheckInByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private checkInDomainFacade: CheckInDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/checkIns')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.checkInDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/checkIns')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: CheckInCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

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
