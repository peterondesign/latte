import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { NomadMatch } from './nomadMatch.model'

export class NomadMatchApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<NomadMatch>,
  ): Promise<NomadMatch[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/nomadMatchs${buildOptions}`)
  }

  static findOne(
    nomadMatchId: string,
    queryOptions?: ApiHelper.QueryOptions<NomadMatch>,
  ): Promise<NomadMatch> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/nomadMatchs/${nomadMatchId}${buildOptions}`)
  }

  static createOne(values: Partial<NomadMatch>): Promise<NomadMatch> {
    return HttpService.api.post(`/v1/nomadMatchs`, values)
  }

  static updateOne(
    nomadMatchId: string,
    values: Partial<NomadMatch>,
  ): Promise<NomadMatch> {
    return HttpService.api.patch(`/v1/nomadMatchs/${nomadMatchId}`, values)
  }

  static deleteOne(nomadMatchId: string): Promise<void> {
    return HttpService.api.delete(`/v1/nomadMatchs/${nomadMatchId}`)
  }

  static findManyByUserAId(
    userAId: string,
    queryOptions?: ApiHelper.QueryOptions<NomadMatch>,
  ): Promise<NomadMatch[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/userA/${userAId}/nomadMatchs${buildOptions}`,
    )
  }

  static createOneByUserAId(
    userAId: string,
    values: Partial<NomadMatch>,
  ): Promise<NomadMatch> {
    return HttpService.api.post(
      `/v1/users/userA/${userAId}/nomadMatchs`,
      values,
    )
  }

  static findManyByUserBId(
    userBId: string,
    queryOptions?: ApiHelper.QueryOptions<NomadMatch>,
  ): Promise<NomadMatch[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/userB/${userBId}/nomadMatchs${buildOptions}`,
    )
  }

  static createOneByUserBId(
    userBId: string,
    values: Partial<NomadMatch>,
  ): Promise<NomadMatch> {
    return HttpService.api.post(
      `/v1/users/userB/${userBId}/nomadMatchs`,
      values,
    )
  }
}
