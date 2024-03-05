import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ImageDomainFacade } from '@server/modules/image/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ImageApplicationEvent } from './image.application.event'
import { ImageCreateDto } from './image.dto'

import { CoWorkingSpaceDomainFacade } from '../../coWorkingSpace/domain'

@Controller('/v1/coWorkingSpaces')
export class ImageByCoWorkingSpaceController {
  constructor(
    
    private coWorkingSpaceDomainFacade: CoWorkingSpaceDomainFacade,
    
    private imageDomainFacade: ImageDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

@Get('/coWorkingSpace/:coWorkingSpaceId/images')
  async findManyCoWorkingSpaceId(
    @Param('coWorkingSpaceId') coWorkingSpaceId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.coWorkingSpaceDomainFacade.findOneByIdOrFail(
        coWorkingSpaceId,
      )

    const items =
      await this.imageDomainFacade.findManyByCoWorkingSpace(
        parent,
        queryOptions,
      )

    return items
  }

  @Post('/coWorkingSpace/:coWorkingSpaceId/images')
  async createByCoWorkingSpaceId(
    @Param('coWorkingSpaceId') coWorkingSpaceId: string,
    @Body() body: ImageCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, coWorkingSpaceId }

    const item = await this.imageDomainFacade.create(valuesUpdated)

    await this.eventService.emit<ImageApplicationEvent.ImageCreated.Payload>(
      ImageApplicationEvent
        .ImageCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
  
}
