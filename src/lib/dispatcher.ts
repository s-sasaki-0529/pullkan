import { callAPI } from '@/lib/http'
import { User } from '@/models/user'
import { Review } from '@/models/review'
import { ReviewList } from '@/models/reviewList'
import { PR } from '@/models/pr'
import { Label } from '@/models/label'

async function dispatch() {
  const apiResponse = await callAPI()

  const rawPullRequests = apiResponse.data.repository.pullRequests.edges
  const rawViewer = apiResponse.data.viewer

  const currentUser = new User(rawViewer.id, rawViewer.login, rawViewer.avatarUrl)

  const pullRequests: PR[] = rawPullRequests.map((r: any) => {
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
  return {
    currentUser,
    pullRequests
  }
}

export { dispatch }
