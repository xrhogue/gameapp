import {TreeNode} from "primeng/api";
import {Location} from "./location";

export class LocationTreeNode implements TreeNode {
  constructor(
    public data: Location,
    public parent: LocationTreeNode,
    public children?: LocationTreeNode[],
    public label?: string,
    public leaf?: boolean,
    public expanded?: boolean
  ) {}
}
