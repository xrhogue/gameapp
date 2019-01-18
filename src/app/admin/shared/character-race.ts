export const MAX_PERCENT: number = 100;

export class CharacterRace {
  constructor(
    public characterId: number,
    public raceId: number,
    public percent: number = MAX_PERCENT
  ) {}

  static initialize(characterId: number, raceId: number, percent: number): CharacterRace {
    return new CharacterRace(characterId, raceId, percent);
  }
}
