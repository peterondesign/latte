import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class ReviewCreateDto {
  @IsString()
  @IsOptional()
  content?: string

  @IsNumber()
  @IsOptional()
  rating?: number

  @IsString()
  @IsOptional()
  userId?: string

  @IsString()
  @IsOptional()
  coworkingSpaceId?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}

export class ReviewUpdateDto {
  @IsString()
  @IsOptional()
  content?: string

  @IsNumber()
  @IsOptional()
  rating?: number

  @IsString()
  @IsOptional()
  userId?: string

  @IsString()
  @IsOptional()
  coworkingSpaceId?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}
