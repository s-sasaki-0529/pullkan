import { User } from '@/models/user'
import { Label } from '@/models/label'
import { ReviewList } from '@/models/reviewList'
import Repository from './repository'

export class PR {
  constructor(
    public id: string,
    public title: string,
    public url: string,
    public repository: Repository,
    public author: User,
    public lastCommitDate: Date,
    public labels: Label[],
    public requestedReviewers: User[],
    public reviewList: ReviewList,
    public isDraft: Boolean
  ) {}

  /**
   * 二種類のPR一覧を渡し、newPRsに新しいrequestedPRが追加されているか判定する
   * 新規PRがある場合はその先頭PRを戻す
   */
  static getNewRequestedPR(oldPRs: PR[], newPRs: PR[]): PR | undefined {
    const oldPRIds = oldPRs.map(pr => pr.id)
    return newPRs.find(newPr => {
      return oldPRIds.indexOf(newPr.id) === -1
    })
  }

  /**
   * 指定したユーザがPRの所有者であるか
   */
  isOwnedBy(user: User) {
    return this.author.id === user.id
  }

  /**
   * WIPラベルが付与されているか
   */
  isWIP() {
    return this.labels.some(label => label.name === 'WIP')
  }

  /**
   * レビュー可能状態か(WIPでもDraftでもないか)
   */
  isReady() {
    return !this.isDraft && !this.isWIP()
  }

  approvers() {
    const reviewers = this.reviewList.reviews.map(review => review.user)
    const approverIds = new Set<string>()

    this.reviewList.reviews.forEach(review => {
      if (review.state === 'APPROVED') {
        approverIds.add(review.user.id)
      } else if (review.state === 'DISMISSED' || review.state === 'CHANGES_REQUESTED') {
        approverIds.delete(review.user.id)
      }
    })

    return Array.from(approverIds).map(approverId => reviewers.find(reviewr => reviewr.id === approverId))
  }

  commenters() {
    const commenters = this.reviewList.reviews.map(review => review.user)
    return commenters.filter((c1, index) => commenters.findIndex(c2 => c2.id === c1.id) === index)
  }

  approvedCount() {
    return this.approvers().length
  }
}
