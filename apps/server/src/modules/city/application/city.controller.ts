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
import { City, CityDomainFacade } from '@server/modules/city/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { CityApplicationEvent } from './city.application.event'
import { CityCreateDto, CityUpdateDto } from './city.dto'

@Controller('/v1/citys')
export class CityController {
  constructor(
    private eventService: EventService,
    private cityDomainFacade: CityDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.cityDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: CityCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.cityDomainFacade.create(body)

    await this.eventService.emit<CityApplicationEvent.CityCreated.Payload>(
      CityApplicationEvent.CityCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:cityId')
  async findOne(@Param('cityId') cityId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.cityDomainFacade.findOneByIdOrFail(
      cityId,
      queryOptions,
    )

    return item
  }

  @Patch('/:cityId')
  async update(@Param('cityId') cityId: string, @Body() body: CityUpdateDto) {
    const item = await this.cityDomainFacade.findOneByIdOrFail(cityId)

    const itemUpdated = await this.cityDomainFacade.update(
      item,
      body as Partial<City>,
    )
    return itemUpdated
  }

  @Delete('/:cityId')
  async delete(@Param('cityId') cityId: string) {
    const item = await this.cityDomainFacade.findOneByIdOrFail(cityId)

    await this.cityDomainFacade.delete(item)

    return item
  }
}
