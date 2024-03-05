import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Image } from './image.model'

import { CoWorkingSpace } from '../../coWorkingSpace/domain'

@Injectable()
export class ImageDomainFacade {
  constructor(
    @InjectRepository(Image)
    private repository: Repository<Image>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(
    values: Partial<Image>,
  ): Promise<Image> {
    return this.repository.save(values)
  }

  async update(
    item: Image,
    values: Partial<Image>,
  ): Promise<Image> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Image): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Image> = {},
  ): Promise<Image[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Image> = {},
  ): Promise<Image> {
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

async findManyByCoWorkingSpace(
    item: CoWorkingSpace,
    queryOptions: RequestHelper.QueryOptions<Image> = {},
  ): Promise<Image[]> {
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
