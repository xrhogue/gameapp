import {Weight} from "./weight";

export class RaceWeight extends Weight {
  constructor(
    public genderId: number,
    public min: number,
    public max: number
  ) {
    super(min, max);
  }
}
