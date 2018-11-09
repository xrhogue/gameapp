import {Height} from "./height";

export class RaceHeight extends Height {
  constructor(
    public genderId: number,
    public min: number,
    public max: number
  ) {
    super(min, max);
  }
}
