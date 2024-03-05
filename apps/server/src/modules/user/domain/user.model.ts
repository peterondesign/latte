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

import { CoWorkingSpace } from '../../../modules/coWorkingSpace/domain'

import { Review } from '../../../modules/review/domain'

import { CheckIn } from '../../../modules/checkIn/domain'

import { Comment } from '../../../modules/comment/domain'

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

@OneToMany(
  () => CoWorkingSpace,
  child => child.admin,
  )

coWorkingSpacesAsAdmin?: CoWorkingSpace[]

@OneToMany(
  () => Review,
  child => child.user,
  )

reviews?: Review[]

@OneToMany(
  () => CheckIn,
  child => child.user,
  )

checkIns?: CheckIn[]

@OneToMany(
  () => Comment,
  child => child.user,
  )

comments?: Comment[]

@OneToMany(
  () => Comment,
  child => child.profileUser,
  )

commentsAsProfileUser?: Comment[]

@OneToMany(() => Notification, notification => notification.user)
  notifications?: Notification[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
