import { Component, OnInit } from '@angular/core';
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

  skills: Array<Skill>;
  skillTreeNodes: Array<SkillTreeNode>;
  andPrerequisiteTreeNodes: Array<SkillTreeNode>;
  orPrerequisiteTreeNodes: Array<SkillTreeNode>;

  constructor(private skillService: SkillService, private router: Router) { }

  ngOnInit() {
    this.skills = this.skillService.getSkills();
    this.skillTreeNodes = this.buildSkillTreeNodes(null);
  }

  buildSkillTreeNodes(parentId: number) {
    let skillTreeNodes: Array<SkillTreeNode> = this.skills.filter(skill => skill.parentId === parentId).map(skill => new SkillTreeNode(skill, null, true, false));

    skillTreeNodes.forEach(skillTreeNode => {
      skillTreeNode.children = this.buildSkillTreeNodes(skillTreeNode.data.id);

      skillTreeNode.leaf = (skillTreeNode.children == undefined || skillTreeNode.children == null || skillTreeNode.children.length == 0);
    });

    return skillTreeNodes;
  }

}
