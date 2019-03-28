import {Component, OnInit} from '@angular/core';
import {DeityType} from "admin/shared/deity-type";
import {MenuItem} from 'primeng/api';
import {Deity} from 'admin/shared/deity';
import {DeityService} from '../../../service/deity/deity.service';
import {Router} from '@angular/router';
import {DeityTreeNode} from 'admin/shared/deity-tree-node';
import {Column} from 'admin/shared/column';
import {UtilService} from "../../../shared/services/util/util.service";

@Component({
             selector: 'app-deities',
             templateUrl: './deities.component.html',
             styleUrls: ['./deities.component.scss']
           })
export class DeitiesComponent implements OnInit {
  deities: Array<Deity>;
  deityTypes: Array<DeityType>;
  deityTreeNodes: Array<DeityTreeNode>;
  selectedDeityTreeNode: DeityTreeNode;
  selectedDeityTreeNodes: Array<DeityTreeNode>;
  columns: Array<Column>;
  items: Array<MenuItem>;
  draggedDeityTreeNode: DeityTreeNode;
  deity: Deity;
  showDialog: boolean = false;

  constructor(private deityService: DeityService, private router: Router, private utilService: UtilService) { }

  ngOnInit() {
    this.columns = [
      { field: 'name', header: 'Name'},
      { field: 'typeId', header: 'Type'},
      { field: 'selectable', header: 'Selectable' },
      { field: 'actions', header: '' }
    ];

    this.items = [
      {label: 'Add Child', command: (event: any) => {this.addChildDeity(this.selectedDeityTreeNode.data)}},
      {label: 'Duplicate', command: (event: any) => {this.duplicateDeity(this.selectedDeityTreeNode.data)}},
      {label: 'Update', command: (event: any) => {this.updateDeity(this.selectedDeityTreeNode.data)}},
      {label: 'Delete', command: (event: any) => {this.deleteDeity(this.selectedDeityTreeNode.data)}},
      {label: 'Move to Root', command: (event: any) => {this.moveDeity(this.selectedDeityTreeNode.data)}}];

    this.deityService.getDeities().subscribe(deities => {
      this.deities = deities;
      this.deityTreeNodes = this.buildDeityTreeNodes(null);
    });

    this.deityService.getDeityTypes().subscribe(deityTypes => {
      this.deityTypes = deityTypes;
    });
  }

  addDeity() {
    this.router.navigateByUrl('/admin/deities/0').catch();
  }

  duplicateDeity(deity: Deity) {
    this.deity = new Deity(null, deity.campaignId, deity.parentId, deity.typeId, '');
    this.showDialog = true;
  }

  addChildDeity(deity: Deity) {
    this.deity = new Deity(null, deity.campaignId, deity.id, deity.typeId, '');
    this.showDialog = true;
  }

  updateDeities(deity: Deity) {
    if (deity.parentId == null) {
      this.deityTreeNodes.push(new DeityTreeNode(deity, null, null, true, false));
    }
    else {
      let deityTreeNode: DeityTreeNode = this.deityTreeNodes.find(deityTreeNode => deityTreeNode.data.id === deity.parentId);

      deityTreeNode.children.push(new DeityTreeNode(deity, deityTreeNode, null, true, false));
      deityTreeNode.leaf = false;
      deityTreeNode.expanded = true;
    }

    this.deityService.getDeities().subscribe(deities => {
      this.deities = deities;
    });

    this.deityService.getDeityTypes().subscribe(deityTypes => {
      this.deityTypes = deityTypes;
    });
  }

  updateDeity(deity: Deity) {
    this.router.navigate(['admin/deities', deity.id]).catch()
  }

  deleteDeity(deity: Deity) {
    this.deityService.deleteDeity(deity.id).subscribe();
  }

  moveDeity(deity: Deity) {
    let deityTreeNode: DeityTreeNode = this.findDeityTreeNode(this.deityTreeNodes, deity.id);
    let parentDeityTreeNode: DeityTreeNode = deityTreeNode.parent;

    if (!!parentDeityTreeNode) {
      this.utilService.deleteObjectFromArray(parentDeityTreeNode.children, deity.id, this.comparator);

      if (parentDeityTreeNode.children.length == 0) {
        parentDeityTreeNode.leaf = true;
      }

      parentDeityTreeNode.expanded = false;
      deityTreeNode.data.parentId = null;
      deityTreeNode.parent = null;
    }

    this.deityTreeNodes.push(deityTreeNode);
    this.deityTreeNodes = [...this.deityTreeNodes];
  }

