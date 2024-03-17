import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { City } from './city.model'

export class CityApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<City>,
  ): Promise<City[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/citys${buildOptions}`)
  }

  static findOne(
    cityId: string,
    queryOptions?: ApiHelper.QueryOptions<City>,
  ): Promise<City> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/citys/${cityId}${buildOptions}`)
  }

  static createOne(values: Partial<City>): Promise<City> {
    return HttpService.api.post(`/v1/citys`, values)
  }

  static updateOne(cityId: string, values: Partial<City>): Promise<City> {
    return HttpService.api.patch(`/v1/citys/${cityId}`, values)
  }

  static deleteOne(cityId: string): Promise<void> {
    return HttpService.api.delete(`/v1/citys/${cityId}`)
  }
}
