import {CharacterStat} from "admin/shared/character-stat";
import {CharacterRace} from "admin/shared/character-race";
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

    return character;
  }
}
