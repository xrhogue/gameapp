import {Attribute} from "./attribute";

export class UniqueName {
  constructor(
    public attributes: Array<Attribute>,
    public name: string
  ) {}
}
