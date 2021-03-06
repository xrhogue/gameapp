import {TreeNode} from "primeng/api";
import {Skill} from "./skill";

export class SkillTreeNode implements TreeNode {
  constructor(
    public data: Skill,
    public parent: SkillTreeNode,
    public children?: SkillTreeNode[],
    public leaf?: boolean,
    public expanded?: boolean
  ) {}
}
