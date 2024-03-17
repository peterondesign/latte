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
  Preference,
  PreferenceDomainFacade,
} from '@server/modules/preference/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { PreferenceApplicationEvent } from './preference.application.event'
import { PreferenceCreateDto, PreferenceUpdateDto } from './preference.dto'

@Controller('/v1/preferences')
export class PreferenceController {
  constructor(
    private eventService: EventService,
    private preferenceDomainFacade: PreferenceDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.preferenceDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: PreferenceCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.preferenceDomainFacade.create(body)

    await this.eventService.emit<PreferenceApplicationEvent.PreferenceCreated.Payload>(
      PreferenceApplicationEvent.PreferenceCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:preferenceId')
  async findOne(
    @Param('preferenceId') preferenceId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.preferenceDomainFacade.findOneByIdOrFail(
      preferenceId,
      queryOptions,
    )

    return item
  }

  @Patch('/:preferenceId')
  async update(
    @Param('preferenceId') preferenceId: string,
    @Body() body: PreferenceUpdateDto,
  ) {
    const item =
      await this.preferenceDomainFacade.findOneByIdOrFail(preferenceId)

    const itemUpdated = await this.preferenceDomainFacade.update(
      item,
      body as Partial<Preference>,
    )
    return itemUpdated
  }

  @Delete('/:preferenceId')
  async delete(@Param('preferenceId') preferenceId: string) {
    const item =
      await this.preferenceDomainFacade.findOneByIdOrFail(preferenceId)

    await this.preferenceDomainFacade.delete(item)

    return item
  }
}
