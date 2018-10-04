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
  selectedAndPrerequisiteTreeNodes: Array<SkillTreeNode>;
  selectedOrPrerequisiteTreeNodes: Array<SkillTreeNode>;

  constructor(private skillService: SkillService, private router: Router) { }

  ngOnInit() {
    this.skills = this.skillService.getSkills();
    this.andPrerequisiteTreeNodes = this.buildSkillTreeNodes(null);
    this.orPrerequisiteTreeNodes = this.buildSkillTreeNodes(null);
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
    this.nodeSelected(event.node, this.selectedAndPrerequisiteTreeNodes);
  }

  orPrerequisiteSelected(event: {node: SkillTreeNode}) {
    this.nodeSelected(event.node, this.selectedOrPrerequisiteTreeNodes);
  }

  nodeSelected(skillTreeNode: SkillTreeNode, selectedSkillTreeNodes: Array<SkillTreeNode>) {
    // unselect the parent node (if any) if a child node is selected
    this.unselectNode(skillTreeNode.parent, selectedSkillTreeNodes);

    // unselect all children nodes (if selected) if a parent node is selected
    skillTreeNode.children.forEach(child=>this.unselectNode(child, selectedSkillTreeNodes))

    this.updateAllSelections()
  }

  nodeUnselected(event: {node: SkillTreeNode}) {
    this.updateAllSelections();
  }

  unselectNode(skillTreeNode: SkillTreeNode, selectedSkillTreeNodes: Array<SkillTreeNode>)
  {
    if (skillTreeNode === undefined) {
      return;
    }

    let index: number = selectedSkillTreeNodes.findIndex(selectedSkillTreeNode=>selectedSkillTreeNode.data.id == skillTreeNode.data.id);

    if (index > -1) {
      selectedSkillTreeNodes.splice(index, 1);
    }
  }

  updateAllSelections() {
    this.selectedAndPrerequisiteSkills = this.updateSelections(this.selectedAndPrerequisiteTreeNodes);
    this.selectedOrPrerequisiteSkills = this.updateSelections(this.selectedOrPrerequisiteTreeNodes);
  }

  updateSelections(selectedSkillTreeNodes: Array<SkillTreeNode>): String {
    let selectedSkills: string = "";

    if (selectedSkillTreeNodes == undefined) {
      return selectedSkills;
    }

    selectedSkillTreeNodes.forEach(skillTreeNode=>selectedSkills += (selectedSkills.length > 0 ? '\n' : '') + skillTreeNode.data.shortName)

    return selectedSkills;
  }
}
