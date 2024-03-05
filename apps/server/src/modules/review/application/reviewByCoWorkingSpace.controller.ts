import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ReviewDomainFacade } from '@server/modules/review/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ReviewApplicationEvent } from './review.application.event'
import { ReviewCreateDto } from './review.dto'

import { CoWorkingSpaceDomainFacade } from '../../coWorkingSpace/domain'

@Controller('/v1/coWorkingSpaces')
export class ReviewByCoWorkingSpaceController {
  constructor(
    
    private coWorkingSpaceDomainFacade: CoWorkingSpaceDomainFacade,
    
    private reviewDomainFacade: ReviewDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

@Get('/coWorkingSpace/:coWorkingSpaceId/reviews')
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
      await this.reviewDomainFacade.findManyByCoWorkingSpace(
        parent,
        queryOptions,
      )

    return items
  }

  @Post('/coWorkingSpace/:coWorkingSpaceId/reviews')
  async createByCoWorkingSpaceId(
    @Param('coWorkingSpaceId') coWorkingSpaceId: string,
    @Body() body: ReviewCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, coWorkingSpaceId }

    const item = await this.reviewDomainFacade.create(valuesUpdated)

    await this.eventService.emit<ReviewApplicationEvent.ReviewCreated.Payload>(
      ReviewApplicationEvent
        .ReviewCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
  
}
