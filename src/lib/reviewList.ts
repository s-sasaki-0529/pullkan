import { Review } from "./review";
import { User } from "./user";

export class ReviewList {
  constructor(public reviews: Review[]) {}

  byUser(user: User) {
    return this.reviews.filter((r) => r.user.id === user.id);
  }
}
