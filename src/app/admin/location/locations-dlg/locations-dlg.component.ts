import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Location} from "admin/shared/location";
import {LocationTreeNode} from "admin/shared/location-tree-node";
import {LocationService} from "service/location/location.service";
import {UtilService} from "shared/services/util/util.service";

@Component({
  selector: 'app-locations-dlg',
  templateUrl: './locations-dlg.component.html',
  styleUrls: ['./locations-dlg.component.scss']
})
export class LocationsDlgComponent implements OnInit {
  @Input() header: string = "Select Location";
  @Input() visible: boolean = false;
  @Input() location: Location;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() locationChange: EventEmitter<Location> = new EventEmitter<Location>();
  locations: Array<Location>;
  locationTreeNodes: Array<LocationTreeNode>;
  selectedLocationTreeNode: LocationTreeNode;
  newLocation: Location;
  showDialog: boolean = false;

  constructor(private locationService: LocationService, private utilService: UtilService) { }

  ngOnInit() {
    this.newLocation = new Location(0, this.location.campaignId, 0, 0, '');
    this.show(this.location)
  }

  show(location: Location) {
    this.locationService.getLocations().subscribe(locations => {
      this.locations = locations;
      this.locationTreeNodes = this.buildLocationTreeNodes(location, null);
    });
  }

  close() {
    this.locationChange.emit(this.selectedLocationTreeNode.data);
    this.visibleChange.emit(false);
  }

  cancel() {
    this.visibleChange.emit(false);
  }

  buildLocationTreeNodes(selectedLocation: Location, parentId: number) {
    let locationTreeNodes: LocationTreeNode[] = this.locations.filter(location => location.parentId === parentId).map(location => new LocationTreeNode(location, null, null, location.name, true, false));

    locationTreeNodes.forEach(locationTreeNode => {
      locationTreeNode.children = this.buildLocationTreeNodes(selectedLocation, locationTreeNode.data.id);

      locationTreeNode.leaf = (locationTreeNode.children == undefined || locationTreeNode.children == null || locationTreeNode.children.length == 0);

      if (!!selectedLocation && locationTreeNode.data.id == selectedLocation.id) {
        this.selectedLocationTreeNode = locationTreeNode;
      }
    });

    return locationTreeNodes;
  }

  updateLocations(location: Location) {
    this.show(location);
  }
}
