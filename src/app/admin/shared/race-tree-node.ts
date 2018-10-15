import {TreeNode} from "primeng/api";
import {Race} from "./race";

export class RaceTreeNode implements TreeNode {
  constructor(
    public data: Race,
    public parent: RaceTreeNode,
    public children?: RaceTreeNode[],
    public leaf?: boolean,
    public expanded?: boolean
  ) {}
}
