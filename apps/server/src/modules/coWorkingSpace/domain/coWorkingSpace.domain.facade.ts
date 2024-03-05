import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { CoWorkingSpace } from './coWorkingSpace.model'

import { User } from '../../user/domain'

@Injectable()
export class CoWorkingSpaceDomainFacade {
  constructor(
    @InjectRepository(CoWorkingSpace)
    private repository: Repository<CoWorkingSpace>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(
    values: Partial<CoWorkingSpace>,
  ): Promise<CoWorkingSpace> {
    return this.repository.save(values)
  }

  async update(
    item: CoWorkingSpace,
    values: Partial<CoWorkingSpace>,
  ): Promise<CoWorkingSpace> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: CoWorkingSpace): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<CoWorkingSpace> = {},
  ): Promise<CoWorkingSpace[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<CoWorkingSpace> = {},
  ): Promise<CoWorkingSpace> {
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

async findManyByAdmin(
    item: User,
    queryOptions: RequestHelper.QueryOptions<CoWorkingSpace> = {},
  ): Promise<CoWorkingSpace[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('admin')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        adminId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

}
