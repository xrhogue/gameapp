import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Location} from "admin/shared/location";
import {LocationTreeNode} from "admin/shared/location-tree-node";
import {LocationService} from "../../../service/location/location.service";
import {UtilService} from "../../../shared/services/util/util.service";

@Component({
  selector: 'app-select-location-dlg',
  templateUrl: './select-location-dlg.component.html',
  styleUrls: ['./select-location-dlg.component.scss']
})
export class SelectLocationDlgComponent implements OnInit {
  @Input() header: string = "Select Location";
  @Input() visible: boolean = false;
  @Input() location: Location;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() locationChange: EventEmitter<Location> = new EventEmitter<Location>();
  locations: Array<Location>;
  locationTreeNodes: Array<LocationTreeNode>;
  selectedLocationTreeNode: LocationTreeNode;
  showDialog: boolean = false;

  constructor(private locationService: LocationService, private utilService: UtilService) { }

  ngOnInit() {
    this.show()
  }

  show() {
    this.locationService.getLocations().subscribe(locations => {
      this.locations = locations.filter(location => !!location.id);
      this.locationTreeNodes = this.buildLocationTreeNodes(null);
      // add the ability to move a location to the top level
      this.locationTreeNodes.unshift(new LocationTreeNode(new Location(null, null, null, null, "(None)"), null, null, "(None)", true))
    });
  }

  close() {
    this.locationChange.emit(this.selectedLocationTreeNode.data);
    this.visibleChange.emit(false);
  }

  cancel() {
    this.visibleChange.emit(false);
  }

  buildLocationTreeNodes(parentId: number) {
    let locationTreeNodes: LocationTreeNode[] = this.locations.filter(location => location.parentId === parentId).map(location => new LocationTreeNode(location, null, null, location.name, true, false));

    locationTreeNodes.forEach(locationTreeNode => {
      locationTreeNode.children = this.buildLocationTreeNodes(locationTreeNode.data.id);

      locationTreeNode.leaf = (locationTreeNode.children == undefined || locationTreeNode.children == null || locationTreeNode.children.length == 0);
    });

    return locationTreeNodes;
  }

  updateLocations(location: Location) {
    this.show();
  }
}
