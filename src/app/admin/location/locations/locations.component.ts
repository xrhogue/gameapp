import { Component, OnInit } from '@angular/core';
import {LocationType} from "admin/shared/location-type";
import {MenuItem} from 'primeng/api';
import {Location} from 'admin/shared/location';
import {LocationService} from '../../../service/location/location.service';
import {Router} from '@angular/router';
import {LocationTreeNode} from 'admin/shared/location-tree-node';
import {Column} from 'admin/shared/column';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  locations: Array<Location>;
  locationTypes: Array<LocationType>;
  locationTreeNodes: Array<LocationTreeNode>;
  selectedLocationTreeNode: LocationTreeNode;
  selectedLocationTreeNodes: Array<LocationTreeNode>;
  columns: Array<Column>;
  items: Array<MenuItem>;
  draggedLocationTreeNode: LocationTreeNode;
  location: Location;
  showDialog: boolean = false;

  constructor(private locationService: LocationService, private router: Router) { }

  ngOnInit() {
    this.columns = [
      { field: 'name', header: 'Name'},
      { field: 'typeId', header: 'Type'},
      { field: 'selectable', header: 'Selectable' },
      { field: 'actions', header: '' }
    ];

    this.items = [
      {label: 'Add', command: (event: any) => {this.addChildLocation(this.selectedLocationTreeNode.data)}},
      {label: 'Update', command: (event: any) => {this.updateLocation(this.selectedLocationTreeNode.data)}},
      {label: 'Delete', command: (event: any) => {this.deleteLocation(this.selectedLocationTreeNode.data)}}];

    this.locationService.getLocations().subscribe(locations => {
      this.locations = locations;
      this.locationTreeNodes = this.buildLocationTreeNodes(null);
    });

    this.locationService.getLocationTypes().subscribe(locationTypes => {
      this.locationTypes = locationTypes;
    });
  }

  addLocation() {
    this.router.navigateByUrl('/admin/locations/0').catch();
  }

  addChildLocation(location: Location) {
    this.location = new Location(null, location.campaignId, location.id, location.typeId, '');
    this.showDialog = true;
  }

  updateLocation(location: Location) {
    this.router.navigate(['admin/locations', location.id]).catch()
  }

  deleteLocation(location: Location) {
    this.locationService.deleteLocation(location.id).subscribe();
  }

  buildLocationTreeNodes(parentId: number) {
    let locationTreeNodes: LocationTreeNode[] = this.locations.filter(location => location.parentId === parentId).map(location => new LocationTreeNode(location, null, null, true, false));

    locationTreeNodes.forEach(locationTreeNode => {
      locationTreeNode.children = this.buildLocationTreeNodes(locationTreeNode.data.id);

      locationTreeNode.leaf = (locationTreeNode.children == undefined || locationTreeNode.children == null || locationTreeNode.children.length == 0);
    });

    return locationTreeNodes;
  }

  getSelectedLocationTreeNodeDataId(selectedLocationTreeNode: LocationTreeNode) {
    if (selectedLocationTreeNode != undefined) {
      return selectedLocationTreeNode.data.id;
    }

    return 0;
  }

  getLocationTypeName(locationTypeId: number): string {
    if (!!this.locationTypes && this.locationTypes.length > 0) {
      return this.locationTypes.find(locationType => locationType.id == locationTypeId).name;
    }

    return "Unknown";
  }

  disableDroppable(object: {node: LocationTreeNode, parent: LocationTreeNode}) {
    if (this.draggedLocationTreeNode == null) {
      return false;
    }

    return true;
  }

  dragStart(event: DragEvent, object: {node: LocationTreeNode, parent: LocationTreeNode}) {
    console.log("starting drag. event: " + event + ", object: " + object + ", location name: " + (object.node != undefined ? object.node.data.name : "undefined"))
    this.draggedLocationTreeNode = object.node;
    event.dataTransfer.effectAllowed = "move";
  }

  dragEnter(event: DragEvent, object: {node: LocationTreeNode, parent: LocationTreeNode}) {
    console.log("entering drag. event: " + event)

    // this currently DOES NOT WORK!!!
    event.dataTransfer.dropEffect = (this.draggedLocationTreeNode.data.id == object.node.data.id) ? "none" : "move";
    event.dataTransfer.effectAllowed = event.dataTransfer.dropEffect;
  }

  dragLeave(event: DragEvent) {
    console.log("leaving drag. event: " + event)
  }

  dragEnd(event: DragEvent) {
    console.log("ending drag. event: " + event)
    this.draggedLocationTreeNode = null;
  }

  drop(event: DragEvent, object: {node: LocationTreeNode, parent: LocationTreeNode}) {
    console.log("dropping. event: " + event)

    if (object.node.leaf) {
      console.log("cannot drop on a leaf!")
    }
    else {
      let draggedLocation: Location = this.draggedLocationTreeNode.data;

      draggedLocation.parentId = object.node.data.id;

      this.locationService.updateLocation(draggedLocation);
      this.locationTreeNodes = this.buildLocationTreeNodes(null);
      this.locationTreeNodes.filter((locationTreeNode) => locationTreeNode.data.id == object.node.data.id)
          .forEach(locationTreeNode => locationTreeNode.expanded = object.node.expanded);
      // TODO: don't forget to remove from previous parent node (if necessary)
    }
  }
}
