import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "admin/shared/location";
import {LocationType} from "admin/shared/location-type";
import {Observable} from "rxjs";
import {LocationService} from "../../../service/location/location.service";
import {AddNameComponent} from "../../../shared/components/add-name/add-name.component";
import {DialogService} from "../../../shared/services/dialog/dialog.service";

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss']
})
export class LocationDetailsComponent implements OnInit {
  id: number;
  location: Location;
  types: Array<LocationType>;
  showDialog: boolean = false;
  locationTypeName: string = "";
  ignoreDirty: boolean = false;
  JSON: JSON;

  constructor(private route: ActivatedRoute, private router: Router, private locationService: LocationService, private dialogService: DialogService) {
    this.route.params.subscribe(params => this.id = params.id);
    this.JSON = JSON;
  }

  ngOnInit() {
    if (this.id > 0) {
      this.locationService.getLocation(this.id).subscribe(location => this.location = location);
    }
    else {
      this.location = new Location(null,null,null,null,"");
    }
  }

  update() {
    if (!this.location.id) {
      this.locationService.addLocation(this.location).subscribe(location => {
        this.location = location;
        this.ignoreDirty = true;
        this.router.navigate(['/admin/locations']);
      });
    }
    else {
      this.locationService.updateLocation(this.location).subscribe(location => {
        this.location = location;
        this.ignoreDirty = true;
        this.router.navigate(['/admin/locations']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/admin/locations']);
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.ignoreDirty) {
      return true;
    }

    return this.dialogService.confirm('Discard changes?');
  }

  addLocationType() {
    this.locationService.addLocationType(new LocationType(null, this.locationTypeName)).subscribe(locationType => {
      this.locationTypeName = '';
      this.locationService.getLocationTypes().subscribe(locationTypes => this.types = locationTypes.filter(locationType => locationType.id !== 0));
    });
  }
}
