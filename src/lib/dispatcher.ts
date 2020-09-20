/**
 * httpモジュール経由でGithubAPIを叩き、型が不定なレスポンスから型付けされたクラスに変換するモジュール
 */
import { callCurrentUser, callPullRequests } from '@/lib/http'
import { User } from '@/models/user'
import { Review } from '@/models/review'
import { ReviewList } from '@/models/reviewList'
import { PR } from '@/models/pr'
import { Label } from '@/models/label'

async function dispatchCallCurrentUser(): Promise<User> {
  const apiResponse = await callCurrentUser()
  const rawCurrentUser = apiResponse.data.viewer
  //const rawRepositories = rawCurrentUser.repositoriesContributedTo.nodes
  return new User(rawCurrentUser.id, rawCurrentUser.login, rawCurrentUser.avatarUrl)
}

async function dispatchCallPullRequests(): Promise<PR[]> {
  const apiResponse = await callPullRequests()
  const rawPullRequests = apiResponse.data.repository.pullRequests.edges

  return rawPullRequests.map((r: any) => {
    const node = r.node
    return new PR(
      node.id,
      node.title,
      node.url,
      new User(node.author.id || 'no-user', node.author.login || 'no-user', node.author.avatarUrl || ''),
      new Date(node.commits.nodes[0].commit.committedDate),
      node.labels.nodes.map((l: any) => {
        return new Label(l.name, l.color)
      }),
      node.reviewRequests.edges.map((e: any) => {
        const reviewer = e.node.requestedReviewer
        return new User(reviewer.id, reviewer.login, reviewer.avatarUrl)
      }),
      new ReviewList(
        node.reviews.edges.map((e: any) => {
          return new Review(
            new User(e.node.author.id, e.node.author.login, e.node.author.avatarUrl),
            e.node.state,
            new Date(e.node.createdAt)
          )
        })
      )
    )
  })
}

async function dispatch() {
  const [currentUser, pullRequests] = await Promise.all([
    dispatchCallCurrentUser(),
    dispatchCallPullRequests()
  ])
  return { currentUser, pullRequests }
}

export { dispatch }
