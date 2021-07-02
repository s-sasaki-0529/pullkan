import { User } from '@/models/user'
import { ReviewStatus } from '@/lib/types'

export class Review {
  constructor(public user: User, public state: ReviewStatus, public createdAt: Date) {}
}
