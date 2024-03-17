import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Preference } from './preference.model'

export class PreferenceApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Preference>,
  ): Promise<Preference[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/preferences${buildOptions}`)
  }

  static findOne(
    preferenceId: string,
    queryOptions?: ApiHelper.QueryOptions<Preference>,
  ): Promise<Preference> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/preferences/${preferenceId}${buildOptions}`)
  }

  static createOne(values: Partial<Preference>): Promise<Preference> {
    return HttpService.api.post(`/v1/preferences`, values)
  }

  static updateOne(
    preferenceId: string,
    values: Partial<Preference>,
  ): Promise<Preference> {
    return HttpService.api.patch(`/v1/preferences/${preferenceId}`, values)
  }

  static deleteOne(preferenceId: string): Promise<void> {
    return HttpService.api.delete(`/v1/preferences/${preferenceId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Preference>,
  ): Promise<Preference[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/preferences${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Preference>,
  ): Promise<Preference> {
    return HttpService.api.post(`/v1/users/user/${userId}/preferences`, values)
  }
}
