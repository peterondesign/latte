import { AuthorizationRole as AuthorizationRoleModel } from './authorization/authorization.model'

import { User as UserModel } from './user/user.model'

import { Notification as NotificationModel } from './notification/notification.model'

import { CoWorkingSpace as CoWorkingSpaceModel } from './coWorkingSpace/coWorkingSpace.model'

import { Image as ImageModel } from './image/image.model'

import { Review as ReviewModel } from './review/review.model'

import { CheckIn as CheckInModel } from './checkIn/checkIn.model'

import { Comment as CommentModel } from './comment/comment.model'

export namespace Model {
  export class AuthorizationRole extends AuthorizationRoleModel {}
  
  export class User extends UserModel {}
  
  export class Notification extends NotificationModel {}
  
  export class CoWorkingSpace extends CoWorkingSpaceModel {}
  
  export class Image extends ImageModel {}
  
  export class Review extends ReviewModel {}
  
  export class CheckIn extends CheckInModel {}
  
  export class Comment extends CommentModel {}
  
}
