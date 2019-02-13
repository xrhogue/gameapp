import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {IdNameValue} from "admin/shared/id-name-value";

@Component({
  selector: 'app-add-name',
  templateUrl: './add-name.component.html',
  styleUrls: ['./add-name.component.scss']
})
export class AddNameComponent implements OnInit {
  @Input() type: string = "Type";
  @Input() name: string;
  @Input() idNameValues: Array<IdNameValue>;
  @Output() enter: EventEmitter<string> = new EventEmitter<string>();
  @Output() nameChange: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('nameInput') nameInput: any; // should be NgModel, but _elementRef is supposed not part of that (but it is).

  constructor() { }

  ngOnInit() {
  }

  emitIfValid() {
    if (!this.invalid()) {
      this.enter.emit(name);
    }
  }

  invalid() {
    if (!!this.nameInput) {
      return this.nameInput.invalid && (this.nameInput.dirty || this.nameInput.touched);
    }

    return false;
  }

  focus() {
    if (!!this.nameInput) {
      this.nameInput.valueAccessor._elementRef.nativeElement.focus();
    }
  }
}
