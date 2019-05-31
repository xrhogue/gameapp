import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CharacterSkillTreeNode} from "admin/shared/character-skill-tree-node";
import {LocationType} from "admin/shared/location-type";
import {MenuItem} from 'primeng/api';
import {Location} from 'admin/shared/location';
import {LocationService} from '../../../service/location/location.service';
import {Router} from '@angular/router';
import {LocationTreeNode} from 'admin/shared/location-tree-node';
import {Column} from 'admin/shared/column';
import {UtilService} from "../../../shared/services/util/util.service";

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

  constructor(private locationService: LocationService, private router: Router, private utilService: UtilService) { }

  ngOnInit() {
    this.columns = [
      { field: 'name', header: 'Name'},
      { field: 'typeId', header: 'Type'},
      { field: 'selectable', header: 'Selectable' },
      { field: 'actions', header: '' }
    ];

    this.items = [
      {label: 'Add Child', command: (event: any) => {this.addChildLocation(this.selectedLocationTreeNode.data)}},
      {label: 'Duplicate', command: (event: any) => {this.duplicateLocation(this.selectedLocationTreeNode.data)}},
      {label: 'Update', command: (event: any) => {this.updateLocation(this.selectedLocationTreeNode.data)}},
      {label: 'Delete', command: (event: any) => {this.deleteLocation(this.selectedLocationTreeNode.data)}},
      {label: 'Move to Root', command: (event: any) => {this.moveLocation(this.selectedLocationTreeNode.data)}}];

    this.locationService.getLocations().subscribe(locations => {
      this.locations = locations.filter(location => !!location.id);
      this.locationTreeNodes = this.buildLocationTreeNodes(null);
    });

    this.locationService.getLocationTypes().subscribe(locationTypes => {
      this.locationTypes = locationTypes;
    });
  }

  addLocation() {
    this.router.navigateByUrl('/admin/locations/0').catch();
  }

  duplicateLocation(location: Location) {
    this.location = new Location(null, location.campaignId, location.parentId, location.typeId, '');
    this.showDialog = true;
  }

  addChildLocation(location: Location) {
    this.location = new Location(null, location.campaignId, location.id, location.typeId, '');
    this.showDialog = true;
  }

  updateLocations(location: Location) {
    if (location.parentId == null) {
      this.locationTreeNodes.push(new LocationTreeNode(location, null, null, null, true, false));
    }
    else {
      let locationTreeNode: LocationTreeNode = this.findLocationTreeNode(this.locationTreeNodes, location.parentId);

      if (!locationTreeNode.children) {
        locationTreeNode.children = [];
      }

      locationTreeNode.children.push(new LocationTreeNode(location, locationTreeNode, null,null, true, false));
      locationTreeNode.leaf = false;
      locationTreeNode.expanded = true;
    }

    this.locationService.getLocations().subscribe(locations => {
      this.locations = locations;
    });

    this.locationService.getLocationTypes().subscribe(locationTypes => {
      this.locationTypes = locationTypes;
    });

    // this is to refresh the UI after all the node updates; may be specific to the PrimeNG treetable (they may need to fix something on their side)
    this.locationTreeNodes = [...this.locationTreeNodes];
  }

  updateLocation(location: Location) {
    this.router.navigate(['admin/locations', location.id]).catch()
  }

  deleteLocation(location: Location) {
    this.locationService.deleteLocation(location.id).subscribe();
  }

  moveLocation(location: Location) {
    let locationTreeNode: LocationTreeNode = this.findLocationTreeNode(this.locationTreeNodes, location.id);
    let parentLocationTreeNode: LocationTreeNode = locationTreeNode.parent;

    if (!!parentLocationTreeNode) {
      this.utilService.deleteObjectFromArray(parentLocationTreeNode.children, location.id, this.comparator);

      if (parentLocationTreeNode.children.length == 0) {
        parentLocationTreeNode.leaf = true;
      }

      parentLocationTreeNode.expanded = false;
      locationTreeNode.data.parentId = null;
      locationTreeNode.parent = null;
    }

    this.locationTreeNodes.push(locationTreeNode);
    this.locationTreeNodes = [...this.locationTreeNodes];
  }

  buildLocationTreeNodes(parentId: number) {
    let locationTreeNodes: LocationTreeNode[] = this.locations.filter(location => location.parentId === parentId).map(location => new LocationTreeNode(location, null, null, null, true, false));

    locationTreeNodes.forEach(locationTreeNode => {
      locationTreeNode.children = this.buildLocationTreeNodes(locationTreeNode.data.id);

      locationTreeNode.leaf = (locationTreeNode.children == undefined || locationTreeNode.children == null || locationTreeNode.children.length == 0);
    });

    return locationTreeNodes;
  }

  findLocationTreeNode(locationTreeNodes: Array<LocationTreeNode>, id: number): LocationTreeNode {
    let foundLocationTreeNode: LocationTreeNode = locationTreeNodes.find((locationTreeNode) => locationTreeNode.data.id === id);

    if (!!foundLocationTreeNode) {
      return foundLocationTreeNode;
    }

    locationTreeNodes.forEach(locationTreeNode => {
      let childLocationTreeNode: LocationTreeNode = this.findLocationTreeNode(locationTreeNode.children, id);

      if (!!childLocationTreeNode) {
        foundLocationTreeNode = childLocationTreeNode;
      }
    });

    return foundLocationTreeNode;
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

  dragStart(event: DragEvent, object: {node: LocationTreeNode}) {
    console.log("starting drag. location name: " + (object.node != undefined ? object.node.data.name : "undefined"));
    this.draggedLocationTreeNode = object.node;
  }

  dragEnter(event: DragEvent, object: {node: LocationTreeNode, parent: LocationTreeNode}) {
    console.log("entering drag (node: " + (!!object.node ? object.node.data.name : "null") + ", parent: " + (!!object.parent ? object.parent.data.name : "null") + ")");
  }

  dragLeave(event: DragEvent) {
    console.log("leaving drag");
  }

  dragEnd(event: DragEvent) {
    console.log("ending drag");
    this.draggedLocationTreeNode = null;
  }

  drop(event: DragEvent, object: {node: LocationTreeNode}) {
    console.log("dropping on parent: " + object.node.data.name);

    let dropParentLocationTreeNode: LocationTreeNode = object.node;
    let draggedLocation: Location = this.draggedLocationTreeNode.data;
    let previousParentId: number = draggedLocation.parentId;

    if (draggedLocation.id == dropParentLocationTreeNode.data.id || draggedLocation.parentId == dropParentLocationTreeNode.data.id || dropParentLocationTreeNode.data.id == 0) {
      return;
    }

    draggedLocation.parentId = dropParentLocationTreeNode.data.id;

    this.locationService.updateLocation(draggedLocation).subscribe(location => {
      // remove references from previous parent
      if (!!previousParentId) {
        let previousParentLocationTreeNode: LocationTreeNode = this.findLocationTreeNode(this.locationTreeNodes, previousParentId);

        this.utilService.deleteObjectFromArray(previousParentLocationTreeNode.children, draggedLocation.id, this.comparator);

        if (previousParentLocationTreeNode.children.length === 0) {
          previousParentLocationTreeNode.leaf = true;
          previousParentLocationTreeNode.expanded = false;
        }
      }
      else {
        this.utilService.deleteObjectFromArray(this.locationTreeNodes, draggedLocation.id, this.comparator);
      }

      if (dropParentLocationTreeNode.leaf) {
        dropParentLocationTreeNode.leaf = false;
      }

      dropParentLocationTreeNode.expanded = true;

      dropParentLocationTreeNode.children.push(this.draggedLocationTreeNode);
      this.draggedLocationTreeNode.parent = dropParentLocationTreeNode;

      // this is to refresh the UI after all the node updates; may be specific to the PrimeNG treetable (they may need to fix something on their side)
      this.locationTreeNodes = [...this.locationTreeNodes];
    });
  }

  comparator(locationTreeNode: LocationTreeNode, locationId: number): boolean {
    return locationTreeNode.data.id === locationId;
  }
}
