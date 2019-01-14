export class CharacterStat {
  constructor(
    public characterId: number,
    public statId: number,
    public value: number = 70,
    public low: number = 70,
    public high: number = 100,
    public max: number = 150
  ) {}
}
