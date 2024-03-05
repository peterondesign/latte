import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class CheckInCreateDto {

@IsString()

@IsNotEmpty()
  checkInTime: string

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

export class CheckInUpdateDto {

@IsString()

@IsOptional()
  checkInTime?: string

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
