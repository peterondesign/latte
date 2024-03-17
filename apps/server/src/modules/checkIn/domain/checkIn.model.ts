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
export class CheckIn {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  userId?: string

  @ManyToOne(() => User, parent => parent.checkIns)
  @JoinColumn({ name: 'userId' })
  user?: User

  @Column({ nullable: true })
  coworkingSpaceId?: string

  @ManyToOne(() => CoworkingSpace, parent => parent.checkIns)
  @JoinColumn({ name: 'coworkingSpaceId' })
  coworkingSpace?: CoworkingSpace

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
