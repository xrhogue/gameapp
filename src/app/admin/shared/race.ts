import {Gender} from "./gender";
import {RaceGenderAttributes} from "./race-gender-attributes";

export class Race {
  constructor(
    public id: number,
    public name: string,
    public selectable: boolean,
    public parentId: number,
    public genders?: Array<Gender>,
    public attributes?: Array<RaceGenderAttributes>
  ) {}
}
