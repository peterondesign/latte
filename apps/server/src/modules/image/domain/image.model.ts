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

import { CoWorkingSpace } from '../../../modules/coWorkingSpace/domain'

@Entity()
export class Image {

@PrimaryGeneratedColumn('uuid')

id: string

@Column({})

url: string

@Column({})

coWorkingSpaceId: string

@ManyToOne(
  () => CoWorkingSpace,
  parent => parent.images,
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
