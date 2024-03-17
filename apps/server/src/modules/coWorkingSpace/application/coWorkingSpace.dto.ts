import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class CoworkingSpaceCreateDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  address?: string

  @IsString()
  @IsOptional()
  priceRange?: string

  @IsString()
  @IsOptional()
  amenities?: string

  @IsString()
  @IsOptional()
  photosUrl?: string

  @IsString()
  @IsOptional()
  hoursOfOperation?: string

  @IsNumber()
  @IsOptional()
  googleRating?: number

  @IsString()
  @IsOptional()
  averageNoiseLevel?: string

  @IsString()
  @IsOptional()
  averageWifiStrength?: string

  @IsString()
  @IsOptional()
  cityId?: string

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

export class CoworkingSpaceUpdateDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  address?: string

  @IsString()
  @IsOptional()
  priceRange?: string

  @IsString()
  @IsOptional()
  amenities?: string

  @IsString()
  @IsOptional()
  photosUrl?: string

  @IsString()
  @IsOptional()
  hoursOfOperation?: string

  @IsNumber()
  @IsOptional()
  googleRating?: number

  @IsString()
  @IsOptional()
  averageNoiseLevel?: string

  @IsString()
  @IsOptional()
  averageWifiStrength?: string

  @IsString()
  @IsOptional()
  cityId?: string

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
