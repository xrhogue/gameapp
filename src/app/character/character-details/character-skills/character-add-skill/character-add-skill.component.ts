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
      this.checkPrerequisites();
      this.updateSelectable(null);
      this.getCharacterTreeNodeLeaves(this.characterSkillTreeNodes).forEach(characterSkillTreeNode => this.updateSelectable(characterSkillTreeNode));
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

      // TODO: set selectable state based on currently selected skills and their prerequisites.

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

      this.skills.forEach(skill => this.updatePrerequisiteSkills(skill));
    }
    else {
      let prerequisiteSkill: PrerequisiteSkill = this.findPrerequisiteSkill(characterSkillTreeNodeLeaf.data.skillId);

      if (!!prerequisiteSkill && !!prerequisiteSkill.children) {
        characterSkillTreeNodeLeaf.selectable = this.getSelectedSkillIds().filter(skillId => prerequisiteSkill.children.map(child => child.id).includes(skillId)).length == prerequisiteSkill.children.length;
      }
    }
  }

  isCharacterSkill(skill: Skill): boolean {
    return this.character.skills.find(characterSkill => characterSkill.skillId == skill.id) != null;
  }

  characterSkillSelected(event: {node: CharacterSkillTreeNode}) {
    this.characterSkillChanged(event);
  }

  characterSkillUnselected(event: {node: CharacterSkillTreeNode}) {
    this.characterSkillChanged(event);
  }

  characterSkillChanged(event: {node: CharacterSkillTreeNode}) {
    this.checkPrerequisites();

    let prerequisiteSkillIds: Array<number> = this.getSkill(event.node.data).andPrerequisiteSkillIds;

    if (!!prerequisiteSkillIds) {
      if (prerequisiteSkillIds.filter(prerequisiteSkillId => this.findPrerequisiteSkill(prerequisiteSkillId)).length < prerequisiteSkillIds.length) {
        // TODO: remove from list... or better yet, do not allow it to be selected in the first place.
      }
    }
    this.selectedSkillNames = this.getSelectedCharacterSkills();
    this.selectedCharacterSkills = this.selectedCharacterSkillTreeNodes.map(characterSkillTreeNode => characterSkillTreeNode.data);
    this.selectedCharacterSkillsChange.emit(this.selectedCharacterSkills);
  }

  checkPrerequisites() {
    this.prerequisiteSkills = [];

    if (!!this.selectedCharacterSkillTreeNodes) {
      this.selectedCharacterSkillTreeNodes.forEach(selectedCharacterSkillTreeNode => this.updatePrerequisiteSkills(this.getSkill(selectedCharacterSkillTreeNode.data)));
      this.getFlattenedPrerequisiteSkills().forEach(prerequisiteSkill => {
        if (this.selectedCharacterSkillTreeNodes.find(selectedCharacterSkillTreeNode => selectedCharacterSkillTreeNode.data.skillId == prerequisiteSkill.id) == null) {
          while (prerequisiteSkill != null) {
            this.utilService.deleteObjectFromArray(this.selectedCharacterSkillTreeNodes, prerequisiteSkill.id, this.comparator);
            prerequisiteSkill = prerequisiteSkill.parent;
          }
        }
      });
    }
  }

  updatePrerequisiteSkills(skill: Skill) {
    let prerequisiteSkill: PrerequisiteSkill = this.findPrerequisiteSkill(skill.id);

    if (prerequisiteSkill != null) {
      skill.andPrerequisiteSkillIds.forEach(childPrerequisiteSkillId => prerequisiteSkill.children.push(new PrerequisiteSkill(childPrerequisiteSkillId, prerequisiteSkill, [])));
    }
    else {
      // TODO: need to remap all children with a null parent id to any new skill added
      prerequisiteSkill = new PrerequisiteSkill(skill.id, null, []);

      if (!!skill.andPrerequisiteSkillIds) {
        prerequisiteSkill.children = skill.andPrerequisiteSkillIds.map(childPrerequisiteSkillId => new PrerequisiteSkill(childPrerequisiteSkillId, prerequisiteSkill, []));
      }

      this.prerequisiteSkills.push(prerequisiteSkill);
    }
  }

  findPrerequisiteSkill(prerequisiteSkillId: number) : PrerequisiteSkill {
    return this.flattenPrerequisiteSkills(this.prerequisiteSkills).find(prerequisiteSkill => prerequisiteSkill.id == prerequisiteSkillId);
  }

  getFlattenedPrerequisiteSkills(): Array<PrerequisiteSkill> {
    return this.flattenPrerequisiteSkills(this.prerequisiteSkills);
  }

  flattenPrerequisiteSkills(prerequisiteSkills: Array<PrerequisiteSkill>): Array<PrerequisiteSkill> {
    let flattenedPrerequisiteSkills: Array<PrerequisiteSkill> = [];

    prerequisiteSkills.map(prerequisiteSkill => {flattenedPrerequisiteSkills.push(prerequisiteSkill);flattenedPrerequisiteSkills.concat(this.flattenPrerequisiteSkills(prerequisiteSkill.children))});

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

  getCharacterTreeNodeLeaves(characterSkillTreeNodes: Array<CharacterSkillTreeNode>): Array<CharacterSkillTreeNode> {
    let characterSkillTreeNodeLeaves: Array<CharacterSkillTreeNode> = [];

    characterSkillTreeNodes.map(characterSkillTreeNode => characterSkillTreeNode.leaf ? characterSkillTreeNodeLeaves.push(characterSkillTreeNode) : characterSkillTreeNodeLeaves.concat(this.getCharacterTreeNodeLeaves(characterSkillTreeNode.children)));

    return characterSkillTreeNodeLeaves;
  }

  comparator(characterSkillTreeNode: CharacterSkillTreeNode, skillId: number): boolean {
    return characterSkillTreeNode.data.skillId === skillId;
  }
}
