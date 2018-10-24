import {Attribute} from "./attribute";

export class Complexion extends Attribute {
  constructor(
    public id: number,
    public name: string
  ) {
    super(id, name);
  }
}
