import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import {Router} from "@angular/router";
import {Column} from "../../shared/column";
import {RaceService} from "../../../service/race/race.service";
import {Race} from "../../shared/race";
import {RaceTreeNode} from "../../shared/race-tree-node";

@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.scss']
})
export class RacesComponent implements OnInit {
  races: Array<Race>;
  raceTreeNodes: Array<RaceTreeNode>;
  selectedRaceTreeNode: RaceTreeNode;
  selectedRaceTreeNodes: Array<RaceTreeNode>;
  cols: Array<Column>;
  items: Array<MenuItem>;
  draggedRaceTreeNode: RaceTreeNode;

  constructor(private raceService: RaceService, private router: Router) { }

  ngOnInit() {
    this.cols = [
      { field: 'name', header: 'Name'},
      { field: 'selectable', header: 'Selectable' },
      { field: 'actions', header: '' }
    ];

    this.items = [
      {label: 'Update', command: (event: any) => {this.updateRace(this.selectedRaceTreeNode.data)}},
      {label: 'Delete', command: (event: any) => {this.deleteRace(this.selectedRaceTreeNode.data)}}];

    this.raceService.getRaces().subscribe(races => {
      this.races = races;
      this.raceTreeNodes = this.buildRaceTreeNodes(null);
    });
  }

  addRace() {
    this.router.navigateByUrl('/admin/races/0');
  }

  updateRace(race: Race) {
    //this.router.navigateByUrl('/races/' + race.id);
    this.router.navigate(['admin/races', race.id])
  }

  deleteRace(race: Race) {
    this.raceService.deleteRace(race.id).subscribe();
  }

  buildRaceTreeNodes(parentId: number) {
    let raceTreeNodes: Array<RaceTreeNode> = this.races.filter(race => race.parentId === parentId).map(race => new RaceTreeNode(race, null, null, true, false));

    raceTreeNodes.forEach(raceTreeNode => {
      raceTreeNode.children = this.buildRaceTreeNodes(raceTreeNode.data.id);

      raceTreeNode.leaf = (raceTreeNode.children == undefined || raceTreeNode.children == null || raceTreeNode.children.length == 0);
    });

    return raceTreeNodes;
  }

  getSelectedRaceTreeNodeDataId(selectedRaceTreeNode: RaceTreeNode) {
    if (selectedRaceTreeNode != undefined) {
      return selectedRaceTreeNode.data.id;
    }

    return 0;
  }

  disableDroppable(object: {node: RaceTreeNode, parent: RaceTreeNode}) {
    if (this.draggedRaceTreeNode == null) {
      return false;
    }

    return true;
  }
  dragStart(event: DragEvent, object: {node: RaceTreeNode, parent: RaceTreeNode}) {
    console.log("starting drag. event: " + event + ", object: " + object + ", race name: " + (object.node != undefined ? object.node.data.name : "undefined"))
    this.draggedRaceTreeNode = object.node;
    event.dataTransfer.effectAllowed = "move";
  }

  dragEnter(event: DragEvent, object: {node: RaceTreeNode, parent: RaceTreeNode}) {
    console.log("entering drag. event: " + event)

    // this currently DOES NOT WORK!!!
    event.dataTransfer.dropEffect = (this.draggedRaceTreeNode.data.id == object.node.data.id) ? "none" : "move";
    event.dataTransfer.effectAllowed = event.dataTransfer.dropEffect;
  }

  dragLeave(event: DragEvent) {
    console.log("leaving drag. event: " + event)
  }

  dragEnd(event: DragEvent) {
    console.log("ending drag. event: " + event)
    this.draggedRaceTreeNode = null;
  }

  drop(event: DragEvent, object: {node: RaceTreeNode, parent: RaceTreeNode}) {
    console.log("dropping. event: " + event)

    if (object.node.leaf) {
      console.log("cannot drop on a leaf!")
    }
    else {
      let draggedRace: Race = this.draggedRaceTreeNode.data;

      draggedRace.parentId = object.node.data.id;

      this.raceService.updateRace(draggedRace);
      this.raceTreeNodes = this.buildRaceTreeNodes(null);
      this.raceTreeNodes.filter((raceTreeNode) => raceTreeNode.data.id == object.node.data.id)
        .forEach(raceTreeNode => raceTreeNode.expanded = object.node.expanded);
      // TODO: don't forget to remove from previous parent node (if necessary)
    }
  }
}
