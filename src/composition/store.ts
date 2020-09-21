import { PR } from '@/models/pr'
import CurrentUser from '@/models/currentUser'
import { inject, provide, reactive } from 'vue'
import { dispatch } from '@/lib/dispatcher'
import { ORGANIZED_PULL_REQUESTS } from '@/lib/constants'

export const key = Symbol()

export type State = {
  onLoading: Boolean
  currentUser: CurrentUser
  pullRequests: ORGANIZED_PULL_REQUESTS
}

export type Store = {
  state: State
  reload: () => void
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
  const reload = () => {
    if (state.onLoading) return
    state.onLoading = true

    dispatch()
      .then(response => {
        state.currentUser = response.currentUser
        state.pullRequests = organizePRs(response.pullRequests)
      })
      .finally(() => {
        state.onLoading = false
      })
  }

  // PR一覧を所有/レビュー待ち/レビュー済み/承認済みに分類する
  const organizePRs = (pullRequests: PR[]) => {
    const organizedPRs = {
      own: [],
      requested: [],
      inReview: [],
      approved: []
    } as ORGANIZED_PULL_REQUESTS

    pullRequests.forEach(pr => {
      if (pr.isOwnedBy(state.currentUser!)) {
        organizedPRs.own.push(pr)
        return
      }
      if (state.currentUser?.isRequestedBy(pr)) {
        organizedPRs.requested.push(pr)
        return
      }
      if (state.currentUser?.latestReviewStatus(pr) === 'APPROVED') {
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
