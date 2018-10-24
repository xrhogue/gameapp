import {Attribute} from "./attribute";

export class SkinColor extends Attribute {
  constructor(
    public id: number,
    public name: string
  ) {
    super(id, name);
  }
}
