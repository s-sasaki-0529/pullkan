import { Review } from "./review";
import { User } from "./user";
import { REVIEW_STATUS } from "./constants";

export class ReviewList {
  public length: Number;

  constructor(public reviews: Review[]) {
    this.length = reviews.length;
  }

  /**
   * ユーザで絞り込む
   */
  byUser(user: User) {
    return new ReviewList(this.reviews.filter(r => r.user.id === user.id));
  }

  /**
   * ステータスで絞り込む
   */
  byState(state: REVIEW_STATUS) {
    return new ReviewList(this.reviews.filter(r => r.state === state));
  }

  /**
   * 指定日時以降のレビューのみ絞り込む
   */
  byDateFrom(date: Date) {
    return new ReviewList(this.reviews.filter(r => r.createdAt >= date));
  }
}
