import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Character} from "admin/shared/character";
import {UtilService} from "../../../../shared/services/util/util.service";
import {CharacterSkill} from "admin/shared/character-skill";
import {Skill} from "admin/shared/skill";
import {SkillService} from "../../../../service/skill/skill.service";
import {CharacterSkillTreeNode} from "admin/shared/character-skill-tree-node";
import {PrerequisiteSkill} from "admin/shared/prerequisite-skill";

@Component({
  selector: 'app-character-add-skill',
  templateUrl: './character-add-skill.component.html',
  styleUrls: ['./character-add-skill.component.scss']
})
export class CharacterAddSkillComponent implements OnInit {
  @Input() character: Character;
  @Output() characterChange: EventEmitter<Character> = new EventEmitter<Character>();
  @Input() selectedCharacterSkills: Array<CharacterSkill>;
  @Output() selectedCharacterSkillsChange: EventEmitter<Array<CharacterSkill>> = new EventEmitter<Array<CharacterSkill>>();
  skills: Array<Skill>;
  characterSkillTreeNodes: Array<CharacterSkillTreeNode> = [];
  selectedCharacterSkillTreeNodes: Array<CharacterSkillTreeNode> = [];
  selectedSkillNames: string = '';
  prerequisiteSkills: Array<PrerequisiteSkill> = [];

  constructor(private skillService: SkillService, protected utilService: UtilService) { }

  ngOnInit() {
    this.skillService.getSkills().subscribe(skills => {
      this.skills = skills;
      this.characterSkillTreeNodes = this.buildCharacterSkillTreeNodes(null);
      // this.checkPrerequisites();
      // this.updateSelectable(null);
      // this.getCharacterSkillTreeNodeLeaves(this.characterSkillTreeNodes).forEach(characterSkillTreeNode => this.updateSelectable(characterSkillTreeNode));
    });
  }

  buildCharacterSkillTreeNodes(parentId: number) {
    let characterSkillTreeNodes: Array<CharacterSkillTreeNode> = this.skills
                                                                     .filter(skill => skill.parentId === parentId && !this.isCharacterSkill(skill))
                                                                     .map(skill => new CharacterSkillTreeNode(new CharacterSkill(this.character.id, skill.id, 1),
                                                                                                              null,
                                                                                                              null,
                                                                                                              null,
                                                                                                              null,
                                                                                                              true,
                                                                                                              false,
                                                                                                              false));

    characterSkillTreeNodes.forEach(characterSkillTreeNode => {
      characterSkillTreeNode.children = this.buildCharacterSkillTreeNodes(characterSkillTreeNode.data.skillId);

      characterSkillTreeNode.leaf = (characterSkillTreeNode.children == undefined || characterSkillTreeNode.children == null || characterSkillTreeNode.children.length == 0);
      characterSkillTreeNode.selectable = characterSkillTreeNode.leaf;

      if (characterSkillTreeNode.selectable &&
        this.character.skills.find(characterSkill => characterSkill.skillId === characterSkillTreeNode.data.skillId) != null &&
        this.selectedCharacterSkillTreeNodes.find(selectedCharacterSkillTreeNode => selectedCharacterSkillTreeNode.data.skillId === characterSkillTreeNode.data.skillId) == null) {
        this.selectedCharacterSkillTreeNodes.push(characterSkillTreeNode);
      }
    });

    return characterSkillTreeNodes;
  }

  updateSelectable(characterSkillTreeNodeLeaf: CharacterSkillTreeNode) {
    if (!characterSkillTreeNodeLeaf) {
      this.prerequisiteSkills = [];

      this.skills.forEach(skill => this.updatePrerequisiteSkills(this.getPrerequisiteSkills(), skill));
    }
    else {
      let prerequisiteSkill: PrerequisiteSkill = this.findPrerequisiteSkill(this.getPrerequisiteSkills(), characterSkillTreeNodeLeaf.data.skillId);

      if (!!prerequisiteSkill && !!prerequisiteSkill.children) {
        characterSkillTreeNodeLeaf.selectable = this.getSelectedSkillIds().filter(skillId => prerequisiteSkill.children.map(child => child.id).includes(skillId)).length == prerequisiteSkill.children.length;
      }
    }
  }

  isCharacterSkill(skill: Skill): boolean {
    return this.character.skills.find(characterSkill => characterSkill.skillId == skill.id) != null;
  }

