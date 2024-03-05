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
  CoWorkingSpace,
  CoWorkingSpaceDomainFacade,
} from '@server/modules/coWorkingSpace/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { CoWorkingSpaceApplicationEvent } from './coWorkingSpace.application.event'
import {
  CoWorkingSpaceCreateDto,
  CoWorkingSpaceUpdateDto,
} from './coWorkingSpace.dto'

@Controller('/v1/coWorkingSpaces')
export class CoWorkingSpaceController {
  constructor(
    private eventService: EventService,
    private coWorkingSpaceDomainFacade: CoWorkingSpaceDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.coWorkingSpaceDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(
    @Body() body: CoWorkingSpaceCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.coWorkingSpaceDomainFacade.create(body)

    await this.eventService.emit<CoWorkingSpaceApplicationEvent.CoWorkingSpaceCreated.Payload>(
      CoWorkingSpaceApplicationEvent
        .CoWorkingSpaceCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:coWorkingSpaceId')
  async findOne(
    @Param('coWorkingSpaceId') coWorkingSpaceId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item =
      await this.coWorkingSpaceDomainFacade.findOneByIdOrFail(
        coWorkingSpaceId,
        queryOptions,
      )

    return item
  }

  @Patch('/:coWorkingSpaceId')
  async update(
    @Param('coWorkingSpaceId') coWorkingSpaceId: string,
    @Body() body: CoWorkingSpaceUpdateDto,
  ) {
    const item =
      await this.coWorkingSpaceDomainFacade.findOneByIdOrFail(
        coWorkingSpaceId,
      )

    const itemUpdated = await this.coWorkingSpaceDomainFacade.update(
      item,
      body as Partial<CoWorkingSpace>,
    )
    return itemUpdated
  }

  @Delete('/:coWorkingSpaceId')
  async delete(@Param('coWorkingSpaceId') coWorkingSpaceId: string) {
    const item =
      await this.coWorkingSpaceDomainFacade.findOneByIdOrFail(
        coWorkingSpaceId,
      )

    await this.coWorkingSpaceDomainFacade.delete(item)

    return item
  }
}
