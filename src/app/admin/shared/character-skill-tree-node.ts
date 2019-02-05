import {TreeNode} from "primeng/api";
import {CharacterSkill} from "admin/shared/character-skill";

export class CharacterSkillTreeNode implements TreeNode {
  constructor(
    public data: CharacterSkill,
    public parent: CharacterSkillTreeNode,
    public children?: CharacterSkillTreeNode[],
    public expandedIcon?: string,
    public collapsedIcon?: string,
    public leaf?: boolean,
    public expanded?: boolean,
    public selectable?: boolean
  ) {}
}
