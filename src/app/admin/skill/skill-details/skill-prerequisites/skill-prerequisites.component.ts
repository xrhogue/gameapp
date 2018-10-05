import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {SkillService} from "../../../../service/skill/skill.service";
import {Skill} from "../../../shared/skill";
import {SkillTreeNode} from "../../../shared/skill-tree-node";

@Component({
  selector: 'app-skill-prerequisites',
  templateUrl: './skill-prerequisites.component.html',
  styleUrls: ['./skill-prerequisites.component.scss']
})
export class SkillPrerequisitesComponent implements OnInit {

  @Input() skill: Skill;
  @Output() skillChange: EventEmitter<Skill> = new EventEmitter<Skill>();
  skills: Array<Skill>;
  selectedAndPrerequisiteSkills: String;
  selectedOrPrerequisiteSkills: String;
  andPrerequisiteTreeNodes: Array<SkillTreeNode>;
  orPrerequisiteTreeNodes: Array<SkillTreeNode>;
  selectedAndPrerequisiteTreeNodes: Array<SkillTreeNode> = [];
  selectedOrPrerequisiteTreeNodes: Array<SkillTreeNode> = [];

  constructor(private skillService: SkillService, private router: Router) { }

  ngOnInit() {
    this.skills = this.skillService.getSkills();
    this.andPrerequisiteTreeNodes = this.buildSkillTreeNodes(null);
    this.orPrerequisiteTreeNodes = this.buildSkillTreeNodes(null);

    this.init(this.skill.andPrerequisiteSkillIds, this.andPrerequisiteTreeNodes, this.selectedAndPrerequisiteTreeNodes);
    this.init(this.skill.orPrerequisiteSkillIds, this.orPrerequisiteTreeNodes, this.selectedOrPrerequisiteTreeNodes);
    this.updateAllSelections();
  }

  buildSkillTreeNodes(parentId: number) {
    let skillTreeNodes: Array<SkillTreeNode> = this.skills.filter(skill => skill.parentId === parentId).map(skill => new SkillTreeNode(skill, null, null, true, false));

    skillTreeNodes.forEach(skillTreeNode => {
      skillTreeNode.children = this.buildSkillTreeNodes(skillTreeNode.data.id);

      skillTreeNode.leaf = (skillTreeNode.children == undefined || skillTreeNode.children == null || skillTreeNode.children.length == 0);
    });

    return skillTreeNodes;
  }

  andPrerequisiteSelected(event: {node: SkillTreeNode}) {
    this.nodeSelected(event.node, this.selectedAndPrerequisiteTreeNodes, this.selectedOrPrerequisiteTreeNodes);
  }

  orPrerequisiteSelected(event: {node: SkillTreeNode}) {
    this.nodeSelected(event.node, this.selectedOrPrerequisiteTreeNodes, this.selectedAndPrerequisiteTreeNodes);
  }

  nodeSelected(skillTreeNode: SkillTreeNode, selectedSkillTreeNodes: Array<SkillTreeNode>, otherSelectedSkillTreeNodes: Array<SkillTreeNode>) {
    // unselect the parent node (if any) if a child node is selected
    // TODO: unselect up the hierarchy
    this.unselectNode(skillTreeNode.parent, selectedSkillTreeNodes);

    // unselect all children nodes (if selected) if a parent node is selected
    skillTreeNode.children.forEach(child=>this.unselectNode(child, selectedSkillTreeNodes))

    // unselect the parent node in the other list (if any) if a child node is selected
    // TODO: unselect up the hierarchy
    if (!!skillTreeNode.parent) {
      this.unselectNodeById(skillTreeNode.parent.data.id, otherSelectedSkillTreeNodes);
    }

    let otherSelectedSkillTreeNode = otherSelectedSkillTreeNodes.find(otherSkillTreeNode=>otherSkillTreeNode.data.id === skillTreeNode.data.id);

    if (!!otherSelectedSkillTreeNode) {
      this.unselectNode(otherSelectedSkillTreeNode, otherSelectedSkillTreeNodes);
    }

    this.updateAllSelections()
  }

  nodeUnselected(event: {node: SkillTreeNode}) {
    this.updateAllSelections();
  }

  init(prerequisiteSkillIds: Array<number>, skillTreeNodes: Array<SkillTreeNode>, selectedSkillTreeNodes: Array<SkillTreeNode>) {
    if (!!prerequisiteSkillIds && !!skillTreeNodes) {
      prerequisiteSkillIds.forEach(prerequisiteSkillId => {
        let matchingSkillTreeNode = this.find(prerequisiteSkillId, skillTreeNodes);

        if (!!matchingSkillTreeNode) {
          selectedSkillTreeNodes.push(matchingSkillTreeNode);
        }
      })
    }
  }

  find(skillId: number, skillTreeNodes: Array<SkillTreeNode>): SkillTreeNode {
    let matchingSkillTreeNode = skillTreeNodes.find(skillTreeNode=>skillTreeNode.data.id === skillId);

    if (!!matchingSkillTreeNode) {
      return matchingSkillTreeNode;
    }

    for (let skillTreeNode of skillTreeNodes) {
      if (!!skillTreeNode.children && skillTreeNode.children.length > 0) {
        let matchingSkillTreeNode = this.find(skillId, skillTreeNode.children);

        if (!!matchingSkillTreeNode) {
          return matchingSkillTreeNode;
        }
      }
    }

    return undefined;
  }

  unselectNode(skillTreeNode: SkillTreeNode, selectedSkillTreeNodes: Array<SkillTreeNode>) {
    if (!skillTreeNode) {
      return;
    }

    this.unselectNodeById(skillTreeNode.data.id, selectedSkillTreeNodes);
  }

  unselectNodeById(skillId: number, selectedSkillTreeNodes: Array<SkillTreeNode>) {
    let index: number = selectedSkillTreeNodes.findIndex(selectedSkillTreeNode=>selectedSkillTreeNode.data.id == skillId);

    if (index > -1) {
      selectedSkillTreeNodes.splice(index, 1);
    }
  }

  updateAllSelections() {
    this.selectedAndPrerequisiteSkills = this.updateSelections(this.selectedAndPrerequisiteTreeNodes);
    this.selectedOrPrerequisiteSkills = this.updateSelections(this.selectedOrPrerequisiteTreeNodes);
    this.skill.andPrerequisiteSkillIds = this.selectedAndPrerequisiteTreeNodes.map(skillTreeNode=>skillTreeNode.data.id);
    this.skill.orPrerequisiteSkillIds = this.selectedOrPrerequisiteTreeNodes.map(skillTreeNode=>skillTreeNode.data.id);
  }

  updateSelections(selectedSkillTreeNodes: Array<SkillTreeNode>): String {
    let selectedSkills: string = "";

    if (!selectedSkillTreeNodes) {
      return selectedSkills;
    }

    selectedSkillTreeNodes.forEach(skillTreeNode=>selectedSkills += (selectedSkills.length > 0 ? '\n' : '') + skillTreeNode.data.shortName)

    return selectedSkills;
  }
}
