import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class CommentCreateDto {

@IsString()

@IsNotEmpty()
  content: string

@IsString()

@IsOptional()
  userId?: string

@IsString()

@IsOptional()
  profileUserId?: string

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

export class CommentUpdateDto {

@IsString()

@IsOptional()
  content?: string

@IsString()

@IsOptional()
  userId?: string

@IsString()

@IsOptional()
  profileUserId?: string

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
