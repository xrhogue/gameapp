import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Race} from "../../../shared/race";
import {Gender} from "../../../shared/gender";
import {RaceAttribute} from "../../../shared/race-attribute";
import {Attribute} from "../../../shared/attribute";

@Component({
  selector: 'app-race-attribute-details',
  templateUrl: './race-attribute-details.component.html',
  styleUrls: ['./race-attribute-details.component.scss']
})
export class RaceAttributeDetailsComponent implements OnInit {

  @Input() attributeName: string;
  @Input() gender: Gender;
  @Input() race: Race;
  @Input() attributes: Array<Attribute>;
  @Input() raceAttributes: Array<RaceAttribute>;
  @Output() raceChange: EventEmitter<Race> = new EventEmitter<Race>();
  @Output() update: EventEmitter<Array<Attribute>> = new EventEmitter<Array<Attribute>>();
  @Output() add: EventEmitter<string> = new EventEmitter<string>();
  selectedAttributes: Array<Attribute>;
  showDialog: boolean = false;
  newAttribute: string = "";

  constructor() {
  }

  ngOnInit() {
    if (!!this.raceAttributes) {
      this.selectedAttributes = this.raceAttributes.filter(raceAttribute => raceAttribute.genderId === this.gender.id)
        .map(raceAttribute => this.attributes.filter(attribute => attribute.id === raceAttribute.attributeId)[0]);
    }
  }

  updateAttributes() {
    this.update.emit(this.selectedAttributes);
  }

  addAttribute() {
    this.add.emit(this.newAttribute);

    this.newAttribute = "";
  }

  updateInvalid(name: string, invalid: boolean) {
  }
}
