import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { CoworkingSpaceDomainFacade } from '@server/modules/coworkingSpace/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { CoworkingSpaceApplicationEvent } from './coworkingSpace.application.event'
import { CoworkingSpaceCreateDto } from './coworkingSpace.dto'

import { CityDomainFacade } from '../../city/domain'

@Controller('/v1/citys')
export class CoworkingSpaceByCityController {
  constructor(
    private cityDomainFacade: CityDomainFacade,

    private coworkingSpaceDomainFacade: CoworkingSpaceDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/city/:cityId/coworkingSpaces')
  async findManyCityId(
    @Param('cityId') cityId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.cityDomainFacade.findOneByIdOrFail(cityId)

    const items = await this.coworkingSpaceDomainFacade.findManyByCity(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/city/:cityId/coworkingSpaces')
  async createByCityId(
    @Param('cityId') cityId: string,
    @Body() body: CoworkingSpaceCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, cityId }

    const item = await this.coworkingSpaceDomainFacade.create(valuesUpdated)

    await this.eventService.emit<CoworkingSpaceApplicationEvent.CoworkingSpaceCreated.Payload>(
      CoworkingSpaceApplicationEvent.CoworkingSpaceCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
