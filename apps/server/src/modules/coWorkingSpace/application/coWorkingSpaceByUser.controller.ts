import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { CoWorkingSpaceDomainFacade } from '@server/modules/coWorkingSpace/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { CoWorkingSpaceApplicationEvent } from './coWorkingSpace.application.event'
import { CoWorkingSpaceCreateDto } from './coWorkingSpace.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class CoWorkingSpaceByUserController {
  constructor(
    
    private userDomainFacade: UserDomainFacade,
    
    private coWorkingSpaceDomainFacade: CoWorkingSpaceDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

@Get('/admin/:adminId/coWorkingSpaces')
  async findManyAdminId(
    @Param('adminId') adminId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.userDomainFacade.findOneByIdOrFail(
        adminId,
      )

    const items =
      await this.coWorkingSpaceDomainFacade.findManyByAdmin(
        parent,
        queryOptions,
      )

    return items
  }

  @Post('/admin/:adminId/coWorkingSpaces')
  async createByAdminId(
    @Param('adminId') adminId: string,
    @Body() body: CoWorkingSpaceCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, adminId }

    const item = await this.coWorkingSpaceDomainFacade.create(valuesUpdated)

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
  
}
