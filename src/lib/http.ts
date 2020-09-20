import axios from 'axios'

const accessToken = process.env.VUE_APP_GITHUB_ACCESS_TOKEN // いずれ画面から設定できるように

function callGithubAPI(query: String) {
  return axios({
    url: 'https://api.github.com/graphql',
    headers: {
      Authorization: `bearer ${accessToken}`,
      Accept: 'application/vnd.github.v4.idl'
    },
    method: 'POST',
    data: {
      query
    }
  }).then(res => res.data)
}

function callSelectableRepositories() {
  return callGithubAPI(`
  {
    viewer {
      id
      login
      avatarUrl
      repositoriesContributedTo(first: 99) {
        nodes {
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

function callPullRequests() {
  const organization = 'StudistCorporation'
  const repoName = 'teachme_web_duvel'
  return callGithubAPI(`
  {
    viewer {
      id
      login
      avatarUrl
    }
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
          }
        }
      }
    }
  }
  `)
}

export { callSelectableRepositories, callPullRequests }
