/**
 * httpモジュール経由でGithubAPIを叩き、型が不定なレスポンスから型付けされたクラスに変換するモジュール
 */
import { callCurrentUser, callPullRequests } from '@/lib/http'
import { User } from '@/models/user'
import { Review } from '@/models/review'
import { ReviewList } from '@/models/reviewList'
import { PR } from '@/models/pr'
import { Label } from '@/models/label'
import Repository from '@/models/repository'
import CurrentUser from '@/models/currentUser'
import { Setting } from '@/composition/setting'

async function dispatchCallCurrentUser() {
  const apiResponse = await callCurrentUser()
  const rawCurrentUser = apiResponse.data.viewer
  const rawRepositories = rawCurrentUser.repositoriesContributedTo.nodes

  return new CurrentUser(
    rawCurrentUser.id,
    rawCurrentUser.login,
    rawCurrentUser.avatarUrl,
    rawRepositories.map((r: any) => new Repository(r.id, r.owner.login, r.name))
  )
}

/**
 * PR一覧をAPI経由で取得し、レスポンスを解析してモデルに置き換える
 * モデルにはオーナー、レビューリクエストに限らず全てのPRが入るので注意
 */
async function dispatchCallPullRequests(repository: Repository): Promise<PR[]> {
  const apiResponse = await callPullRequests(repository.ownerId, repository.name)
  const rawPullRequests = apiResponse.data.repository.pullRequests.edges

  return rawPullRequests.map(r => {
    const node = r.node
    return new PR(
      node.id,
      node.title,
      node.url,
      repository,
      new User(node.author.id || 'no-user', node.author.login || 'no-user', node.author.avatarUrl || ''),
      new Date(node.commits.nodes[0].commit.committedDate),
      node.labels.nodes.map(l => {
        return new Label(l.name, l.color)
      }),
      node.reviewRequests.edges
        .map(e => {
          const reviewer = e.node.requestedReviewer
          return reviewer.members
            ? reviewer.members.nodes.map(member => new User(member.id, member.login, member.avatarUrl))
            : [new User(reviewer.id, reviewer.login || '', reviewer.avatarUrl || '')]
        })
        .flat(),
      new ReviewList(
        node.reviews.edges.map(e => {
          return new Review(
            new User(e.node.author.id || '', e.node.author.login || '', e.node.author.avatarUrl || ''),
            e.node.state,
            new Date(e.node.createdAt)
          )
        })
      ),
      node.isDraft
    )
  })
}

async function dispatch(setting: Setting) {
  // FIXME: currentUser は初回のみリクエストすれば充分なはず
  const currentUser = await dispatchCallCurrentUser()

  const pullRequestPromises = setting.repositories.map(r => dispatchCallPullRequests(r))
  const pullRequests = await Promise.all(pullRequestPromises).then(allPullRequests => allPullRequests.flat())
  return { currentUser, pullRequests }
}

export { dispatch }
