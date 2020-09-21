export default class Repository {
  constructor(public id: string, public ownerId: string, public name: string) {}

  get fullName() {
    return `${this.ownerId}/${this.name}`
  }

  get url() {
    return `${this.ownerUrl}/${this.name}`
  }

  get ownerUrl() {
    return `https://github.com/${this.ownerId}`
  }
}
