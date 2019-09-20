import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LocationDetailsComponent} from "admin/location/location-details/location-details.component";
import {Location} from "admin/shared/location";
import {LocationType} from "admin/shared/location-type";
import {LocationService} from "../../../service/location/location.service";

@Component({
  selector: 'app-location-page',
  templateUrl: './location-page.component.html',
  styleUrls: ['./location-page.component.scss']
})
export class LocationPageComponent implements OnInit {

  id: number;
  @Input() location: Location;
  locationTypes: Array<LocationType>;
//  @Output() locationChange: EventEmitter<Location> = new EventEmitter<Location>();
  @ViewChild('details', { static: true }) locationDetails: LocationDetailsComponent;

  constructor(private route: ActivatedRoute, private locationService: LocationService) {
    this.route.params.subscribe(params => this.id = params.id);
  }

  ngOnInit() {
    this.locationService.getLocationTypes().subscribe(locationTypes => {
      this.locationTypes = locationTypes.filter(locationType => locationType.id !== 0);

      if (this.id > 0) {
        this.locationService.getLocation(this.id).subscribe(location => this.location = location);
      }
      else if (!this.location) {
        this.location = new Location(null, null, null, !!this.locationTypes && this.locationTypes.length > 0 ? this.locationTypes[0].id : null, "");
      }
    });
  }

  invalid() {
    return this.locationDetails.invalid();
  }

  update() {
    this.locationDetails.update();
  }

  cancel() {
    this.locationDetails.cancel();
  }
}
