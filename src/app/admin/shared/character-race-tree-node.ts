import {TreeNode} from "primeng/api";
import {CharacterRace} from "admin/shared/character-race";

export class CharacterRaceTreeNode implements TreeNode {
  constructor(
    public data: CharacterRace,
    public parent: CharacterRaceTreeNode,
    public children?: CharacterRaceTreeNode[],
    public leaf?: boolean,
    public expanded?: boolean,
    public selectable?: boolean
  ) {}
}
