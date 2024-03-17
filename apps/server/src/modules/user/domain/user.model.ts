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

import { Notification } from '../../../modules/notification/domain'

import { Review } from '../../../modules/review/domain'

import { NomadMatch } from '../../../modules/nomadMatch/domain'

import { Message } from '../../../modules/message/domain'

import { Subscription } from '../../../modules/subscription/domain'

import { CheckIn } from '../../../modules/checkIn/domain'

import { Reward } from '../../../modules/reward/domain'

import { Preference } from '../../../modules/preference/domain'

export enum UserStatus {
  VERIFIED = 'VERIFIED',
  CREATED = 'CREATED',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  email: string

  @Column()
  name: string

  @Column({ nullable: true })
  pictureUrl?: string

  @Column({ select: false, nullable: true })
  password: string

  @Column({ enum: UserStatus, default: UserStatus.VERIFIED })
  status: UserStatus

  @OneToMany(() => Review, child => child.user)
  reviews?: Review[]

  @OneToMany(() => NomadMatch, child => child.userA)
  nomadMatchsAsUserA?: NomadMatch[]

  @OneToMany(() => NomadMatch, child => child.userB)
  nomadMatchsAsUserB?: NomadMatch[]

  @OneToMany(() => Message, child => child.sender)
  messagesAsSender?: Message[]

  @OneToMany(() => Message, child => child.receiver)
  messagesAsReceiver?: Message[]

  @OneToMany(() => Subscription, child => child.user)
  subscriptions?: Subscription[]

  @OneToMany(() => CheckIn, child => child.user)
  checkIns?: CheckIn[]

  @OneToMany(() => Reward, child => child.user)
  rewards?: Reward[]

  @OneToMany(() => Preference, child => child.user)
  preferences?: Preference[]

  @OneToMany(() => Notification, notification => notification.user)
  notifications?: Notification[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
