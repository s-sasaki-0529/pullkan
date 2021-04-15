/**
 * GithubAPIを直接叩くモジュール
 */
import axios from 'axios'
import { loadGitHubToken, deleteUser } from '@/lib/authentication'
import { REVIEW_STATUS } from './types'

// FIXME: 手動で管理するものじゃない気がする
// https://github.com/octokit/graphql-schema
type CurrentUserResponseType = {
  data: {
    viewer: {
      id: string
      login: string
      avatarUrl: string
      repositoriesContributedTo: {
        nodes: {
          id: string
          name: string
          owner: {
            id: string
            login: string
          }
        }[]
      }
    }
  }
}

// FIXME: 手動で管理するものじゃない気がする
// https://github.com/octokit/graphql-schema
type PullRequestsResponseType = {
  data: {
    repository: {
      pullRequests: {
        edges: {
          node: {
            id: string
            title: string
            url: string
            author: {
              id: string
              avatarUrl: string
              login: string
            }
            reviewRequests: {
              edges: {
                node: {
                  requestedReviewer: {
                    id: string
                    name?: string
                    avatarUrl?: string
                    login?: string
                    members?: {
                      nodes: {
                        id: string
                        login: string
                        name?: string
                        avatarUrl: string
                      }[]
                    }
                  }
                }
              }[]
            }
            reviews: {
              edges: {
                node: {
                  state: REVIEW_STATUS
                  id: string
                  createdAt: string
                  author: {
                    id?: string
                    avatarUrl?: string
                    login?: string
                  }
                }
              }[]
            }
            commits: {
              nodes: {
                commit: {
                  committedDate: string
                }
              }[]
            }
            labels: {
              nodes: {
                name: string
                color: string
              }[]
            }
            isDraft: Boolean
          }
        }[]
      }
    }
  }
}

async function callGithubAPI(query: String) {
  const token = await loadGitHubToken()
  return axios({
    url: 'https://api.github.com/graphql',
    headers: {
      Authorization: `bearer ${token}`,
      Accept: 'application/vnd.github.v4.idl'
    },
    method: 'POST',
    data: {
      query
    }
  })
    .then(res => res.data)
    .catch(async () => {
      await deleteUser()
      location.href = '/'
    })
}

function callCurrentUser(): Promise<CurrentUserResponseType> {
  return callGithubAPI(`
  {
    viewer {
      id
      login
      avatarUrl
      repositoriesContributedTo(first: 99) {
        nodes {
          id
          name
          owner {
            ... on Organization {
              id
              login
            }
            ... on User {
              id
              login
            }
          }
        }
      }
    }
  }
  `)
}

function callPullRequests(organization: string, repoName: string): Promise<PullRequestsResponseType> {
  return callGithubAPI(`
  {
    repository(owner: "${organization}", name: "${repoName}") {
      pullRequests(last: 100, states: [OPEN]) {
        edges {
          node {
            id
            title
            url
            author {
              ... on User {
                id
                avatarUrl
                login
              }
            }
            reviewRequests(first: 99) {
              edges {
                node {
                  requestedReviewer {
                    ... on User {
                      id
                      name
                      avatarUrl
                      login
                    }
                    ... on Team {
                      id
                      name
                      members {
                        nodes {
                          id
                          login
                          name
                          avatarUrl
                        }
                      }
                    }
                  }
                }
              }
            }
            reviews(first: 99) {
              edges {
                node {
                  state
                  id
                  createdAt
                  author {
                    ... on User {
                      id
                      avatarUrl
                      login
                    }
                  }
                }
              }
            }
            commits(last: 1) {
              nodes {
                commit {
                  committedDate
                }
              }
            }
            labels(first: 99) {
              nodes {
                name
                color
              }
            }
            isDraft
          }
        }
      }
    }
  }

  `)
}

export { callCurrentUser, callPullRequests }
