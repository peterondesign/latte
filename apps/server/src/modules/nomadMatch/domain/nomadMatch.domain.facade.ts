import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { NomadMatch } from './nomadMatch.model'

import { User } from '../../user/domain'

@Injectable()
export class NomadMatchDomainFacade {
  constructor(
    @InjectRepository(NomadMatch)
    private repository: Repository<NomadMatch>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<NomadMatch>): Promise<NomadMatch> {
    return this.repository.save(values)
  }

  async update(
    item: NomadMatch,
    values: Partial<NomadMatch>,
  ): Promise<NomadMatch> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: NomadMatch): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<NomadMatch> = {},
  ): Promise<NomadMatch[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<NomadMatch> = {},
  ): Promise<NomadMatch> {
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

  async findManyByUserA(
    item: User,
    queryOptions: RequestHelper.QueryOptions<NomadMatch> = {},
  ): Promise<NomadMatch[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('userA')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        userAId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findManyByUserB(
    item: User,
    queryOptions: RequestHelper.QueryOptions<NomadMatch> = {},
  ): Promise<NomadMatch[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('userB')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        userBId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
