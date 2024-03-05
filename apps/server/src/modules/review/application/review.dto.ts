import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class ReviewCreateDto {

@IsString()

@IsNotEmpty()
  content: string

@IsString()

@IsOptional()
  userId?: string

@IsString()

@IsOptional()
  coWorkingSpaceId?: string

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

@IsString()

@IsOptional()
  userId?: string

@IsString()

@IsOptional()
  coWorkingSpaceId?: string

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
