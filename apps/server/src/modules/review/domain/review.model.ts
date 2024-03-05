import { ColumnNumeric } from '@server/core/database'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { User } from '../../../modules/user/domain'

import { CoWorkingSpace } from '../../../modules/coWorkingSpace/domain'

@Entity()
export class Review {

@PrimaryGeneratedColumn('uuid')

id: string

@Column({})

content: string

@Column({})

userId: string

@ManyToOne(
  () => User,
  parent => parent.reviews,
  )
  @JoinColumn({ name: 'userId' })

user?: User

@Column({})

coWorkingSpaceId: string

@ManyToOne(
  () => CoWorkingSpace,
  parent => parent.reviews,
  )
  @JoinColumn({ name: 'coWorkingSpaceId' })

coWorkingSpace?: CoWorkingSpace

@CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
