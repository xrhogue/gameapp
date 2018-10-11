import {RaceAttribute} from "./race-attribute";

export class UniqueName {
  constructor(
    public attributes: Array<RaceAttribute>,
    public name: string
  ) {}
}
