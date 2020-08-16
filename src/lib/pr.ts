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
  ) {}

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

  /**
   * Approveがいくつついた状態か計算する
   * NOTE: GraphQLの力でもっとスマートに解決できる気がする…。
   *       ロジック集中しちゃってるからもう少し整理したい
   * FIXME: PR主がコミットを追加せずに再レビュー依頼すると壊れる
   */
  calcApprovedCount(): Number {
    const approvedUserIds: String[] = [];

    this.reviewList.reviews.forEach(review => {
      if (review.state === "APPROVED") {
        approvedUserIds.push(review.user.id);
      } else if (
        review.state === "DISMISSED" ||
        review.state === "CHANGES_REQUESTED"
      ) {
        const index = approvedUserIds.indexOf(review.user.id);
        if (index >= 0) {
          approvedUserIds.splice(index, 1);
        }
      }
    });

    return approvedUserIds.length;
  }
}
