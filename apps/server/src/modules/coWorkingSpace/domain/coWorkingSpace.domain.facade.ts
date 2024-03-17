import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { CoworkingSpace } from './coworkingSpace.model'

import { City } from '../../city/domain'

@Injectable()
export class CoworkingSpaceDomainFacade {
  constructor(
    @InjectRepository(CoworkingSpace)
    private repository: Repository<CoworkingSpace>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<CoworkingSpace>): Promise<CoworkingSpace> {
    return this.repository.save(values)
  }

  async update(
    item: CoworkingSpace,
    values: Partial<CoworkingSpace>,
  ): Promise<CoworkingSpace> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: CoworkingSpace): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<CoworkingSpace> = {},
  ): Promise<CoworkingSpace[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<CoworkingSpace> = {},
  ): Promise<CoworkingSpace> {
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

  async findManyByCity(
    item: City,
    queryOptions: RequestHelper.QueryOptions<CoworkingSpace> = {},
  ): Promise<CoworkingSpace[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('city')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        cityId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
