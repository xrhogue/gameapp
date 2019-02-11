import {IdNameValue} from "admin/shared/id-name-value";

export class Attribute extends IdNameValue {
  constructor(
    public id: number,
    public name: string
  ) {super(id, name)}
}
