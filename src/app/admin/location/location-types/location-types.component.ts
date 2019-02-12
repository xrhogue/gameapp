import { Component, OnInit } from '@angular/core';
import {LocationType} from "admin/shared/location-type";
import {LocationService} from "../../../service/location/location.service";

@Component({
  selector: 'app-location-types',
  templateUrl: './location-types.component.html',
  styleUrls: ['./location-types.component.scss']
})
export class LocationTypesComponent implements OnInit {
  locationTypes: Array<LocationType>;
  selectedLocationTypes: Array<LocationType> = [];
  name: string;
  invalid: boolean = false;

  constructor(private locationService: LocationService) { }

  ngOnInit() {
    this.locationService.getLocationTypes().subscribe(locationTypes => {
      this.locationTypes = locationTypes;
    });
  }

  check(name: string) {
    this.invalid = !!this.locationTypes && this.locationTypes.filter(locationType => locationType.name === name).length > 0;
  }

  addName() {
    if (!this.invalid) {
      if (!!this.name) {
        this.locationService.addLocationType(new LocationType(null, this.name)).subscribe(locationType => {
          this.locationService.getLocationTypes().subscribe(locationTypes => {
            this.locationTypes = locationTypes;
          });
        });
      }

      this.name = "";
    }
  }

  deleteNames(event: Event) {
    if (!!this.selectedLocationTypes) {
      this.selectedLocationTypes.forEach(locationType => this.locationService.deleteLocationType(locationType.id).subscribe(locationType => {
        this.locationService.getLocationTypes().subscribe(locationTypes => {
          this.locationTypes = locationTypes;
        });
      }));
    }

    this.selectedLocationTypes = [];
  }
}
