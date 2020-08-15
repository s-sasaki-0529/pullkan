import { reactive, computed } from "vue";
import { PR } from "@/lib/pr";
import { User } from "@/lib/user";

type Props = {
  pullRequests: PR[];
  currentUser: User;
};

export function Store(_pullRequests: PR[], _currentUser: User) {
  const state = reactive({
    pullRequests: _pullRequests,
    currentUser: _currentUser,
  });

  const ownPullRequests = computed(() => {
    return state.pullRequests.filter((pr) => {
      return pr.author.id === state.currentUser.id;
    });
  });

  return {
    ownPullRequests,
  };
}
