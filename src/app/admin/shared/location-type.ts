import {IdNameValue} from "admin/shared/id-name-value";

export class LocationType extends IdNameValue {
  constructor(
    public id: number,
    public name: string,
    public image?: string
  ) {super(id, name);}
}
