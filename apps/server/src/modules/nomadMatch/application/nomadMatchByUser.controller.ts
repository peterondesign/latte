import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { NomadMatchDomainFacade } from '@server/modules/nomadMatch/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { NomadMatchApplicationEvent } from './nomadMatch.application.event'
import { NomadMatchCreateDto } from './nomadMatch.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class NomadMatchByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private nomadMatchDomainFacade: NomadMatchDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/userA/:userAId/nomadMatchs')
  async findManyUserAId(
    @Param('userAId') userAId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userAId)

    const items = await this.nomadMatchDomainFacade.findManyByUserA(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/userA/:userAId/nomadMatchs')
  async createByUserAId(
    @Param('userAId') userAId: string,
    @Body() body: NomadMatchCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userAId }

    const item = await this.nomadMatchDomainFacade.create(valuesUpdated)

    await this.eventService.emit<NomadMatchApplicationEvent.NomadMatchCreated.Payload>(
      NomadMatchApplicationEvent.NomadMatchCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/userB/:userBId/nomadMatchs')
  async findManyUserBId(
    @Param('userBId') userBId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userBId)

    const items = await this.nomadMatchDomainFacade.findManyByUserB(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/userB/:userBId/nomadMatchs')
  async createByUserBId(
    @Param('userBId') userBId: string,
    @Body() body: NomadMatchCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userBId }

    const item = await this.nomadMatchDomainFacade.create(valuesUpdated)

    await this.eventService.emit<NomadMatchApplicationEvent.NomadMatchCreated.Payload>(
      NomadMatchApplicationEvent.NomadMatchCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
