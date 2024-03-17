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
import { CheckIn, CheckInDomainFacade } from '@server/modules/checkIn/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { CheckInApplicationEvent } from './checkIn.application.event'
import { CheckInCreateDto, CheckInUpdateDto } from './checkIn.dto'

@Controller('/v1/checkIns')
export class CheckInController {
  constructor(
    private eventService: EventService,
    private checkInDomainFacade: CheckInDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.checkInDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: CheckInCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.checkInDomainFacade.create(body)

    await this.eventService.emit<CheckInApplicationEvent.CheckInCreated.Payload>(
      CheckInApplicationEvent.CheckInCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:checkInId')
  async findOne(
    @Param('checkInId') checkInId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.checkInDomainFacade.findOneByIdOrFail(
      checkInId,
      queryOptions,
    )

    return item
  }

  @Patch('/:checkInId')
  async update(
    @Param('checkInId') checkInId: string,
    @Body() body: CheckInUpdateDto,
  ) {
    const item = await this.checkInDomainFacade.findOneByIdOrFail(checkInId)

    const itemUpdated = await this.checkInDomainFacade.update(
      item,
      body as Partial<CheckIn>,
    )
    return itemUpdated
  }

  @Delete('/:checkInId')
  async delete(@Param('checkInId') checkInId: string) {
    const item = await this.checkInDomainFacade.findOneByIdOrFail(checkInId)

    await this.checkInDomainFacade.delete(item)

    return item
  }
}
