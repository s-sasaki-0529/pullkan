export default class Repository {
  constructor(public id: string, public ownerId: string, public name: string) {}

  getURL() {
    return `${this.getOwnerURL()}/${this.name}`
  }

  getOwnerURL() {
    return `https://github.com/${this.ownerId}`
  }
}
