import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "admin/shared/location";
import {LocationType} from "admin/shared/location-type";
import {LocationService} from "../../../service/location/location.service";
import {DialogService} from "../../../shared/services/dialog/dialog.service";

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss']
})
export class LocationDetailsComponent implements OnInit {
  id: number;
  @Input() location: Location;
  locationTypes: Array<LocationType>;
  locationTypeName: string = "";
  @Input() modal: boolean = false;
  @Output() locationChange: EventEmitter<Location> = new EventEmitter<Location>();
  @ViewChild('name') nameInput: any;
  @ViewChild('type') typeOption: any;
  showDialog: boolean = false;
  dirty: boolean = false;
  JSON: JSON;

  constructor(private route: ActivatedRoute, private router: Router, private locationService: LocationService, private dialogService: DialogService) {
    this.route.params.subscribe(params => this.id = params.id);
    this.JSON = JSON;
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
    return this.nameInput.invalid || this.typeOption.invalid;
  }

  focus() {
    if (!!this.nameInput) {
      this.nameInput.valueAccessor._elementRef.nativeElement.focus();
    }
  }

  update() {
    if (!this.location.id) {
      this.locationService.addLocation(this.location).subscribe(location => {
        this.location = location;
        this.dirty = false;
        this.finalize();
      });
    }
    else {
      this.locationService.updateLocation(this.location).subscribe(location => {
        this.location = location;
        this.dirty = false;
        this.finalize();
      });
    }
  }

  cancel() {
    if (!this.dirty) {
      this.finalize();
    }
    else {
      this.dialogService.confirm('Discard changes?').subscribe(exit => {
        if (exit) {
          this.finalize();
        }
      });
    }
  }

  addLocationType() {
    this.locationService.addLocationType(new LocationType(null, this.locationTypeName)).subscribe(locationType => {
      this.locationTypeName = '';
      this.locationService.getLocationTypes().subscribe(locationTypes => {
        this.locationTypes = locationTypes.filter(locationType => locationType.id !== 0);
        if (!this.location.typeId) {
          this.location.typeId = !!this.locationTypes && this.locationTypes.length > 0 ? this.locationTypes[0].id : null;
        }
      });
    });
  }

  finalize() {
    if (!this.modal) {
      this.router.navigate(['/admin/locations']).catch(/*display an error message?*/);
    }
    else {
      this.locationChange.emit(this.location);
    }
  }
}
