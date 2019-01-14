import { Component, OnInit } from '@angular/core';
import {SkillService} from "../../../service/skill/skill.service";
import {Router} from "@angular/router";
import {Skill} from "../../shared/skill";
import {SkillTreeNode} from "../../shared/skill-tree-node";
import {Column} from "../../shared/column";
import {MenuItem} from "primeng/api";
import {StatService} from "../../../service/stat/stat.service";
import {Stat} from "../../shared/stat";

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  stats: Array<Stat>;
  skills: Array<Skill>;
  skillTreeNodes: Array<SkillTreeNode>;
  selectedSkillTreeNode: SkillTreeNode;
  selectedSkillTreeNodes: Array<SkillTreeNode>;
  cols: Array<Column>;
  items: Array<MenuItem>;
  draggedSkillTreeNode: SkillTreeNode;

  constructor(private skillService: SkillService, private statService: StatService, private router: Router) { }

  ngOnInit() {
    this.statService.getStats().subscribe(stats => this.stats = stats);
    this.skillService.getSkills().subscribe(skills => this.skills = skills);
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

    this.items = [
      {label: 'Update', command: (event: any) => {this.updateSkill(this.selectedSkillTreeNode.data)}},
      {label: 'Delete', command: (event: any) => {this.deleteSkill(this.selectedSkillTreeNode.data)}}];
    // this.data.getSkills().subscribe(data => this.skills = data);
  }

  addSkill() {
    this.router.navigateByUrl('/admin/skills/0');
  }

  updateSkill(skill: Skill) {
    this.router.navigate(['admin/skills', skill.id])
  }

  deleteSkill(skill: Skill) {
    this.skillService.deleteSkill(skill.id).subscribe();
  }

  buildSkillTreeNodes(parentId: number) {
    let skillTreeNodes: Array<SkillTreeNode> = this.skills.filter(skill => skill.parentId === parentId).map(skill => new SkillTreeNode(skill, null, null, true, false));

    skillTreeNodes.forEach(skillTreeNode => {
      skillTreeNode.children = this.buildSkillTreeNodes(skillTreeNode.data.id);

      skillTreeNode.leaf = (skillTreeNode.children == undefined || skillTreeNode.children == null || skillTreeNode.children.length == 0);
    });

    return skillTreeNodes;
  }

  getPrimaryStat(skill: Skill) {
    if (skill === undefined || skill.primaryStatId == undefined) {
      return '';
    }

    return this.stats.filter(stat => stat.id === skill.primaryStatId)[0].name;
  }

  getSecondaryStats(skill: Skill) {
    if (skill === undefined || skill.secondaryStatIds == undefined) {
      return '';
    }

    return skill.secondaryStatIds.map(statId => this.stats.filter(stat => stat.id === statId)[0].shortName).join("/");
  }

  getSelectedSkillTreeNodeDataId(selectedSkillTreeNode: SkillTreeNode) {
    if (selectedSkillTreeNode != undefined) {
      return selectedSkillTreeNode.data.id;
    }

    return 0;
  }

  disableDroppable(object: {node: SkillTreeNode, parent: SkillTreeNode}) {
    if (this.draggedSkillTreeNode == null) {
      return false;
    }

    return true;
  }
  dragStart(event: DragEvent, object: {node: SkillTreeNode, parent: SkillTreeNode}) {
    console.log("starting drag. event: " + event + ", object: " + object + ", skill name: " + (object.node != undefined ? object.node.data.name : "undefined"))
    this.draggedSkillTreeNode = object.node;
    event.dataTransfer.effectAllowed = "move";
  }

  dragEnter(event: DragEvent, object: {node: SkillTreeNode, parent: SkillTreeNode}) {
    console.log("entering drag. event: " + event)

    // this currently DOES NOT WORK!!!
    event.dataTransfer.dropEffect = (this.draggedSkillTreeNode.data.id == object.node.data.id) ? "none" : "move";
    event.dataTransfer.effectAllowed = event.dataTransfer.dropEffect;
  }

  dragLeave(event: DragEvent) {
    console.log("leaving drag. event: " + event)
  }

  dragEnd(event: DragEvent) {
    console.log("ending drag. event: " + event)
    this.draggedSkillTreeNode = null;
  }

  drop(event: DragEvent, object: {node: SkillTreeNode, parent: SkillTreeNode}) {
    console.log("dropping. event: " + event)

    if (object.node.leaf) {
      console.log("cannot drop on a leaf!")
    }
    else {
      let draggedSkill: Skill = this.draggedSkillTreeNode.data;

      draggedSkill.parentId = object.node.data.id;

      this.skillService.updateSkill(draggedSkill);
      this.skillTreeNodes = this.buildSkillTreeNodes(null);
      this.skillTreeNodes.filter((skillTreeNode) => skillTreeNode.data.id == object.node.data.id)
        .forEach(skillTreeNode => skillTreeNode.expanded = object.node.expanded);
      // TODO: don't forget to remove from previous parent node (if necessary)
    }
  }
}
