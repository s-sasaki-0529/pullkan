// TODO: HTTP経由でGithubAPIをたたけるようにする
import response from "../response_mock";

type REVIEW_STATUS =
  | "APPROVED"
  | "CHANGES_REQUESTED"
  | "COMMENTED"
  | "DISMISSED"
  | "PENDING";

class User {
  constructor(
    public id: string,
    public name: string,
    public avatarUrl: string
  ) {}
}

class Review {
  constructor(public user: User, public state: REVIEW_STATUS) {}
}

export class PR {
  constructor(
    public id: string,
    public title: string,
    public url: string,
    public author: User,
    public requestedReviewers: User[],
    public reviews: Review[]
  ) {}
}

export const pull_requests = response.data.repository.pullRequests.edges.map(
  (r: any) => {
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
  }
);
