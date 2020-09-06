import { User } from "@/models/user";
import { Label } from "@/models/label";
import { ReviewList } from "@/models/reviewList";

export class PR {
  constructor(
    public id: string,
    public title: string,
    public url: string,
    public author: User,
    public lastCommitDate: Date,
    public labels: Label[],
    public requestedReviewers: User[],
    public reviewList: ReviewList
  ) {}

  /**
   * 指定したユーザがPRの所有者であるか
   */
  isOwnedBy(user: User) {
    return this.author.id === user.id;
  }

  /**
   * Approveがいくつついた状態か計算する
   * NOTE: GraphQLの力でもっとスマートに解決できる気がする…。
   *       ロジック集中しちゃってるからもう少し整理したい
   * FIXME: PR主がコミットを追加せずに再レビュー依頼すると壊れる
   */
  calcApprovedCount(): Number {
    const approvedUserIds = new Set<string>();

    this.reviewList.reviews.forEach((review) => {
      if (review.state === "APPROVED") {
        approvedUserIds.add(review.user.id);
      } else if (
        review.state === "DISMISSED" ||
        review.state === "CHANGES_REQUESTED"
      ) {
        approvedUserIds.delete(review.user.id);
      }
    });

    return approvedUserIds.size;
  }
}