import { User } from "./user";
import { Review } from "./review";
import { ReviewList } from "./reviewList";
import { REVIEW_STATUS } from "./constants";

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
   * ユーザが対象PRに最終的に出したステータス
   * NOTE: レビューリクエストがある場合は常にnullでしょ
   */
  latestReviewStatus(user: User): REVIEW_STATUS | null {
    // 対象ユーザのレビュー結果のみ抽出
    const reviewList = this.reviewList.byUser(user);
    const stateList = reviewList.reviews.map((r) => r.state);
    const lastApprovedIndex = stateList.lastIndexOf("APPROVED");
    const lastChangeRequestIndex = stateList.lastIndexOf("CHANGES_REQUESTED");

    // approveもrequestChangeもしている場合はあと勝ち
    if (lastApprovedIndex >= 0 && lastChangeRequestIndex >= 0) {
      return lastApprovedIndex > lastChangeRequestIndex
        ? "APPROVED"
        : "CHANGES_REQUESTED";
    }
    // approveのみ、requestChangeのみしている場合はそれを戻す
    if (lastApprovedIndex >= 0) {
      return "APPROVED";
    }
    if (lastChangeRequestIndex >= 0) {
      return "CHANGES_REQUESTED";
    }
    // どちらもなければ最終ステータスかNULLが戻る
    return reviewList.last()?.state || null;
  }

  /**
   * Approveがいくつついた状態か計算する
   * NOTE: GraphQLの力でもっとスマートに解決できる気がする…。
   *       ロジック集中しちゃってるからもう少し整理したい
   * FIXME: PR主がコミットを追加せずに再レビュー依頼すると壊れる
   */
  calcApprovedCount(): Number {
    const approvedUserIds: String[] = [];

    this.reviewList.reviews.forEach((review) => {
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
