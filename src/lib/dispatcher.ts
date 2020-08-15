import { callAPI } from "./http";
import { User } from "./user";
import { Review } from "./review";
import { ReviewList } from "./reviewList";
import { PR } from "./pr";
import { Store } from "../composition/store";

async function dispatch() {
  const apiResponse = await callAPI();

  const rawPullRequests = apiResponse.data.repository.pullRequests.edges;
  const rawViewer = apiResponse.data.viewer;

  const currentUser = new User(
    rawViewer.id,
    rawViewer.login,
    rawViewer.avatarUrl
  );

  const pullRequests: PR[] = rawPullRequests.map((r: any) => {
    const node = r.node;
    return new PR(
      node.id,
      node.title,
      node.url,
      new User(
        node.author.id || "no-user",
        node.author.login || "no-user",
        node.author.avatarUrl || ""
      ),
      node.reviewRequests.edges.map((e: any) => {
        const reviewer = e.node.requestedReviewer;
        return new User(reviewer.id, reviewer.login, reviewer.avatarUrl);
      }),
      new ReviewList(
        node.reviews.edges.map((e: any) => {
          return new Review(
            new User(
              e.node.author.id,
              e.node.author.login,
              e.node.author.avatarUrl
            ),
            e.node.state
          );
        })
      )
    );
  });
  return Store(pullRequests, currentUser);
}

export { dispatch };
