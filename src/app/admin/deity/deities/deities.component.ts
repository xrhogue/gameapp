import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import {Deity} from "admin/shared/deity";
import {DeityService} from "../../../service/deity/deity.service";
import {Router} from "@angular/router";
import {Column} from "admin/shared/column";
import {DeityTreeNode} from "admin/shared/deity-tree-node";

@Component({
  selector: 'app-deities',
  templateUrl: './deities.component.html',
  styleUrls: ['./deities.component.scss']
})
export class DeitiesComponent implements OnInit {
  deities: Array<Deity>;
  deityTreeNodes: Array<DeityTreeNode>;
  selectedDeityTreeNode: DeityTreeNode;
  selectedDeityTreeNodes: Array<DeityTreeNode>;
  cols: Array<Column>;
  items: Array<MenuItem>;
  draggedDeityTreeNode: DeityTreeNode;

  constructor(private deityService: DeityService, private router: Router) { }

  ngOnInit() {
    this.cols = [
      { field: 'name', header: 'Name'},
      { field: 'selectable', header: 'Selectable' },
      { field: 'actions', header: '' }
    ];

    this.items = [
      {label: 'Update', command: (event: any) => {this.updateDeity(this.selectedDeityTreeNode.data)}},
      {label: 'Delete', command: (event: any) => {this.deleteDeity(this.selectedDeityTreeNode.data)}}];

    this.deityService.getDeities().subscribe(deities => {
      this.deities = deities;
      this.deityTreeNodes = this.buildDeityTreeNodes(null);
    });
  }

  addDeity() {
    this.router.navigateByUrl('/admin/deities/0');
  }

  updateDeity(deity: Deity) {
    //this.router.navigateByUrl('/deities/' + deity.id);
    this.router.navigate(['admin/deities', deity.id])
  }

  deleteDeity(deity: Deity) {
    this.deityService.deleteDeity(deity.id).subscribe();
  }

  buildDeityTreeNodes(parentId: number) {
    let deityTreeNodes: Array<DeityTreeNode> = this.deities.filter(deity => deity.parentId === parentId).map(deity => new DeityTreeNode(deity, null, null, true, false));

    deityTreeNodes.forEach(deityTreeNode => {
      deityTreeNode.children = this.buildDeityTreeNodes(deityTreeNode.data.id);

      deityTreeNode.leaf = (deityTreeNode.children == undefined || deityTreeNode.children == null || deityTreeNode.children.length == 0);
    });

    return deityTreeNodes;
  }

  getSelectedDeityTreeNodeDataId(selectedDeityTreeNode: DeityTreeNode) {
    if (selectedDeityTreeNode != undefined) {
      return selectedDeityTreeNode.data.id;
    }

    return 0;
  }

  disableDroppable(object: {node: DeityTreeNode, parent: DeityTreeNode}) {
    if (this.draggedDeityTreeNode == null) {
      return false;
    }

    return true;
  }
  dragStart(event: DragEvent, object: {node: DeityTreeNode, parent: DeityTreeNode}) {
    console.log("starting drag. event: " + event + ", object: " + object + ", deity name: " + (object.node != undefined ? object.node.data.name : "undefined"))
    this.draggedDeityTreeNode = object.node;
    event.dataTransfer.effectAllowed = "move";
  }

  dragEnter(event: DragEvent, object: {node: DeityTreeNode, parent: DeityTreeNode}) {
    console.log("entering drag. event: " + event)

    // this currently DOES NOT WORK!!!
    event.dataTransfer.dropEffect = (this.draggedDeityTreeNode.data.id == object.node.data.id) ? "none" : "move";
    event.dataTransfer.effectAllowed = event.dataTransfer.dropEffect;
  }

  dragLeave(event: DragEvent) {
    console.log("leaving drag. event: " + event)
  }

  dragEnd(event: DragEvent) {
    console.log("ending drag. event: " + event)
    this.draggedDeityTreeNode = null;
  }

  drop(event: DragEvent, object: {node: DeityTreeNode, parent: DeityTreeNode}) {
    console.log("dropping. event: " + event)

    if (object.node.leaf) {
      console.log("cannot drop on a leaf!")
    }
    else {
      let draggedDeity: Deity = this.draggedDeityTreeNode.data;

      draggedDeity.parentId = object.node.data.id;

      this.deityService.updateDeity(draggedDeity);
      this.deityTreeNodes = this.buildDeityTreeNodes(null);
      this.deityTreeNodes.filter((deityTreeNode) => deityTreeNode.data.id == object.node.data.id)
          .forEach(deityTreeNode => deityTreeNode.expanded = object.node.expanded);
      // TODO: don't forget to remove from previous parent node (if necessary)
    }
  }
}
