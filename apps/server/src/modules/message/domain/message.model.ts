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

import { NomadMatch } from '../../../modules/nomadMatch/domain'

import { User } from '../../../modules/user/domain'

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  content?: string

  @Column({ nullable: true })
  nomadMatchId?: string

  @ManyToOne(() => NomadMatch, parent => parent.messages)
  @JoinColumn({ name: 'nomadMatchId' })
  nomadMatch?: NomadMatch

  @Column({ nullable: true })
  senderId?: string

  @ManyToOne(() => User, parent => parent.messagesAsSender)
  @JoinColumn({ name: 'senderId' })
  sender?: User

  @Column({ nullable: true })
  receiverId?: string

  @ManyToOne(() => User, parent => parent.messagesAsReceiver)
  @JoinColumn({ name: 'receiverId' })
  receiver?: User

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
