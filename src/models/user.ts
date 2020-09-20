import { PR } from '@/models/pr'
import { REVIEW_STATUS } from '@/lib/constants'

export class User {
  constructor(public id: string, public name: string, public avatarUrl: string) {}

  /**
   * 指定したPRからレビューリクエストを受けているか
   */
  isRequestedBy(pr: PR): Boolean {
    return pr.requestedReviewers.some(reviewer => reviewer.id === this.id)
  }

  /**
   * 対象PRに対する最終的なレビューステータス
   */
  latestReviewStatus(pr: PR): REVIEW_STATUS | null {
    // 対象PRから自身のレビューステータス一覧を取得
    const reviewList = pr.reviewList.byUser(this)
    const stateList = reviewList.reviews.map(r => r.state)

    // ApproveとChangesRequestは後勝ちになるのでインデックスを控えておく
    const lastApprovedIndex = stateList.lastIndexOf('APPROVED')
    const lastChangeRequestIndex = stateList.lastIndexOf('CHANGES_REQUESTED')

    // approveもrequestChangeもしている場合: 後勝ち
    if (lastApprovedIndex >= 0 && lastChangeRequestIndex >= 0) {
      return lastApprovedIndex > lastChangeRequestIndex ? 'APPROVED' : 'CHANGES_REQUESTED'
    }

    // approveのみ、requestChangeのみしている場合はそれを戻す
    if (lastApprovedIndex >= 0) {
      return 'APPROVED'
    }
    if (lastChangeRequestIndex >= 0) {
      return 'CHANGES_REQUESTED'
    }

    // どちらもなければ最終ステータスかNULLが戻る
    return reviewList.last()?.state || null
  }
}
