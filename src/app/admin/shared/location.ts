import {IdNameValue} from "admin/shared/id-name-value";

export class Location extends IdNameValue {
  constructor(
    public id: number,
    public campaignId: number,
    public parentId: number,
    public name: string,
    public type: string,
    public description?: string,
    public image?: string
  ) {super(id, name);}
}
