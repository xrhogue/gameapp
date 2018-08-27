import { Component, OnInit } from '@angular/core';
import {SkillService} from "../../../service/skill/skill.service";
import {Router} from "@angular/router";
import {Skill} from "../../shared/skill";
import {SkillTreeNode} from "../../shared/skill-tree-node";
import {Column} from "../../shared/column";
import {MenuItem} from "primeng/api";
import {StatService} from "../../../service/stat/stat.service";

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  skills: Array<Skill>;
  skillTreeNodes: Array<SkillTreeNode>;
  selectedSkillTreeNode: SkillTreeNode;
  selectedSkillTreeNodes: Array<SkillTreeNode>;
  cols: Array<Column>;
  items: Array<MenuItem> = [{label: 'Test'}];

  constructor(private data: SkillService, private statService: StatService, private router: Router) { }

  ngOnInit() {
    this.skills = this.data.getSkills();
    this.skillTreeNodes = this.buildSkillTreeNodes(null);

    this.cols = [
      { field: 'name', header: 'Name'},
      { field: 'baseCost', header: 'Base Cost' },
      { field: 'levelCost', header: 'Level Cost' },
      { field: 'primaryStat', header: 'Primary Stat' },
      { field: 'secondaryStats', header: 'Secondary Stats' },
      { field: 'selectable', header: 'Selectable' },
      { field: 'actions', header: '' }
    ];

    // this.data.getSkills().subscribe(data => this.skills = data);
  }

  addSkill() {
    this.router.navigateByUrl('/skills/0');
  }

  updateSkill(skill: Skill) {
    return this.data.updateSkill(skill);
  }

  deleteSkill(skillId: number) {
    this.data.deleteSkill(skillId);
  }

  buildSkillTreeNodes(parentId: number) {
    let skillTreeNodes: Array<SkillTreeNode> = this.skills.filter(skill => skill.parentId === parentId).map(skill => new SkillTreeNode(skill, null, true, false));

    skillTreeNodes.forEach(skillTreeNode => {
      skillTreeNode.children = this.buildSkillTreeNodes(skillTreeNode.data.id);

      skillTreeNode.leaf = (skillTreeNode.children == undefined || skillTreeNode.children == null || skillTreeNode.children.length == 0);

      skillTreeNode.expanded = true;
    });

    return skillTreeNodes;
  }

  getPrimaryStat(skill: Skill) {
    if (skill === undefined || skill.primaryStatId == undefined) {
      return '';
    }

    return this.statService.getStat(skill.primaryStatId).name;
  }

  getSecondaryStats(skill: Skill) {
    if (skill === undefined || skill.secondaryStatIds == undefined) {
      return '';
    }

    return skill.secondaryStatIds.map(statId => this.statService.getStat(statId).shortName).join("/");
  }
}
