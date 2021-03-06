import {IdNameValue} from "admin/shared/id-name-value";

export class Location extends IdNameValue {
  constructor(
    public id: number,
    public campaignId: number,
    public parentId: number,
    public typeId: number,
    public name: string,
    public description?: string,
    public image?: string
  ) {super(id, name);}
}
