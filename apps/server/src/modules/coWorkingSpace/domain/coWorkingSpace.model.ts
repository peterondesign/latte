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

import { City } from '../../../modules/city/domain'

import { Review } from '../../../modules/review/domain'

import { CheckIn } from '../../../modules/checkIn/domain'

@Entity()
export class CoworkingSpace {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  name?: string

  @Column({ nullable: true })
  address?: string

  @Column({ nullable: true })
  priceRange?: string

  @Column({ nullable: true })
  amenities?: string

  @Column({ nullable: true })
  photosUrl?: string

  @Column({ nullable: true })
  hoursOfOperation?: string

  @ColumnNumeric({ nullable: true, type: 'numeric' })
  googleRating?: number

  @Column({ nullable: true })
  averageNoiseLevel?: string

  @Column({ nullable: true })
  averageWifiStrength?: string

  @Column({ nullable: true })
  cityId?: string

  @ManyToOne(() => City, parent => parent.coworkingSpaces)
  @JoinColumn({ name: 'cityId' })
  city?: City

  @OneToMany(() => Review, child => child.coworkingSpace)
  reviews?: Review[]

  @OneToMany(() => CheckIn, child => child.coworkingSpace)
  checkIns?: CheckIn[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
