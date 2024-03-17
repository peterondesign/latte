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
import { Reward, RewardDomainFacade } from '@server/modules/reward/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { RewardApplicationEvent } from './reward.application.event'
import { RewardCreateDto, RewardUpdateDto } from './reward.dto'

@Controller('/v1/rewards')
export class RewardController {
  constructor(
    private eventService: EventService,
    private rewardDomainFacade: RewardDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.rewardDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: RewardCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.rewardDomainFacade.create(body)

    await this.eventService.emit<RewardApplicationEvent.RewardCreated.Payload>(
      RewardApplicationEvent.RewardCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:rewardId')
  async findOne(@Param('rewardId') rewardId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.rewardDomainFacade.findOneByIdOrFail(
      rewardId,
      queryOptions,
    )

    return item
  }

  @Patch('/:rewardId')
  async update(
    @Param('rewardId') rewardId: string,
    @Body() body: RewardUpdateDto,
  ) {
    const item = await this.rewardDomainFacade.findOneByIdOrFail(rewardId)

    const itemUpdated = await this.rewardDomainFacade.update(
      item,
      body as Partial<Reward>,
    )
    return itemUpdated
  }

  @Delete('/:rewardId')
  async delete(@Param('rewardId') rewardId: string) {
    const item = await this.rewardDomainFacade.findOneByIdOrFail(rewardId)

    await this.rewardDomainFacade.delete(item)

    return item
  }
}
