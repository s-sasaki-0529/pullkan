import { reactive, computed } from "vue";
import { PR } from "@/lib/pr";
import { User } from "@/lib/user";

export function Store(pullRequests: PR[], currentUser: User) {
  const own = pullRequests.filter((pr) => {
    return pr.isOwnedBy(currentUser);
  });

  const requested = pullRequests.filter((pr) => {
    return currentUser.isRequestedBy(pr);
  });

  const inReview = pullRequests.filter((pr) => {
    if (pr.isOwnedBy(currentUser)) {
      return false;
    }
    if (currentUser.isRequestedBy(pr)) {
      return false;
    }

    const reviewStatus = currentUser.latestReviewStatus(pr);
    return reviewStatus && reviewStatus !== "APPROVED";
  });

  const approved = pullRequests.filter((pr) => {
    if (pr.isOwnedBy(currentUser)) {
      return false;
    }
    if (currentUser.isRequestedBy(pr)) {
      return false;
    }
    return currentUser.latestReviewStatus(pr) === "APPROVED";
  });

  return {
    currentUser: currentUser,
    pullRequests: {
      own,
      requested,
      inReview,
      approved,
    },
  };
}
