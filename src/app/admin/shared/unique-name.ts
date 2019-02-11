import {IdNameValue} from "admin/shared/id-name-value";

export class UniqueName {
  constructor(
    public idNameValues: Array<IdNameValue>,
    public name: string
  ) {}
}
