import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Deity} from "admin/shared/deity";
import {DeityTreeNode} from "admin/shared/deity-tree-node";
import {DeityService} from "../../../service/deity/deity.service";
import {UtilService} from "../../../shared/services/util/util.service";

@Component({
  selector: 'app-deities-dlg',
  templateUrl: './deities-dlg.component.html',
  styleUrls: ['./deities-dlg.component.scss']
})
export class DeitiesDlgComponent implements OnInit {
  @Input() header: string = "Select Deities";
  @Input() visible: boolean = false;
  @Input() deities: Array<Deity>;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() deitiesChange: EventEmitter<Array<Deity>> = new EventEmitter<Array<Deity>>();
  deity: Deity = new Deity(null, null, null, null, null);
  deityTreeNodes: Array<DeityTreeNode>;
  selectedDeityTreeNodes: Array<DeityTreeNode>;
  showDialog: boolean = false;

  constructor(private deityService: DeityService, private utilService: UtilService) { }

  ngOnInit() {
    this.show()
  }

  show() {
    this.deityService.getDeities().subscribe(deities => {
      this.deities = deities;
      this.deityTreeNodes = this.buildDeityTreeNodes(null);
    });
  }

  close() {
    this.deitiesChange.emit(this.selectedDeityTreeNodes.map(selectedDeityTreeNode => selectedDeityTreeNode.data));
    this.visibleChange.emit(false);
  }

  cancel() {
    this.visibleChange.emit(false);
  }

  buildDeityTreeNodes(parentId: number) {
    let deityTreeNodes: DeityTreeNode[] = this.deities.filter(deity => deity.parentId === parentId).map(deity => new DeityTreeNode(deity, null, null, deity.name, true, false));

    deityTreeNodes.forEach(deityTreeNode => {
      deityTreeNode.children = this.buildDeityTreeNodes(deityTreeNode.data.id);

      deityTreeNode.leaf = (deityTreeNode.children == undefined || deityTreeNode.children == null || deityTreeNode.children.length == 0);
    });

    return deityTreeNodes;
  }

  updateDeities(deity: Deity) {
    this.show();
  }
}
