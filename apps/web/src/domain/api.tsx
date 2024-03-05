import { AiApi } from './ai/ai.api'
import { AuthenticationApi } from './authentication/authentication.api'
import { AuthorizationApi } from './authorization/authorization.api'
import { UploadApi } from './upload/upload.api'

import { UserApi } from './user/user.api'

import { NotificationApi } from './notification/notification.api'

import { CoWorkingSpaceApi } from './coWorkingSpace/coWorkingSpace.api'

import { ImageApi } from './image/image.api'

import { ReviewApi } from './review/review.api'

import { CheckInApi } from './checkIn/checkIn.api'

import { CommentApi } from './comment/comment.api'

export namespace Api {
  export class Ai extends AiApi {}
  export class Authentication extends AuthenticationApi {}
  export class Authorization extends AuthorizationApi {}
  export class Upload extends UploadApi {}
  
  export class User extends UserApi {}
  
  export class Notification extends NotificationApi {}
  
  export class CoWorkingSpace extends CoWorkingSpaceApi {}
  
  export class Image extends ImageApi {}
  
  export class Review extends ReviewApi {}
  
  export class CheckIn extends CheckInApi {}
  
  export class Comment extends CommentApi {}
  
}
