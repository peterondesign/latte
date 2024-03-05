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
  Image,
  ImageDomainFacade,
} from '@server/modules/image/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { ImageApplicationEvent } from './image.application.event'
import {
  ImageCreateDto,
  ImageUpdateDto,
} from './image.dto'

@Controller('/v1/images')
export class ImageController {
  constructor(
    private eventService: EventService,
    private imageDomainFacade: ImageDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.imageDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(
    @Body() body: ImageCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.imageDomainFacade.create(body)

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

  @Get('/:imageId')
  async findOne(
    @Param('imageId') imageId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item =
      await this.imageDomainFacade.findOneByIdOrFail(
        imageId,
        queryOptions,
      )

    return item
  }

  @Patch('/:imageId')
  async update(
    @Param('imageId') imageId: string,
    @Body() body: ImageUpdateDto,
  ) {
    const item =
      await this.imageDomainFacade.findOneByIdOrFail(
        imageId,
      )

    const itemUpdated = await this.imageDomainFacade.update(
      item,
      body as Partial<Image>,
    )
    return itemUpdated
  }

  @Delete('/:imageId')
  async delete(@Param('imageId') imageId: string) {
    const item =
      await this.imageDomainFacade.findOneByIdOrFail(
        imageId,
      )

    await this.imageDomainFacade.delete(item)

    return item
  }
}
