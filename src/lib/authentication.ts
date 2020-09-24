import * as firebase from 'firebase/app'
import 'firebase/auth'

/**
 * TODO: 全面的に認証を整理する
 * - ユーザインタラクションに基づいてサインイン、サインアウトする
 * - GitHub API token の扱いをちゃんとする
 */

function initFirebase() {
  firebase.initializeApp({
    apiKey: 'AIzaSyDOycQ_8kEQFgO1VMQ5XFx1EOcE91zgaBg',
    authDomain: 'pullkan.firebaseapp.com',
    databaseURL: 'https://pullkan.firebaseio.com',
    projectId: 'pullkan',
    storageBucket: 'pullkan.appspot.com',
    messagingSenderId: '686984609709',
    appId: '1:686984609709:web:d4508cf78b8941a322eb24'
  })
}

function getCurrentUserToken() {
  const token = firebase.auth().currentUser?.displayName
  if (token) {
    return token
  } else {
    // TODO: 自動更新
    alert('トークンの期限切れてる')
    return ''
  }
}

function authByGitHub() {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        resolve()
      } else {
        const provider = new firebase.auth.GithubAuthProvider()
        provider.addScope('repo, user')
        return firebase.auth().signInWithPopup(provider)
      }
    })
  })
}

initFirebase()
export { authByGitHub, getCurrentUserToken }
