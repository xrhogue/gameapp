import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "admin/shared/location";
import {LocationType} from "admin/shared/location-type";
import {LocationService} from "service/location/location.service";
import {DialogService} from "shared/services/dialog/dialog.service";

@Component({
             selector:    'app-location-details',
             templateUrl: './location-details.component.html',
             styleUrls:   ['./location-details.component.scss']
           })
export class LocationDetailsComponent implements OnInit {
  id: number;
  @Input() location: Location;
  @Input() modal: boolean = false;
  @Output() locationChange: EventEmitter<Location> = new EventEmitter<Location>();
  @ViewChild('name', {static: true}) nameInput: any;
  @ViewChild('type', {static: false}) typeOption: any;
  locations: Array<Location>;
  locationTypes: Array<LocationType>;
  locationTypeName: string = "";
  parent: Location = new Location(0, 0, 0, 0, "(None)");
  showDialog: boolean = false;
  selectParent: boolean = false;
  dirty: boolean = false;
  JSON: JSON;

  constructor(private route: ActivatedRoute, private router: Router, private locationService: LocationService, private dialogService: DialogService) {
    this.route.params.subscribe(params => this.id = params.id);
    this.JSON = JSON;
  }

  ngOnInit() {
    this.init();
  }

  init() {
    if (!!this.location) {
      this.id = this.location.id;
    }
    else {
      this.id = null;
    }

    this.locationService.getLocations().subscribe(locations => {
      this.locations = locations;

      if (!!this.location && !!this.location.parentId) {
        this.parent = this.locations.find(location => location.id === this.location.parentId);
      }

      if (!this.parent) {
        this.parent = new Location(0, 0, 0, 0, "(None)");
      }
    });

    this.locationService.getLocationTypes().subscribe(locationTypes => {
      this.locationTypes = locationTypes.filter(locationType => locationType.id !== 0);

      if (this.id > 0) {
        this.locationService.getLocation(this.id).subscribe(location => this.location = location);
      } else if (!this.location) {
        this.location = new Location(null, null, null, !!this.locationTypes && this.locationTypes.length > 0 ? this.locationTypes[0].id : null, "");
      }
      else {
        this.location.typeId = !!this.locationTypes && this.locationTypes.length > 0 ? this.locationTypes[0].id : null;
      }
    });
  }

  invalid() {
    // if this is a new record, then it is always invalid
    if (!!this.location && this.location.id == 0 && !!this.nameInput && !this.nameInput.dirty) {
      return true;
    }

    // if this is an existing record, wait until it is ready for checking (e.g. value has been set)
    if (!!this.location && !!this.location.name && !!this.nameInput && !!this.nameInput.control && !this.nameInput.control.value) {
      return false;
    }

    return (!!this.nameInput && this.nameInput.invalid) || (!!this.typeOption && this.typeOption.invalid);
  }

  focus() {
    this.init();

    if (!!this.nameInput) {
      this.nameInput.valueAccessor._elementRef.nativeElement.focus();
    }
  }

  update() {
    if (!!this.parent && !!this.parent.id) {
      this.location.parentId = this.parent.id;
    } else {
      this.location.parentId = null;
    }

    if (!this.location.id) {
      this.location.id = null;
      this.locationService.addLocation(this.location).subscribe(location => {
        this.location = location;
        this.dirty = false;
        this.finalize();
      });
    } else {
      this.locationService.updateLocation(this.location).subscribe(location => {
        this.location = location;
        this.dirty = false;
        this.finalize();
      });
    }
  }

  updateParent(parent: Location) {
    if (!!parent && !!parent.id) {
      this.parent = parent;
    }
  }

  cancel() {
    if (!this.dirty) {
      this.finalize();
    } else {
      this.dialogService.confirm('Discard changes?').subscribe(exit => {
        if (exit) {
          this.finalize();
        }
      });
    }
  }

  addLocationType() {
    this.locationService.addLocationType(new LocationType(null, this.locationTypeName)).subscribe(locationType => {
      this.locationService.getLocationTypes().subscribe(locationTypes => {
        this.locationTypes = locationTypes.filter(locationType => locationType.id !== 0);
        let newLocationType: LocationType = this.locationTypes.find(locationType => locationType.name === this.locationTypeName);

        if (!!newLocationType) {
          this.location.typeId = newLocationType.id;
        }

        if (!this.location.typeId) {
          this.location.typeId = !!this.locationTypes && this.locationTypes.length > 0 ? this.locationTypes[0].id : null;
        }

        this.locationTypeName = '';
      });
    });
  }

  finalize() {
    if (!this.modal) {
      this.router.navigate(['/admin/locations']).catch(/*display an error message?*/);
    } else {
      this.emit();
    }
  }

  emit() {
    this.locationChange.emit(this.location);
  }
}
