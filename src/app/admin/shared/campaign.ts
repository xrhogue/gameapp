import {IdNameValue} from "admin/shared/id-name-value";

export class Campaign extends IdNameValue {
  constructor(
    public id: number,
    public userId: number,
    public name: string
  ) {super(id, name);}
}
