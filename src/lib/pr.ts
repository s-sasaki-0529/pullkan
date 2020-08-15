import { User } from "./user";
import { Review } from "./review";

export class PR {
  constructor(
    public id: string,
    public title: string,
    public url: string,
    public author: User,
    public requestedReviewers: User[],
    public reviews: Review[]
  ) {}
}
