import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class ImageCreateDto {

@IsString()

@IsNotEmpty()
  url: string

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

export class ImageUpdateDto {

@IsString()

@IsOptional()
  url?: string

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
