import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

/**
 * Firebaseを初期化
 * 本ツールでは、GitHubによるOAuth認証及びAPIトークンの永続化にFirebaseを用いる
 */
firebase.initializeApp({
  apiKey: 'AIzaSyDOycQ_8kEQFgO1VMQ5XFx1EOcE91zgaBg',
  authDomain: 'pullkan.firebaseapp.com',
  databaseURL: 'https://pullkan.firebaseio.com',
  projectId: 'pullkan',
  storageBucket: 'pullkan.appspot.com',
  messagingSenderId: '686984609709',
  appId: '1:686984609709:web:d4508cf78b8941a322eb24'
})

/**
 * トークンを管理しているコレクションへの参照
 */
const USERS_REF = firebase.firestore().collection('users')

/**
 * ログイン中ユーザのAPIトークンを取得する
 */
export async function loadGitHubToken(): Promise<string | null> {
  const user = firebase.auth().currentUser
  if (!user) return Promise.reject()

  return USERS_REF.doc(user.uid)
    .get()
    .then(doc => doc.data()?.token)
}

/**
 * ユーザー情報を破棄する
 * トークンが無効化した場合などに使用し、整合性を担保する
 */
export async function deleteUser(): Promise<void> {
  const user = firebase.auth().currentUser
  if (!user) return Promise.reject()

  await USERS_REF.doc(user.uid).delete()
  await firebase.auth().signOut()

  return Promise.resolve()
}

/**
 * Firebase での認証を試みる
 */
export async function tryAuth() {
  return new Promise<void>((resolve, reject) => {
    firebase.auth().onAuthStateChanged(async user => {
      user ? resolve() : reject()
    })
  })
}

/**
 * GitHub での新規認証をポップアップで要求する
 */
export async function signInWithGitHub() {
  const provider = new firebase.auth.GithubAuthProvider()
  provider.addScope('repo, user, read:org')
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then(result => {
      const credential = result.credential as any
      const token = credential?.accessToken
      const uid = result.user?.uid
      if (uid && token) {
        return USERS_REF.doc(uid).set({ token })
      } else {
        return Promise.reject()
      }
    })
}
