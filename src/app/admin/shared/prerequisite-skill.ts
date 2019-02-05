export class PrerequisiteSkill {
  constructor(
    public id: number,
    public parent: PrerequisiteSkill,
    public children: Array<PrerequisiteSkill>
  ) {}
}
