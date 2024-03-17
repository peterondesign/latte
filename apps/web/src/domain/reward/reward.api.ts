import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Reward } from './reward.model'

export class RewardApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Reward>,
  ): Promise<Reward[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/rewards${buildOptions}`)
  }

  static findOne(
    rewardId: string,
    queryOptions?: ApiHelper.QueryOptions<Reward>,
  ): Promise<Reward> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/rewards/${rewardId}${buildOptions}`)
  }

  static createOne(values: Partial<Reward>): Promise<Reward> {
    return HttpService.api.post(`/v1/rewards`, values)
  }

  static updateOne(rewardId: string, values: Partial<Reward>): Promise<Reward> {
    return HttpService.api.patch(`/v1/rewards/${rewardId}`, values)
  }

  static deleteOne(rewardId: string): Promise<void> {
    return HttpService.api.delete(`/v1/rewards/${rewardId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Reward>,
  ): Promise<Reward[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/rewards${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Reward>,
  ): Promise<Reward> {
    return HttpService.api.post(`/v1/users/user/${userId}/rewards`, values)
  }
}
