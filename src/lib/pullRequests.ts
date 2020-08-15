// TODO: HTTP経由でGithubAPIをたたけるようにする
import response from "../response_mock";
import { User } from "./user";
import { Review } from "./review";
import { PR } from "./pr";

const raw_pull_requests = response.data.repository.pullRequests.edges;
const pullRequests = raw_pull_requests.map((r: any) => {
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

export { pullRequests };
