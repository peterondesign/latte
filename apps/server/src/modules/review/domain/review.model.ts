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

import { CoworkingSpace } from '../../../modules/coworkingSpace/domain'

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  content?: string

  @ColumnNumeric({ nullable: true, type: 'numeric' })
  rating?: number

  @Column({ nullable: true })
  userId?: string

  @ManyToOne(() => User, parent => parent.reviews)
  @JoinColumn({ name: 'userId' })
  user?: User

  @Column({ nullable: true })
  coworkingSpaceId?: string

  @ManyToOne(() => CoworkingSpace, parent => parent.reviews)
  @JoinColumn({ name: 'coworkingSpaceId' })
  coworkingSpace?: CoworkingSpace

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
