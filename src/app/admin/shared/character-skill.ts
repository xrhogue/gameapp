export class CharacterSkill {
  constructor(
    public characterId: number,
    public skillId: number,
    public level: number = 1
  ) {}
}
