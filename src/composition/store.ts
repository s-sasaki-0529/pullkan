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

  return {
    pullRequests: state.pullRequests,
    currentUser: state.currentUser,
  };
}
