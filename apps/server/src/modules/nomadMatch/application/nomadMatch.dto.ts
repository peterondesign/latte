import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class NomadMatchCreateDto {
  @IsString()
  @IsOptional()
  likeDislikeStatus?: string

  @IsString()
  @IsOptional()
  userAId?: string

  @IsString()
  @IsOptional()
  userBId?: string

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

export class NomadMatchUpdateDto {
  @IsString()
  @IsOptional()
  likeDislikeStatus?: string

  @IsString()
  @IsOptional()
  userAId?: string

  @IsString()
  @IsOptional()
  userBId?: string

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
