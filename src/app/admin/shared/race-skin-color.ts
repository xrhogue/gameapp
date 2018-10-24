import {RaceAttribute} from "./race-attribute";

export class RaceSkinColor extends RaceAttribute {
  constructor(
    public skinColorId: number,
    public genderId: number
  ) {
    super(skinColorId, genderId);
  }
}
