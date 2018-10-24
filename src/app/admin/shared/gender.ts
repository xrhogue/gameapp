import {Attribute} from "./attribute";

export class Gender extends Attribute {
  constructor(
    public id: number,
    public name: string
  ) {
    super(id, name);
  }
}
