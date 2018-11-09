import {Height} from "./height";
import {Weight} from "./weight";

export class RaceMeasurement {
  constructor(
    public genderId: number,
    public height: Height = new Height(),
    public weight: Weight = new Weight()
  ) {}
}
