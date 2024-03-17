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
  NomadMatch,
  NomadMatchDomainFacade,
} from '@server/modules/nomadMatch/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { NomadMatchApplicationEvent } from './nomadMatch.application.event'
import { NomadMatchCreateDto, NomadMatchUpdateDto } from './nomadMatch.dto'

@Controller('/v1/nomadMatchs')
export class NomadMatchController {
  constructor(
    private eventService: EventService,
    private nomadMatchDomainFacade: NomadMatchDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.nomadMatchDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: NomadMatchCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.nomadMatchDomainFacade.create(body)

    await this.eventService.emit<NomadMatchApplicationEvent.NomadMatchCreated.Payload>(
      NomadMatchApplicationEvent.NomadMatchCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:nomadMatchId')
  async findOne(
    @Param('nomadMatchId') nomadMatchId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.nomadMatchDomainFacade.findOneByIdOrFail(
      nomadMatchId,
      queryOptions,
    )

    return item
  }

  @Patch('/:nomadMatchId')
  async update(
    @Param('nomadMatchId') nomadMatchId: string,
    @Body() body: NomadMatchUpdateDto,
  ) {
    const item =
      await this.nomadMatchDomainFacade.findOneByIdOrFail(nomadMatchId)

    const itemUpdated = await this.nomadMatchDomainFacade.update(
      item,
      body as Partial<NomadMatch>,
    )
    return itemUpdated
  }

  @Delete('/:nomadMatchId')
  async delete(@Param('nomadMatchId') nomadMatchId: string) {
    const item =
      await this.nomadMatchDomainFacade.findOneByIdOrFail(nomadMatchId)

    await this.nomadMatchDomainFacade.delete(item)

    return item
  }
}
