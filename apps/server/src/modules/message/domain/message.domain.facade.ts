import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Message } from './message.model'

import { NomadMatch } from '../../nomadMatch/domain'

import { User } from '../../user/domain'

@Injectable()
export class MessageDomainFacade {
  constructor(
    @InjectRepository(Message)
    private repository: Repository<Message>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Message>): Promise<Message> {
    return this.repository.save(values)
  }

  async update(item: Message, values: Partial<Message>): Promise<Message> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Message): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Message> = {},
  ): Promise<Message[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Message> = {},
  ): Promise<Message> {
    if (!id) {
      this.databaseHelper.invalidQueryWhere('id')
    }

    const queryOptionsEnsured = {
      includes: queryOptions?.includes,
      filters: {
        id: id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    const item = await query.getOne()

    if (!item) {
      this.databaseHelper.notFoundByQuery(queryOptionsEnsured.filters)
    }

    return item
  }

  async findManyByNomadMatch(
    item: NomadMatch,
    queryOptions: RequestHelper.QueryOptions<Message> = {},
  ): Promise<Message[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('nomadMatch')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        nomadMatchId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findManyBySender(
    item: User,
    queryOptions: RequestHelper.QueryOptions<Message> = {},
  ): Promise<Message[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('sender')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        senderId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findManyByReceiver(
    item: User,
    queryOptions: RequestHelper.QueryOptions<Message> = {},
  ): Promise<Message[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('receiver')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        receiverId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
