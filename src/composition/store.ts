import { PR } from '@/models/pr'
import CurrentUser from '@/models/currentUser'
import { inject, provide, reactive } from 'vue'
import { dispatch } from '@/lib/dispatcher'
import { ORGANIZED_PULL_REQUESTS } from '@/lib/types'
import { Setting } from './setting'

export const key = Symbol()

export type State = {
  onLoading: Boolean
  currentUser: CurrentUser
  pullRequests: ORGANIZED_PULL_REQUESTS
}

export type Store = {
  state: State
  reload: (setting: Setting) => void
}

export const createStore = () => {
  const state = reactive({
    onLoading: false,
    currentUser: CurrentUser.NullObject(),
    pullRequests: {
      own: [],
      requested: [],
      inReview: [],
      approved: []
    }
  } as State)

  // Github API を叩いて、レスポンスを元に状態を更新する
  const reload = (setting: Setting) => {
    if (state.onLoading) return
    state.onLoading = true

    dispatch()
      .then(response => {
        state.currentUser = response.currentUser
        state.pullRequests = organizePRs(response.pullRequests, setting.ignoreWipPRs)
      })
      .finally(() => {
        state.onLoading = false
      })
  }

  // PR一覧を所有/レビュー待ち/レビュー済み/承認済みに分類する
  // FIXME: createStore関数内に定義するのは微妙かも
  const organizePRs = (pullRequests: PR[], ignoreWipPRs: Boolean) => {
    const organizedPRs = {
      own: [],
      requested: [],
      inReview: [],
      approved: []
    } as ORGANIZED_PULL_REQUESTS

    pullRequests.forEach(pr => {
      // 自身のPR一覧
      if (pr.isOwnedBy(state.currentUser)) {
        organizedPRs.own.push(pr)
        return
      }
      // WIP除外設定の場合、WIPはここで捕捉する
      // 自身のPRのみWIPでも表示するため、分岐の順番が重要
      if (ignoreWipPRs && pr.isWIP()) {
        return
      }
      // レビューリクエストが来ているPR一覧
      // 過去にapprove済みであっても再リクエストが来るケースがあるのでこの順番
      if (state.currentUser?.isRequestedBy(pr)) {
        organizedPRs.requested.push(pr)
        return
      }
      // レビューリクエストが来ていないPRが残るので、
      // 自身のレビュー履歴を元に分類する。
      // リクエストも来てない、レビューもしていないPRは関係ないPRなので捨てる
      const latestReviewStatus = state.currentUser.latestReviewStatus(pr)
      if (latestReviewStatus === null) {
        return
      } else if (latestReviewStatus === 'APPROVED') {
        organizedPRs.approved.push(pr)
      } else {
        organizedPRs.inReview.push(pr)
      }
    })
    return organizedPRs
  }

  return { state, reload } as Store
}

export const provideStore = () => {
  return provide(key, createStore())
}

export const useStore = () => {
  return inject(key) as Store
}
