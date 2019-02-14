import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IdNameValue} from "admin/shared/id-name-value";

@Component({
  selector: 'app-add-name-dialog',
  templateUrl: './add-name-dialog.component.html',
  styleUrls: ['./add-name-dialog.component.scss']
})
export class AddNameDialogComponent implements OnInit {
  @Input() header: string = "Header";
  @Input() visible: boolean = false;
  @Input() label: string = "Name";
  @Input() name: string = "";
  @Input() idNameValues: Array<IdNameValue> = [];
  @Output() nameChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  addName() {
    this.nameChange.emit(this.name);
    this.visibleChange.emit(false);
    this.name = '';
  }

  cancel() {
    this.visibleChange.emit(false);
    this.name = '';
  }
}
