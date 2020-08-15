import { callAPI } from "./http";
import { User } from "./user";
import { Review } from "./review";
import { PR } from "./pr";

async function dispatch() {
  const apiResponse = await callAPI();

  const rawPullRequests = apiResponse.data.repository.pullRequests.edges;
  const rawViewer = apiResponse.data.viewer;

  const currentUser = new User(
    rawViewer.id,
    rawViewer.login,
    rawViewer.avatarUrl
  );

  const pullRequests = rawPullRequests.map((r: any) => {
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
    );
  });

  return {
    currentUser,
    pullRequests,
  };
}

export { dispatch };
