import { Injectable } from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {Location} from "admin/shared/location";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  locations: Array<Location> = [];

  constructor(private http: HttpClient) {
    this.updateCache();
  }

  getLocationsCache(): Array<Location> {
    return this.locations;
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

  updateCache() {
    if (!!this.getLocations) {
      this.getLocations().subscribe(locations => this.locations = locations);
    }
  }
}
