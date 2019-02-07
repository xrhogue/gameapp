import {TreeNode} from "primeng/api";

export class DeityTreeNode implements TreeNode {
  constructor(
    public data: Race,
    public parent: DeityTreeNode,
    public children?: DeityTreeNode[],
    public leaf?: boolean,
    public expanded?: boolean
  ) {}
}
