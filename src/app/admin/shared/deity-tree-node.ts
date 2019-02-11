import {TreeNode} from "primeng/api";
import {Deity} from "admin/shared/deity";

export class DeityTreeNode implements TreeNode {
  constructor(
    public data: Deity,
    public parent: DeityTreeNode,
    public children?: DeityTreeNode[],
    public leaf?: boolean,
    public expanded?: boolean
  ) {}
}
