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
import {
  CoworkingSpace,
  CoworkingSpaceDomainFacade,
} from '@server/modules/coworkingSpace/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { CoworkingSpaceApplicationEvent } from './coworkingSpace.application.event'
import {
  CoworkingSpaceCreateDto,
  CoworkingSpaceUpdateDto,
} from './coworkingSpace.dto'

@Controller('/v1/coworkingSpaces')
export class CoworkingSpaceController {
  constructor(
    private eventService: EventService,
    private coworkingSpaceDomainFacade: CoworkingSpaceDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.coworkingSpaceDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: CoworkingSpaceCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.coworkingSpaceDomainFacade.create(body)

    await this.eventService.emit<CoworkingSpaceApplicationEvent.CoworkingSpaceCreated.Payload>(
      CoworkingSpaceApplicationEvent.CoworkingSpaceCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:coworkingSpaceId')
  async findOne(
    @Param('coworkingSpaceId') coworkingSpaceId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.coworkingSpaceDomainFacade.findOneByIdOrFail(
      coworkingSpaceId,
      queryOptions,
    )

    return item
  }

  @Patch('/:coworkingSpaceId')
  async update(
    @Param('coworkingSpaceId') coworkingSpaceId: string,
    @Body() body: CoworkingSpaceUpdateDto,
  ) {
    const item =
      await this.coworkingSpaceDomainFacade.findOneByIdOrFail(coworkingSpaceId)

    const itemUpdated = await this.coworkingSpaceDomainFacade.update(
      item,
      body as Partial<CoworkingSpace>,
    )
    return itemUpdated
  }

  @Delete('/:coworkingSpaceId')
  async delete(@Param('coworkingSpaceId') coworkingSpaceId: string) {
    const item =
      await this.coworkingSpaceDomainFacade.findOneByIdOrFail(coworkingSpaceId)

    await this.coworkingSpaceDomainFacade.delete(item)

    return item
  }
}
