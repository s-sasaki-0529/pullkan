import response from "./response_mock";

class User {
  constructor({ id, name, avatarUrl }) {
    this.id = id;
    this.name = name;
    this.avatarUrl = avatarUrl;
  }
}

class Review {
  constructor({user, state}) {
    this.user = user
    this.state = state
  }
}

class PR {
  constructor({ id, title, url, assignees, requestedReviewers, reviewers }) {
    this.id = id;
    this.assignees = assignees;
    this.title = title;
    this.url = url;
    this.requestedReviewers = requestedReviewers;
    this.reviewers = reviewers;
  }
}

const pull_requests = response.data.repository.pullRequests.edges.map((r) => {
  const node = r.node;
  return new PR({
    id: node.id,
    title: node.title,
    url: node.url,
    assignees: node.assignees.edges.map((e) => {
      return new User({
        id: e.node.id,
        name: e.node.login,
        avatarUrl: e.node.avatarUrl,
      });
    }),
    requestedReviewers: node.reviewRequests.edges.map((e) => {
      const reviewer = e.node.requestedReviewer
      return new User({
        id: reviewer.id,
        name: reviewer.login,
        avatarUrl: reviewer.avatarUrl
      });
    }),
    reviewers: node.reviews.edges.map((e) => {
      return new Review({
        user: new User({
          id: e.node.author.id,
          name: e.node.author.login,
          avatarUrl: e.node.author.avatarUrl
        }),
        state: e.node.state
      });
    })
  });
});

console.log(pull_requests);
