import {Attribute} from "./attribute";

export class HairColor extends Attribute {
  constructor(
    public id: number,
    public name: string
  ) {
    super(id, name);
  }
}
