import { User } from "./user";
import { REVIEW_STATUS } from "./constants";

export class Review {
  constructor(public user: User, public state: REVIEW_STATUS) {}
}
