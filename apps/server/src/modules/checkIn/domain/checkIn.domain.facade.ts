import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { CheckIn } from './checkIn.model'

import { User } from '../../user/domain'

import { CoWorkingSpace } from '../../coWorkingSpace/domain'

@Injectable()
export class CheckInDomainFacade {
  constructor(
    @InjectRepository(CheckIn)
    private repository: Repository<CheckIn>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(
    values: Partial<CheckIn>,
  ): Promise<CheckIn> {
    return this.repository.save(values)
  }

  async update(
    item: CheckIn,
    values: Partial<CheckIn>,
  ): Promise<CheckIn> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: CheckIn): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<CheckIn> = {},
  ): Promise<CheckIn[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<CheckIn> = {},
  ): Promise<CheckIn> {
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

async findManyByUser(
    item: User,
    queryOptions: RequestHelper.QueryOptions<CheckIn> = {},
  ): Promise<CheckIn[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('user')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        userId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

async findManyByCoWorkingSpace(
    item: CoWorkingSpace,
    queryOptions: RequestHelper.QueryOptions<CheckIn> = {},
  ): Promise<CheckIn[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('coWorkingSpace')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        coWorkingSpaceId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

}
