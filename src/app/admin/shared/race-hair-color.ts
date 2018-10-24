import {RaceAttribute} from "./race-attribute";

export class RaceHairColor extends RaceAttribute {
  constructor(
    public hairColorId: number,
    public genderId: number
  ) {
    super(hairColorId, genderId);
  }
}
