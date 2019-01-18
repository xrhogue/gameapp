import {CharacterStat} from "admin/shared/character-stat";
import {CharacterRace, MAX_PERCENT} from "admin/shared/character-race";
import {CharacterSkill} from "admin/shared/character-skill";

export class Character {
  constructor(
    public id: number,
    public name: string,
    public genderId: number,
    public stats?: Array<CharacterStat>,
    public races?: Array<CharacterRace>,
    public skills?: Array<CharacterSkill>
  ) {}

  static initialize(character: Character): Character {

    if (!character.stats) {
      character.stats = [];
    }

    if (!character.races) {
      character.races = [];
    }

    return character;
  }

  static getRemainingPercent(character: Character): number {
    if (character.races.length == 0) {
      return MAX_PERCENT;
    }

    return MAX_PERCENT - character.races.map(characterRace => characterRace.percent).reduce((totalPercent, percent) => totalPercent + percent);
  }
}
