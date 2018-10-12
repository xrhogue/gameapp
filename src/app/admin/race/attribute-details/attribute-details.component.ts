import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RaceAttribute} from "../../shared/race-attribute";

@Component({
  selector: 'app-attribute-details',
  templateUrl: './attribute-details.component.html',
  styleUrls: ['./attribute-details.component.scss']
})
export class AttributeDetailsComponent implements OnInit {

  @Input() attributeName: string;
  @Input() attributes: Array<RaceAttribute>;
  @Output() add = new EventEmitter<string>();
  @Output() delete = new EventEmitter<Array<RaceAttribute>>();
  selectedAttributes: Array<RaceAttribute> = [];
  name: string;
  invalid: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  check(name: string) {
    this.invalid = this.attributes.filter(attribute=>attribute.name === name).length > 0;
  }

  addName() {
    if (!this.invalid) {
      if (!!this.name) {
        this.add.emit(this.name);
      }

      this.name = "";
    }
  }

  deleteNames(event: Event) {
    if (!!this.selectedAttributes) {
      this.delete.emit(this.selectedAttributes);
    }

    this.selectedAttributes = [];
  }
}
