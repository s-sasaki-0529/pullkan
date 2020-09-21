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
  }
}
