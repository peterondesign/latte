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

import { Image } from '../../../modules/image/domain'

import { Review } from '../../../modules/review/domain'

import { CheckIn } from '../../../modules/checkIn/domain'

@Entity()
export class CoWorkingSpace {

@PrimaryGeneratedColumn('uuid')

id: string

@Column({})

title: string

@Column({})

address: string

@Column({"nullable":true})

description?: string

@Column({"nullable":true})

amenities?: string

@Column({"nullable":true})

noiseLevel?: string

@ColumnNumeric({"nullable":true,"type":"numeric"})

occupancy?: number

@Column({"nullable":true})

popular?: boolean

@Column({})

adminId: string

@ManyToOne(
  () => User,
  parent => parent.coWorkingSpacesAsAdmin,
  )
  @JoinColumn({ name: 'adminId' })

admin?: User

@OneToMany(
  () => Image,
  child => child.coWorkingSpace,
  )

images?: Image[]

@OneToMany(
  () => Review,
  child => child.coWorkingSpace,
  )

reviews?: Review[]

@OneToMany(
  () => CheckIn,
  child => child.coWorkingSpace,
  )

checkIns?: CheckIn[]

@CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
