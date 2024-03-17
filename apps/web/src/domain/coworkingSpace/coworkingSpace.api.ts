import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { CoworkingSpace } from './coworkingSpace.model'

export class CoworkingSpaceApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<CoworkingSpace>,
  ): Promise<CoworkingSpace[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/coworkingSpaces${buildOptions}`)
  }

  static findOne(
    coworkingSpaceId: string,
    queryOptions?: ApiHelper.QueryOptions<CoworkingSpace>,
  ): Promise<CoworkingSpace> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/coworkingSpaces/${coworkingSpaceId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<CoworkingSpace>): Promise<CoworkingSpace> {
    return HttpService.api.post(`/v1/coworkingSpaces`, values)
  }

  static updateOne(
    coworkingSpaceId: string,
    values: Partial<CoworkingSpace>,
  ): Promise<CoworkingSpace> {
    return HttpService.api.patch(
      `/v1/coworkingSpaces/${coworkingSpaceId}`,
      values,
    )
  }

  static deleteOne(coworkingSpaceId: string): Promise<void> {
    return HttpService.api.delete(`/v1/coworkingSpaces/${coworkingSpaceId}`)
  }

  static findManyByCityId(
    cityId: string,
    queryOptions?: ApiHelper.QueryOptions<CoworkingSpace>,
  ): Promise<CoworkingSpace[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/citys/city/${cityId}/coworkingSpaces${buildOptions}`,
    )
  }

  static createOneByCityId(
    cityId: string,
    values: Partial<CoworkingSpace>,
  ): Promise<CoworkingSpace> {
    return HttpService.api.post(
      `/v1/citys/city/${cityId}/coworkingSpaces`,
      values,
    )
  }
}