  buildDeityTreeNodes(parentId: number) {
    let deityTreeNodes: DeityTreeNode[] = this.deities.filter(deity => deity.parentId === parentId).map(deity => new DeityTreeNode(deity, null, null, true, false));

    deityTreeNodes.forEach(deityTreeNode => {
      deityTreeNode.children = this.buildDeityTreeNodes(deityTreeNode.data.id);

      deityTreeNode.leaf = (deityTreeNode.children == undefined || deityTreeNode.children == null || deityTreeNode.children.length == 0);
    });

    return deityTreeNodes;
  }

  findDeityTreeNode(deityTreeNodes: Array<DeityTreeNode>, id: number): DeityTreeNode {
    let foundDeityTreeNode: DeityTreeNode = deityTreeNodes.find((deityTreeNode) => deityTreeNode.data.id === id);

    if (!!foundDeityTreeNode) {
      return foundDeityTreeNode;
    }

    deityTreeNodes.forEach(deityTreeNode => {
      let childDeityTreeNode: DeityTreeNode = this.findDeityTreeNode(deityTreeNode.children, id);

      if (!!childDeityTreeNode) {
        foundDeityTreeNode = childDeityTreeNode;
      }
    });

    return foundDeityTreeNode;
  }

  getSelectedDeityTreeNodeDataId(selectedDeityTreeNode: DeityTreeNode) {
    if (selectedDeityTreeNode != undefined) {
      return selectedDeityTreeNode.data.id;
    }

    return 0;
  }

  getDeityTypeName(deityTypeId: number): string {
    if (!!this.deityTypes && this.deityTypes.length > 0) {
      return this.deityTypes.find(deityType => deityType.id == deityTypeId).name;
    }

    return "Unknown";
  }

  dragStart(event: DragEvent, object: {node: DeityTreeNode}) {
    console.log("starting drag. deity name: " + (object.node != undefined ? object.node.data.name : "undefined"));
    this.draggedDeityTreeNode = object.node;
  }

  dragEnter(event: DragEvent, object: {node: DeityTreeNode, parent: DeityTreeNode}) {
    console.log("entering drag (node: " + (!!object.node ? object.node.data.name : "null") + ", parent: " + (!!object.parent ? object.parent.data.name : "null") + ")");
  }

  dragLeave(event: DragEvent) {
    console.log("leaving drag");
  }

  dragEnd(event: DragEvent) {
    console.log("ending drag");
    this.draggedDeityTreeNode = null;
  }

  drop(event: DragEvent, object: {node: DeityTreeNode}) {
    console.log("dropping on parent: " + object.node.data.name);

    let dropParentDeityTreeNode: DeityTreeNode = object.node;
    let draggedDeity: Deity = this.draggedDeityTreeNode.data;
    let previousParentId: number = draggedDeity.parentId;

    if (draggedDeity.id == dropParentDeityTreeNode.data.id || draggedDeity.parentId == dropParentDeityTreeNode.data.id || dropParentDeityTreeNode.data.id == 0) {
      return;
    }

    draggedDeity.parentId = dropParentDeityTreeNode.data.id;

    this.deityService.updateDeity(draggedDeity).subscribe(deity => {
      // remove references from previous parent
      if (!!previousParentId) {
        let previousParentDeityTreeNode: DeityTreeNode = this.findDeityTreeNode(this.deityTreeNodes, previousParentId);

        this.utilService.deleteObjectFromArray(previousParentDeityTreeNode.children, draggedDeity.id, this.comparator);

        if (previousParentDeityTreeNode.children.length === 0) {
          previousParentDeityTreeNode.leaf = true;
          previousParentDeityTreeNode.expanded = false;
        }
      }
      else {
        this.utilService.deleteObjectFromArray(this.deityTreeNodes, draggedDeity.id, this.comparator);
      }

      if (dropParentDeityTreeNode.leaf) {
        dropParentDeityTreeNode.leaf = false;
      }

      dropParentDeityTreeNode.expanded = true;

      dropParentDeityTreeNode.children.push(this.draggedDeityTreeNode);
      this.draggedDeityTreeNode.parent = dropParentDeityTreeNode;

      // this is to refresh the UI after all the node updates; may be specific to the PrimeNG treetable (they may need to fix something on their side)
      this.deityTreeNodes = [...this.deityTreeNodes];
    });
  }

  comparator(deityTreeNode: DeityTreeNode, deityId: number): boolean {
    return deityTreeNode.data.id === deityId;
  }
}
