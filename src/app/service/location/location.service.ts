import { Injectable } from '@angular/core';
import {LocationType} from "admin/shared/location-type";
import {Observable} from "rxjs/internal/Observable";
import {Location} from "admin/shared/location";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  locations: Array<Location> = [];
  locationTypes: Array<LocationType> = [];

  constructor(private http: HttpClient) {
    this.updateCache();
    this.updateTypeCache();
  }

  getLocationsCache(): Array<Location> {
    return this.locations;
  }

  getLocationTypesCache(): Array<LocationType> {
    return this.locationTypes;
  }

  getLocations(): Observable<Array<Location>> {
    return this.http.get<Array<Location>>("http://localhost:8888/admin/locations");
  }

  getLocation(locationId: number): Observable<Location> {
    return this.http.get<Location>("http://localhost:8888/admin/locations/" + locationId);
  }

  addLocation(location: Location): Observable<Location> {
    setTimeout(this.updateCache, 500);

    return this.http.post<Location>("http://localhost:8888/admin/locations", location);
  }

  updateLocation(location: Location): Observable<Location> {
    setTimeout(this.updateCache, 500);

    return this.http.put<Location>("http://localhost:8888/admin/locations", location);
  }

  deleteLocation(locationId: number): Observable<Location> {
    setTimeout(this.updateCache, 500);

    return this.http.delete<Location>("http://localhost:8888/admin/locations/" + locationId);
  }

  getLocationTypes(): Observable<Array<LocationType>> {
    return this.http.get<Array<LocationType>>("http://localhost:8888/admin/locationTypes");
  }

  getLocationType(locationTypeId: number): Observable<LocationType> {
    return this.http.get<LocationType>("http://localhost:8888/admin/locationTypes/" + locationTypeId);
  }

  addLocationType(locationType: LocationType): Observable<LocationType> {
    setTimeout(this.updateCache, 500);

    return this.http.post<LocationType>("http://localhost:8888/admin/locationTypes", locationType);
  }

  updateLocationType(locationType: LocationType): Observable<LocationType> {
    setTimeout(this.updateCache, 500);

    return this.http.put<LocationType>("http://localhost:8888/admin/locationTypes", locationType);
  }

  deleteLocationType(locationTypeId: number): Observable<LocationType> {
    setTimeout(this.updateCache, 500);

    return this.http.delete<LocationType>("http://localhost:8888/admin/locationTypes/" + locationTypeId);
  }

  isUnique(location: Location, fieldName: String, value: String) {
    this.getLocations().subscribe(locations => this.locations = locations);

    if (!!this.locations) {
      for (let locationKey in this.locations) {
        if (this.locations[locationKey].id != location.id &&
            ((fieldName === "name" && this.locations[locationKey].name === value))) {
          return false;
        }
      }
    }

    return true;
  }

  isTypeUnique(locationType: LocationType, fieldName: String, value: String) {
    this.getLocations().subscribe(locationTypes => this.locationTypes = locationTypes);

    if (!!this.locationTypes) {
      for (let locationTypeKey in this.locationTypes) {
        if (this.locationTypes[locationTypeKey].id != locationType.id &&
            ((fieldName === "name" && this.locations[locationTypeKey].name === value))) {
          return false;
        }
      }
    }

    return true;
  }

  updateCache() {
    if (!!this.getLocations) {
      this.getLocations().subscribe(locations => this.locations = locations);
    }
  }

  updateTypeCache() {
    if (!!this.getLocationTypes) {
      this.getLocationTypes().subscribe(locationTypes => this.locationTypes = locationTypes);
    }
  }
}
