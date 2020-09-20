import { User } from '@/models/user'
import { REVIEW_STATUS } from '@/lib/constants'

export class Review {
  constructor(public user: User, public state: REVIEW_STATUS, public createdAt: Date) {}
}
