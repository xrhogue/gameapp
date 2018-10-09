import {Component, Input, OnInit} from '@angular/core';
import {RaceAttribute} from "../../shared/race-attribute";
import {ListboxModule} from 'primeng/listbox';

@Component({
  selector: 'app-attribute-details',
  templateUrl: './attribute-details.component.html',
  styleUrls: ['./attribute-details.component.scss']
})
export class AttributeDetailsComponent implements OnInit {

  @Input() attributes: Array<RaceAttribute>;
  selectedAttribute: RaceAttribute;

  constructor() { }

  ngOnInit() {
  }
}
