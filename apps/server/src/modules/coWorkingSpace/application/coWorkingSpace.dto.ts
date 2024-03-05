import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class CoWorkingSpaceCreateDto {

@IsString()

@IsNotEmpty()
  title: string

@IsString()

@IsNotEmpty()
  address: string

@IsString()

@IsOptional()
  description?: string

@IsString()

@IsOptional()
  amenities?: string

@IsString()

@IsOptional()
  noiseLevel?: string

@IsNumber()

@IsOptional()
  occupancy?: number

@IsBoolean()

@IsOptional()
  popular?: boolean

@IsString()

@IsOptional()
  adminId?: string

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

export class CoWorkingSpaceUpdateDto {

@IsString()

@IsOptional()
  title?: string

@IsString()

@IsOptional()
  address?: string

@IsString()

@IsOptional()
  description?: string

@IsString()

@IsOptional()
  amenities?: string

@IsString()

@IsOptional()
  noiseLevel?: string

@IsNumber()

@IsOptional()
  occupancy?: number

@IsBoolean()
  
  @IsOptional()
  popular?: boolean

@IsString()

@IsOptional()
  adminId?: string

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
