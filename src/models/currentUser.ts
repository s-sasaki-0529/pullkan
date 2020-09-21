import Repository from './repository'
import { User } from './user'

export default class CurrentUser extends User {
  constructor(
    public id: string,
    public name: string,
    public avatarUrl: string,
    public repositories: Repository[]
  ) {
    super(id, name, avatarUrl)
    this.repositories = this.repositories.sort((a, b) => (a.fullName < b.fullName ? -1 : 1))
  }

  static NullObject() {
    return new CurrentUser('', '', '', [])
  }
}
