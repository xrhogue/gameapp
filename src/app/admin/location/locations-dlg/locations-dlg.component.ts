import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Location} from "admin/shared/location";
import {LocationTreeNode} from "admin/shared/location-tree-node";
import {LocationService} from "../../../service/location/location.service";
import {UtilService} from "../../../shared/services/util/util.service";

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

  constructor(private locationService: LocationService, private utilService: UtilService) { }

  ngOnInit() {

    this.locationService.getLocations().subscribe(locations => {
      this.locations = locations;
      this.locationTreeNodes = this.buildLocationTreeNodes(null);
    });
  }

  buildLocationTreeNodes(parentId: number) {
    let locationTreeNodes: LocationTreeNode[] = this.locations.filter(location => location.parentId === parentId).map(location => new LocationTreeNode(location, null, null, true, false));

    locationTreeNodes.forEach(locationTreeNode => {
      locationTreeNode.children = this.buildLocationTreeNodes(locationTreeNode.data.id);

      locationTreeNode.leaf = (locationTreeNode.children == undefined || locationTreeNode.children == null || locationTreeNode.children.length == 0);
    });

    return locationTreeNodes;
  }

  select() {
  }
}