  characterSkillSelected(event: {node: CharacterSkillTreeNode}) {
    this.characterSkillChanged(event, true);
  }

  characterSkillUnselected(event: {node: CharacterSkillTreeNode}) {
    this.characterSkillChanged(event, false);
  }

  characterSkillChanged(event: {node: CharacterSkillTreeNode}, selected: boolean) {
    if (selected) {
      // TODO: sometimes prerequisite skills may be unselectable parents; in that case, we may need to select the first available descendant leaf.
      this.updateSelectedPrerequisiteSkills(this.getSkill(event.node.data));
    }
    else {
      // TODO: un-select nodes if this is a prerequisite skill and there are nodes that require it.
      this.removeSelectedDependentSkills(this.getSkill(event.node.data));
    }

    this.selectedSkillNames = this.getSelectedCharacterSkills();
    this.selectedCharacterSkills = this.selectedCharacterSkillTreeNodes.map(characterSkillTreeNode => characterSkillTreeNode.data);
    this.selectedCharacterSkillsChange.emit(this.selectedCharacterSkills);
  }

  updateSelectedPrerequisiteSkills(skill: Skill) {
    let prerequisiteSkillIds: Array<number> = skill.andPrerequisiteSkillIds;

    if (!!prerequisiteSkillIds) {
      prerequisiteSkillIds.forEach(prerequisiteSkillId => {this.updateSelectedCharacterSkillTreeNodes(prerequisiteSkillId); this.updateSelectedPrerequisiteSkills(this.getPrerequisiteSkill(prerequisiteSkillId))});
    }
  }

  updateSelectedCharacterSkillTreeNodes(skillId: number) {
    if (this.selectedCharacterSkillTreeNodes.find(characterSkillTreeNode => characterSkillTreeNode.data.skillId == skillId) == null) {
      let characterSkillTreeNode: CharacterSkillTreeNode = this.getCharacterSkillTreeNode(skillId);

      if (!!characterSkillTreeNode) {
        this.selectedCharacterSkillTreeNodes.push(characterSkillTreeNode);
      }
    }
  }

  removeSelectedDependentSkills(skill: Skill) {
    let prerequisiteSkill: PrerequisiteSkill = this.findPrerequisiteSkill(this.getPrerequisiteSkills(), skill.id);

    if (!!prerequisiteSkill) {
      while (!!prerequisiteSkill.parent) {
        this.unSelectCharacterSkillTreeNode(prerequisiteSkill.parent.id);
        prerequisiteSkill = prerequisiteSkill.parent;
      }
    }
  }

  unSelectCharacterSkillTreeNode(skillId: number) {
    this.utilService.deleteObjectFromArray(this.selectedCharacterSkillTreeNodes, skillId, this.comparator);
  }

  checkPrerequisites() {
    this.prerequisiteSkills = [];

    if (!!this.selectedCharacterSkillTreeNodes) {
      this.selectedCharacterSkillTreeNodes.forEach(selectedCharacterSkillTreeNode => this.updatePrerequisiteSkills(this.prerequisiteSkills, this.getSkill(selectedCharacterSkillTreeNode.data)));
      this.getFlattenedPrerequisiteSkills(this.prerequisiteSkills).forEach(prerequisiteSkill => {
        if (this.selectedCharacterSkillTreeNodes.find(selectedCharacterSkillTreeNode => selectedCharacterSkillTreeNode.data.skillId == prerequisiteSkill.id) == null) {
          while (prerequisiteSkill != null) {
            this.utilService.deleteObjectFromArray(this.selectedCharacterSkillTreeNodes, prerequisiteSkill.id, this.comparator);
            prerequisiteSkill = prerequisiteSkill.parent;
          }
        }
      });
    }
  }

  getPrerequisiteSkills(): Array<PrerequisiteSkill> {
    let prerequisiteSkills: Array<PrerequisiteSkill> = [];

    if (!!this.selectedCharacterSkillTreeNodes) {
      this.selectedCharacterSkillTreeNodes.forEach(selectedCharacterSkillTreeNode => this.updatePrerequisiteSkills(prerequisiteSkills, this.getSkill(selectedCharacterSkillTreeNode.data)));
    }

    return prerequisiteSkills;
  }

