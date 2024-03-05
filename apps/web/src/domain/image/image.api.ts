import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Image } from './image.model'

export class ImageApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Image>,
  ): Promise<Image[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/images${buildOptions}`)
  }

  static findOne(
    imageId: string,
    queryOptions?: ApiHelper.QueryOptions<Image>,
  ): Promise<Image> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/images/${imageId}${buildOptions}`,
    )
  }

  static createOne(
    values: Partial<Image>,
  ): Promise<Image> {
    return HttpService.api.post(`/v1/images`, values)
  }

  static updateOne(
    imageId: string,
    values: Partial<Image>,
  ): Promise<Image> {
    return HttpService.api.patch(
      `/v1/images/${imageId}`,
      values,
    )
  }

  static deleteOne(imageId: string): Promise<void> {
    return HttpService.api.delete(`/v1/images/${imageId}`)
  }

static findManyByCoWorkingSpaceId(
    coWorkingSpaceId: string,
    queryOptions?: ApiHelper.QueryOptions<Image>,
  ): Promise<Image[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/coWorkingSpaces/coWorkingSpace/${coWorkingSpaceId}/images${buildOptions}`,
    )
  }

  static createOneByCoWorkingSpaceId(
    coWorkingSpaceId: string,
    values: Partial<Image>,
  ): Promise<Image> {
    return HttpService.api.post(
      `/v1/coWorkingSpaces/coWorkingSpace/${coWorkingSpaceId}/images`,
      values,
    )
  }

}
