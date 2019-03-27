import { Injectable } from '@angular/core';
import {DeityType} from "admin/shared/deity-type";
import {Observable} from "rxjs/internal/Observable";
import {HttpClient} from "@angular/common/http";
import {Deity} from "admin/shared/deity";

@Injectable({
  providedIn: 'root'
})
export class DeityService {

  deities: Array<Deity> = [];
  deityTypes: Array<DeityType> = [];

  constructor(private http: HttpClient) {
    this.updateCache();
    this.updateTypeCache();
  }

  getDeitiesCache(): Array<Deity> {
    return this.deities;
  }

  getDeityTypesCache(): Array<DeityType> {
    return this.deityTypes;
  }

  getDeities(): Observable<Array<Deity>> {
    return this.http.get<Array<Deity>>("http://localhost:8888/admin/deities");
  }

  getDeity(deityId: number): Observable<Deity> {
    return this.http.get<Deity>("http://localhost:8888/admin/deities/" + deityId);
  }

  addDeity(deity: Deity): Observable<Deity> {
    setTimeout(this.updateCache, 500);

    return this.http.post<Deity>("http://localhost:8888/admin/deities", deity);
  }

  updateDeity(deity: Deity): Observable<Deity> {
    setTimeout(this.updateCache, 500);

    return this.http.put<Deity>("http://localhost:8888/admin/deities", deity);
  }

  deleteDeity(deityId: number): Observable<Deity> {
    setTimeout(this.updateCache, 500);

    return this.http.delete<Deity>("http://localhost:8888/admin/deities/" + deityId);
  }

  getDeityTypes(): Observable<Array<DeityType>> {
    return this.http.get<Array<DeityType>>("http://localhost:8888/admin/deityTypes");
  }

  getDeityType(deityTypeId: number): Observable<DeityType> {
    return this.http.get<DeityType>("http://localhost:8888/admin/deityTypes/" + deityTypeId);
  }

  addDeityType(deityType: DeityType): Observable<DeityType> {
    setTimeout(this.updateCache, 500);

    return this.http.post<DeityType>("http://localhost:8888/admin/deityTypes", deityType);
  }

  updateDeityType(deityType: DeityType): Observable<DeityType> {
    setTimeout(this.updateCache, 500);

    return this.http.put<DeityType>("http://localhost:8888/admin/deityTypes", deityType);
  }

  deleteDeityType(deityTypeId: number): Observable<DeityType> {
    setTimeout(this.updateCache, 500);

    return this.http.delete<DeityType>("http://localhost:8888/admin/deityTypes/" + deityTypeId);
  }

  isUnique(deity: Deity, fieldName: String, value: String) {
    this.getDeities().subscribe(deities => this.deities = deities);

    if (!!this.deities) {
      for (let deityKey in this.deities) {
        if (this.deities[deityKey].id != deity.id &&
            ((fieldName === "name" && this.deities[deityKey].name === value))) {
          return false;
        }
      }
    }

    return true;
  }

  updateCache() {
    if (!!this.getDeities) {
      this.getDeities().subscribe(deities => this.deities = deities);
    }
  }

  updateTypeCache() {
    if (!!this.getDeityTypes) {
      this.getDeityTypes().subscribe(deityTypes => this.deityTypes = deityTypes);
    }
  }
}
