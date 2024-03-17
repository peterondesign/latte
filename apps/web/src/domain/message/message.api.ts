import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Message } from './message.model'

export class MessageApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Message>,
  ): Promise<Message[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/messages${buildOptions}`)
  }

  static findOne(
    messageId: string,
    queryOptions?: ApiHelper.QueryOptions<Message>,
  ): Promise<Message> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/messages/${messageId}${buildOptions}`)
  }

  static createOne(values: Partial<Message>): Promise<Message> {
    return HttpService.api.post(`/v1/messages`, values)
  }

  static updateOne(
    messageId: string,
    values: Partial<Message>,
  ): Promise<Message> {
    return HttpService.api.patch(`/v1/messages/${messageId}`, values)
  }

  static deleteOne(messageId: string): Promise<void> {
    return HttpService.api.delete(`/v1/messages/${messageId}`)
  }

  static findManyByNomadMatchId(
    nomadMatchId: string,
    queryOptions?: ApiHelper.QueryOptions<Message>,
  ): Promise<Message[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/nomadMatchs/nomadMatch/${nomadMatchId}/messages${buildOptions}`,
    )
  }

  static createOneByNomadMatchId(
    nomadMatchId: string,
    values: Partial<Message>,
  ): Promise<Message> {
    return HttpService.api.post(
      `/v1/nomadMatchs/nomadMatch/${nomadMatchId}/messages`,
      values,
    )
  }

  static findManyBySenderId(
    senderId: string,
    queryOptions?: ApiHelper.QueryOptions<Message>,
  ): Promise<Message[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/sender/${senderId}/messages${buildOptions}`,
    )
  }

  static createOneBySenderId(
    senderId: string,
    values: Partial<Message>,
  ): Promise<Message> {
    return HttpService.api.post(`/v1/users/sender/${senderId}/messages`, values)
  }

  static findManyByReceiverId(
    receiverId: string,
    queryOptions?: ApiHelper.QueryOptions<Message>,
  ): Promise<Message[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/receiver/${receiverId}/messages${buildOptions}`,
    )
  }

  static createOneByReceiverId(
    receiverId: string,
    values: Partial<Message>,
  ): Promise<Message> {
    return HttpService.api.post(
      `/v1/users/receiver/${receiverId}/messages`,
      values,
    )
  }
}
