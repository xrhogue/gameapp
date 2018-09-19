export class Skill {
  constructor(
    public id: number,
    public name: string,
    public shortName: string,
    public baseCost: number,
    public levelCost: number,
    public selectable: boolean,
    public parentId: number,
    public primaryStatId: number,
    public secondaryStatIds: Array<number>,
    public prerequisiteSkillIds?: Array<number>
  ) {}
}
