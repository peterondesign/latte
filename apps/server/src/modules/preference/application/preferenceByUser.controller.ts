import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { PreferenceDomainFacade } from '@server/modules/preference/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { PreferenceApplicationEvent } from './preference.application.event'
import { PreferenceCreateDto } from './preference.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class PreferenceByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private preferenceDomainFacade: PreferenceDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/preferences')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.preferenceDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/preferences')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: PreferenceCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.preferenceDomainFacade.create(valuesUpdated)

    await this.eventService.emit<PreferenceApplicationEvent.PreferenceCreated.Payload>(
      PreferenceApplicationEvent.PreferenceCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
