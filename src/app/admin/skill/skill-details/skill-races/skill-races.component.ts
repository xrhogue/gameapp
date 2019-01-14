import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Skill} from "admin/shared/skill";
import {Router} from "@angular/router";
import {SkillService} from "../../../../service/skill/skill.service";
import {RaceTreeNode} from "admin/shared/race-tree-node";
import {RaceService} from "../../../../service/race/race.service";
import {Race} from "admin/shared/race";

@Component({
  selector: 'app-skill-races',
  templateUrl: './skill-races.component.html',
  styleUrls: ['./skill-races.component.scss']
})
export class SkillRacesComponent implements OnInit {
  @Input() skill: Skill;
  @Output() skillChange: EventEmitter<Skill> = new EventEmitter<Skill>();
  races: Array<Race>;
  selectedRaces: String;
  raceTreeNodes: Array<RaceTreeNode>;
  selectedRaceTreeNodes: Array<RaceTreeNode> = [];

  constructor(private raceService: RaceService, private skillService: SkillService, private router: Router) { }

  ngOnInit() {
    this.raceService.getRaces().subscribe(races => {
      this.races = races;
      this.raceTreeNodes = this.buildRaceTreeNodes(null);

      this.init(this.skill.raceIds, this.raceTreeNodes, this.selectedRaceTreeNodes);
      this.updateAllSelections();
    });
  }

  buildRaceTreeNodes(parentId: number) {
    let raceTreeNodes: Array<RaceTreeNode> = this.races.filter(race => race.parentId === parentId).map(race => new RaceTreeNode(race, null, null, true, false));

    raceTreeNodes.forEach(raceTreeNode => {
      raceTreeNode.children = this.buildRaceTreeNodes(raceTreeNode.data.id);

      raceTreeNode.leaf = (raceTreeNode.children == undefined || raceTreeNode.children == null || raceTreeNode.children.length == 0);
    });

    return raceTreeNodes;
  }

  raceSelected(event: {node: RaceTreeNode}) {
    this.nodeSelected(event.node, this.selectedRaceTreeNodes);
  }

  nodeSelected(raceTreeNode: RaceTreeNode, selectedRaceTreeNodes: Array<RaceTreeNode>) {
    // unselect the parent node (if any) if a child node is selected
    // TODO: unselect up the hierarchy
    this.unselectNode(raceTreeNode.parent, selectedRaceTreeNodes);

    // unselect all children nodes (if selected) if a parent node is selected
    raceTreeNode.children.forEach(child=>this.unselectNode(child, selectedRaceTreeNodes))

    this.updateAllSelections()
  }

  nodeUnselected(event: {node: RaceTreeNode}) {
    this.updateAllSelections();
  }

  init(raceIds: Array<number>, raceTreeNodes: Array<RaceTreeNode>, selectedRaceTreeNodes: Array<RaceTreeNode>) {
    if (!!raceIds && !!raceTreeNodes) {
      raceIds.forEach(raceId => {
        let matchingRaceTreeNode = this.find(raceId, raceTreeNodes);

        if (!!matchingRaceTreeNode) {
          selectedRaceTreeNodes.push(matchingRaceTreeNode);
        }
      })
    }
  }

  find(raceId: number, raceTreeNodes: Array<RaceTreeNode>): RaceTreeNode {
    let matchingRaceTreeNode = raceTreeNodes.find(raceTreeNode=>raceTreeNode.data.id === raceId);

    if (!!matchingRaceTreeNode) {
      return matchingRaceTreeNode;
    }

    for (let raceTreeNode of raceTreeNodes) {
      if (!!raceTreeNode.children && raceTreeNode.children.length > 0) {
        let matchingRaceTreeNode = this.find(raceId, raceTreeNode.children);

        if (!!matchingRaceTreeNode) {
          return matchingRaceTreeNode;
        }
      }
    }

    return undefined;
  }

  unselectNode(raceTreeNode: RaceTreeNode, selectedRaceTreeNodes: Array<RaceTreeNode>) {
    if (!raceTreeNode) {
      return;
    }

    this.unselectNodeById(raceTreeNode.data.id, selectedRaceTreeNodes);
  }

  unselectNodeById(raceId: number, selectedRaceTreeNodes: Array<RaceTreeNode>) {
    let index: number = selectedRaceTreeNodes.findIndex(selectedRaceTreeNode=>selectedRaceTreeNode.data.id == raceId);

    if (index > -1) {
      selectedRaceTreeNodes.splice(index, 1);
    }
  }

  updateAllSelections() {
    this.selectedRaces = this.updateSelections(this.selectedRaceTreeNodes);
    this.skill.raceIds = this.selectedRaceTreeNodes.map(raceTreeNode=>raceTreeNode.data.id);
  }

  updateSelections(selectedRaceTreeNodes: Array<RaceTreeNode>): String {
    let selectedRaces: string = "";

    if (!selectedRaceTreeNodes) {
      return selectedRaces;
    }

    selectedRaceTreeNodes.forEach(raceTreeNode => selectedRaces += (selectedRaces.length > 0 ? '\n' : '') + raceTreeNode.data.name)

    return selectedRaces;
  }
}
