import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ReviewDomainFacade } from '@server/modules/review/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ReviewApplicationEvent } from './review.application.event'
import { ReviewCreateDto } from './review.dto'

import { CoworkingSpaceDomainFacade } from '../../coworkingSpace/domain'

@Controller('/v1/coworkingSpaces')
export class ReviewByCoworkingSpaceController {
  constructor(
    private coworkingSpaceDomainFacade: CoworkingSpaceDomainFacade,

    private reviewDomainFacade: ReviewDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/coworkingSpace/:coworkingSpaceId/reviews')
  async findManyCoworkingSpaceId(
    @Param('coworkingSpaceId') coworkingSpaceId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.coworkingSpaceDomainFacade.findOneByIdOrFail(coworkingSpaceId)

    const items = await this.reviewDomainFacade.findManyByCoworkingSpace(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/coworkingSpace/:coworkingSpaceId/reviews')
  async createByCoworkingSpaceId(
    @Param('coworkingSpaceId') coworkingSpaceId: string,
    @Body() body: ReviewCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, coworkingSpaceId }

    const item = await this.reviewDomainFacade.create(valuesUpdated)

    await this.eventService.emit<ReviewApplicationEvent.ReviewCreated.Payload>(
      ReviewApplicationEvent.ReviewCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
