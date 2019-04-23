import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Deity} from "admin/shared/deity";
import {DeityTreeNode} from "admin/shared/deity-tree-node";
import {DeityService} from "../../../service/deity/deity.service";
import {UtilService} from "../../../shared/services/util/util.service";

@Component({
  selector: 'app-select-deity-dlg',
  templateUrl: './select-deity-dlg.component.html',
  styleUrls: ['./select-deity-dlg.component.scss']
})
export class SelectDeityDlgComponent implements OnInit {
  @Input() header: string = "Select Deity";
  @Input() visible: boolean = false;
  @Input() deity: Deity;
  @Input() ignoreDeity: Deity;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() deityChange: EventEmitter<Deity> = new EventEmitter<Deity>();
  deities: Array<Deity>;
  deityTreeNodes: Array<DeityTreeNode>;
  selectedDeityTreeNode: DeityTreeNode;
  showDialog: boolean = false;

  constructor(private deityService: DeityService, private utilService: UtilService) { }

  ngOnInit() {
    this.show()
  }

  show() {
    this.deityService.getDeities().subscribe(deities => {
      this.deities = deities.filter(deity => !!deity.id);
      this.deityTreeNodes = this.buildDeityTreeNodes(null);
      // add the ability to move a deity to the top level
      this.deityTreeNodes.unshift(new DeityTreeNode(new Deity(null, null, null, null, "(None)"), null, null, "(None)", true))
    });
  }

  close() {
    this.deityChange.emit(this.selectedDeityTreeNode.data);
    this.visibleChange.emit(false);
  }

  cancel() {
    this.visibleChange.emit(false);
  }

  buildDeityTreeNodes(parentId: number) {
    let deityTreeNodes: DeityTreeNode[] = this.deities.filter(deity => deity.parentId === parentId && this.ignoreDeity.id !== deity.id).map(deity => new DeityTreeNode(deity, null, null, deity.name,false));

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
