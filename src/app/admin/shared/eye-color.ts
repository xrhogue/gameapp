import {Attribute} from "./attribute";

export class EyeColor extends Attribute {
  constructor(
    public id: number,
    public name: string
  ) {
    super(id, name);
  }
}
