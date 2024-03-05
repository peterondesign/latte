import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { CoWorkingSpace } from './coWorkingSpace.model'

export class CoWorkingSpaceApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<CoWorkingSpace>,
  ): Promise<CoWorkingSpace[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/coWorkingSpaces${buildOptions}`)
  }

  static findOne(
    coWorkingSpaceId: string,
    queryOptions?: ApiHelper.QueryOptions<CoWorkingSpace>,
  ): Promise<CoWorkingSpace> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/coWorkingSpaces/${coWorkingSpaceId}${buildOptions}`,
    )
  }

  static createOne(
    values: Partial<CoWorkingSpace>,
  ): Promise<CoWorkingSpace> {
    return HttpService.api.post(`/v1/coWorkingSpaces`, values)
  }

  static updateOne(
    coWorkingSpaceId: string,
    values: Partial<CoWorkingSpace>,
  ): Promise<CoWorkingSpace> {
    return HttpService.api.patch(
      `/v1/coWorkingSpaces/${coWorkingSpaceId}`,
      values,
    )
  }

  static deleteOne(coWorkingSpaceId: string): Promise<void> {
    return HttpService.api.delete(`/v1/coWorkingSpaces/${coWorkingSpaceId}`)
  }

static findManyByAdminId(
    adminId: string,
    queryOptions?: ApiHelper.QueryOptions<CoWorkingSpace>,
  ): Promise<CoWorkingSpace[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/admin/${adminId}/coWorkingSpaces${buildOptions}`,
    )
  }

  static createOneByAdminId(
    adminId: string,
    values: Partial<CoWorkingSpace>,
  ): Promise<CoWorkingSpace> {
    return HttpService.api.post(
      `/v1/users/admin/${adminId}/coWorkingSpaces`,
      values,
    )
  }

}
