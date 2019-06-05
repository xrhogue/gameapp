import {CharacterStat} from "admin/shared/character-stat";
import {CharacterRace, MAX_PERCENT} from "admin/shared/character-race";
import {CharacterSkill} from "admin/shared/character-skill";

export class Character {
  constructor(
    public id: number,
    public name: string,
    public genderId: number,
    public campaignId: number,
    public locationId: number,
    public deityIds?: Array<number>,
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

    return MAX_PERCENT - character.races.map(characterRace => characterRace.percent).reduce((totalPercent, percent): number => totalPercent + percent);
  }

  static isInvalid(character: Character, section: String): boolean {
    let generalInvalid: boolean = !character.genderId || character.genderId < 1 || !character.locationId || character.locationId < 1 ||!character.name || character.name.length == 0;
    let statInvalid: boolean = false;
    let raceInvalid: boolean = !character.races || character.races.length == 0 || character.races.map(characterRace => characterRace.percent).reduce((totalPercent, percent) => totalPercent + percent) != 100;
    let skillInvalid: boolean = !character.skills || character.skills.length == 0 || character.skills.filter(characterSkill => characterSkill.level < 1).length > 0;

    if (!section) {
      return generalInvalid || statInvalid || raceInvalid || skillInvalid;
    }

    if (section === 'general') {
      return generalInvalid;
    }

    if (section === 'stats') {
      return statInvalid;
    }

    if (section === 'races') {
      return raceInvalid;
    }

    if (section === 'skills') {
      return skillInvalid;
    }
  }
}
