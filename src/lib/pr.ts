import { User } from "./user";
import { Review } from "./review";
import { ReviewList } from "./reviewList";

export class PR {
  constructor(
    public id: string,
    public title: string,
    public url: string,
    public author: User,
    public lastCommitDate: Date,
    public requestedReviewers: User[],
    public reviewList: ReviewList
  ) {
    this.removeOldReviews();
  }

  /**
   * 最終コミット時よりも古いレビューを除外する
   */
  removeOldReviews() {
    this.reviewList = this.reviewList.byDateFrom(this.lastCommitDate);
  }

  /**
   * 特定ユーザがレビュー済みかどうか
   */
  reviewedBy(user: User): Boolean {
    return this.reviewList.byUser(user).length > 0;
  }
}
