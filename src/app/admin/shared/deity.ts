export class Deity {
  constructor(
    public id: number,
    public campaignId: number,
    public parentId: number,
    public name: string,
    public description?: string,
    public image?: string
  ) {}
}
