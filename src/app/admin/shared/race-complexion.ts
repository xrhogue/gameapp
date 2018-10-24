import {RaceAttribute} from "./race-attribute";

export class RaceComplexion extends RaceAttribute {
  constructor(
    public complexionId: number,
    public genderId: number,
  ) {
    super(complexionId, genderId);
  }
}
