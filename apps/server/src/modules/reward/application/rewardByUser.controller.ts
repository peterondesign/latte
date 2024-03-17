import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { RewardDomainFacade } from '@server/modules/reward/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RewardApplicationEvent } from './reward.application.event'
import { RewardCreateDto } from './reward.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class RewardByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private rewardDomainFacade: RewardDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/rewards')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.rewardDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/rewards')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: RewardCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.rewardDomainFacade.create(valuesUpdated)

    await this.eventService.emit<RewardApplicationEvent.RewardCreated.Payload>(
      RewardApplicationEvent.RewardCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
