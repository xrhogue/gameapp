import {RaceAttribute} from "./race-attribute";

export class EyeColor extends RaceAttribute {
  constructor(
    public id: number,
    public name: string
  ) {
    super(id, name);
  }
}