  updatePrerequisiteSkills(prerequisiteSkills: Array<PrerequisiteSkill>, skill: Skill) {
    let prerequisiteSkill: PrerequisiteSkill = this.findPrerequisiteSkill(prerequisiteSkills, skill.id);

    if (prerequisiteSkill != null) {
      skill.andPrerequisiteSkillIds.forEach(childPrerequisiteSkillId => prerequisiteSkill.children.push(new PrerequisiteSkill(childPrerequisiteSkillId, prerequisiteSkill, [])));
    }
    else {
      // TODO: need to remap all children with a null parent id to any new skill added
      prerequisiteSkill = new PrerequisiteSkill(skill.id, null, []);

      if (!!skill.andPrerequisiteSkillIds) {
        prerequisiteSkill.children = skill.andPrerequisiteSkillIds.map(childPrerequisiteSkillId => new PrerequisiteSkill(childPrerequisiteSkillId, prerequisiteSkill, []));
      }

      prerequisiteSkills.push(prerequisiteSkill);
    }
  }

  findPrerequisiteSkill(prerequisiteSkills: Array<PrerequisiteSkill>, prerequisiteSkillId: number) : PrerequisiteSkill {
    return this.getFlattenedPrerequisiteSkills(prerequisiteSkills).find(prerequisiteSkill => prerequisiteSkill.id == prerequisiteSkillId);
  }

  getFlattenedPrerequisiteSkills(prerequisiteSkills: Array<PrerequisiteSkill>): Array<PrerequisiteSkill> {
    let flattenedPrerequisiteSkills: Array<PrerequisiteSkill> = [];

    if (!!prerequisiteSkills && prerequisiteSkills.length > 0) {

      // TODO: we need to verify that the prerequisite skill is not already part of the flattened list
      prerequisiteSkills.map(prerequisiteSkill => {
        flattenedPrerequisiteSkills.push(prerequisiteSkill);
        flattenedPrerequisiteSkills = flattenedPrerequisiteSkills.concat(this.getFlattenedPrerequisiteSkills(prerequisiteSkill.children));
      });
    }

    return flattenedPrerequisiteSkills;
  }

  getSelectedSkillIds(): Array<number> {
    return this.selectedCharacterSkillTreeNodes.map(selectedCharacterTreeNode => selectedCharacterTreeNode.data.skillId);
  }

  getSkill(characterSkill: CharacterSkill): Skill {
    if (characterSkill.skillId === 0) {
      return new Skill(0,"","",0,0,false,0,0,[]);
    }

    return this.skills.find(skill => skill.id === characterSkill.skillId);
  }

  getPrerequisiteSkill(prerequisiteSkillId: number): Skill {
    return this.skills.find(skill => skill.id === prerequisiteSkillId);
  }

  getSelectedCharacterSkills(): string {
    if (!this.selectedCharacterSkillTreeNodes || this.selectedCharacterSkillTreeNodes.length == 0) {
      return '';
    }

    return this.selectedCharacterSkillTreeNodes
               .map(selectedCharacterSkillTreeNode => this.getSkill(selectedCharacterSkillTreeNode.data).shortName)
               .reduce((selectedSkillNames, name): string => selectedSkillNames + '\n' + name);
  }

  getCharacterSkillTreeNode(skillId: number): CharacterSkillTreeNode {
    return this.getCharacterSkillTreeNodeLeaves(this.characterSkillTreeNodes).find(characterSkillTreeNode => characterSkillTreeNode.data.skillId == skillId);
  }

  getCharacterSkillTreeNodeLeaves(characterSkillTreeNodes: Array<CharacterSkillTreeNode>): Array<CharacterSkillTreeNode> {
    let characterSkillTreeNodeLeaves: Array<CharacterSkillTreeNode> = [];

    characterSkillTreeNodes.map(characterSkillTreeNode => characterSkillTreeNode.leaf ? characterSkillTreeNodeLeaves.push(characterSkillTreeNode) : characterSkillTreeNodeLeaves.concat(this.getCharacterSkillTreeNodeLeaves(characterSkillTreeNode.children)));

    return characterSkillTreeNodeLeaves;
  }

  comparator(characterSkillTreeNode: CharacterSkillTreeNode, skillId: number): boolean {
    return characterSkillTreeNode.data.skillId === skillId;
  }
}
