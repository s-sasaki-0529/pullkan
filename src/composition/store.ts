import { reactive, computed } from "vue";
import { PR } from "@/lib/pr";
import { User } from "@/lib/user";

export function Store(_pullRequests: PR[], _currentUser: User) {
  // 整形されたAPIレスポンス
  const state = reactive({
    pullRequests: _pullRequests,
    currentUser: _currentUser,
  });

  // PRの状態に応じて4種のcomputedに分類する
  //   自身の作成したPR
  //   レビューリクエストを受けている(未レビュー)PR
  //   レビュー中のPR (コメント入れたりリクエストチェンジ投げたり)
  //   Approve済みのPR
  // NOTE: それぞれについてComputedで定義したいがために、ループのネストを4回繰り返している。
  //       実用上の負荷が高い場合はデータ構造などの見直しも検討する

  const ownPRs = computed(() => {
    return state.pullRequests.filter((pr) => {
      return pr.isOwnedBy(state.currentUser);
    });
  });

  const requestedPRs = computed(() => {
    return state.pullRequests.filter((pr) => {
      return state.currentUser.isRequestedBy(pr);
    });
  });

  const inReviewPRs = computed(() => {
    return state.pullRequests.filter((pr) => {
      if (pr.isOwnedBy(state.currentUser)) {
        return false;
      }
      if (state.currentUser.isRequestedBy(pr)) {
        return false;
      }

      const reviewStatus = state.currentUser.latestReviewStatus(pr);
      return reviewStatus && reviewStatus !== "APPROVED";
    });
  });

  const approvedPRs = computed(() => {
    return state.pullRequests.filter((pr) => {
      if (pr.isOwnedBy(state.currentUser)) {
        return false;
      }
      if (state.currentUser.isRequestedBy(pr)) {
        return false;
      }
      return state.currentUser.latestReviewStatus(pr) === "APPROVED";
    });
  });

  return {
    currentUser: state.currentUser,
    ownPRs,
    requestedPRs,
    inReviewPRs,
    approvedPRs,
  };
}
