import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { CheckIn } from './checkIn.model'

export class CheckInApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<CheckIn>,
  ): Promise<CheckIn[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/checkIns${buildOptions}`)
  }

  static findOne(
    checkInId: string,
    queryOptions?: ApiHelper.QueryOptions<CheckIn>,
  ): Promise<CheckIn> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/checkIns/${checkInId}${buildOptions}`,
    )
  }

  static createOne(
    values: Partial<CheckIn>,
  ): Promise<CheckIn> {
    return HttpService.api.post(`/v1/checkIns`, values)
  }

  static updateOne(
    checkInId: string,
    values: Partial<CheckIn>,
  ): Promise<CheckIn> {
    return HttpService.api.patch(
      `/v1/checkIns/${checkInId}`,
      values,
    )
  }

  static deleteOne(checkInId: string): Promise<void> {
    return HttpService.api.delete(`/v1/checkIns/${checkInId}`)
  }

static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<CheckIn>,
  ): Promise<CheckIn[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/checkIns${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<CheckIn>,
  ): Promise<CheckIn> {
    return HttpService.api.post(
      `/v1/users/user/${userId}/checkIns`,
      values,
    )
  }

static findManyByCoWorkingSpaceId(
    coWorkingSpaceId: string,
    queryOptions?: ApiHelper.QueryOptions<CheckIn>,
  ): Promise<CheckIn[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/coWorkingSpaces/coWorkingSpace/${coWorkingSpaceId}/checkIns${buildOptions}`,
    )
  }

  static createOneByCoWorkingSpaceId(
    coWorkingSpaceId: string,
    values: Partial<CheckIn>,
  ): Promise<CheckIn> {
    return HttpService.api.post(
      `/v1/coWorkingSpaces/coWorkingSpace/${coWorkingSpaceId}/checkIns`,
      values,
    )
  }

}
