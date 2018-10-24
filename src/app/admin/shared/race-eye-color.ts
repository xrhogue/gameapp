import {RaceAttribute} from "./race-attribute";

export class RaceEyeColor extends RaceAttribute {
  constructor(
    public eyeColorId: number,
    public genderId: number
  ) {
    super(eyeColorId, genderId);
  }
}
