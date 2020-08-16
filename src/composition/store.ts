import { reactive, computed } from "vue";
import { PR } from "@/lib/pr";
import { User } from "@/lib/user";

type Props = {
  pullRequests: PR[];
  currentUser: User;
};

export function Store(_pullRequests: PR[], _currentUser: User) {
  // 整形されたAPIレスポンス
  const state = reactive({
    pullRequests: _pullRequests,
    currentUser: _currentUser
  });

  // 自身が作成したPRの一覧
  const ownPullRequests = computed(() => {
    return state.pullRequests.filter(pr => {
      return pr.author.id === state.currentUser.id;
    });
  });

  // 自身がアサインされたPRの一覧
  const assignedPullRequests = computed(() => {
    return state.pullRequests.filter(pr => {
      return pr.requestedReviewers.some(reviewer => {
        return reviewer.id === state.currentUser.id;
      });
    });
  });

  return {
    currentUser: state.currentUser,
    ownPullRequests,
    assignedPullRequests
  };
}
