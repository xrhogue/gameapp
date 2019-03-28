import { Component, OnInit } from '@angular/core';
import {DeityType} from "admin/shared/deity-type";
import {DeityService} from "../../../service/deity/deity.service";

@Component({
             selector: 'app-deity-types',
             templateUrl: './deity-types.component.html',
             styleUrls: ['./deity-types.component.scss']
           })
export class DeityTypesComponent implements OnInit {
  deityTypes: Array<DeityType>;
  selectedDeityTypes: Array<DeityType> = [];
  name: string;
  invalid: boolean = false;

  constructor(private deityService: DeityService) { }

  ngOnInit() {
    this.deityService.getDeityTypes().subscribe(deityTypes => {
      this.deityTypes = deityTypes;
    });
  }

  check(name: string) {
    this.invalid = !!this.deityTypes && this.deityTypes.filter(deityType => deityType.name === name).length > 0;
  }

  addName() {
    if (!this.invalid) {
      if (!!this.name) {
        this.deityService.addDeityType(new DeityType(null, this.name)).subscribe(deityType => {
          this.deityService.getDeityTypes().subscribe(deityTypes => {
            this.deityTypes = deityTypes;
          });
        });
      }

      this.name = "";
    }
  }

  deleteNames(event: Event) {
    if (!!this.selectedDeityTypes) {
      this.selectedDeityTypes.forEach(deityType => this.deityService.deleteDeityType(deityType.id).subscribe(deityType => {
        this.deityService.getDeityTypes().subscribe(deityTypes => {
          this.deityTypes = deityTypes;
        });
      }));
    }

    this.selectedDeityTypes = [];
  }
}
