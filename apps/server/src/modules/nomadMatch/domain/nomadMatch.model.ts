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

import { Message } from '../../../modules/message/domain'

@Entity()
export class NomadMatch {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  likeDislikeStatus?: string

  @Column({ nullable: true })
  userAId?: string

  @ManyToOne(() => User, parent => parent.nomadMatchsAsUserA)
  @JoinColumn({ name: 'userAId' })
  userA?: User

  @Column({ nullable: true })
  userBId?: string

  @ManyToOne(() => User, parent => parent.nomadMatchsAsUserB)
  @JoinColumn({ name: 'userBId' })
  userB?: User

  @OneToMany(() => Message, child => child.nomadMatch)
  messages?: Message[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
