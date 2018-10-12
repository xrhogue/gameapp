import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {Complexion} from "../../admin/shared/complexion";
import {EyeColor} from "../../admin/shared/eye-color";
import {HairColor} from "../../admin/shared/hair-color";
import {SkinColor} from "../../admin/shared/skin-color";

import { map } from 'rxjs/operators'
import {RaceAttribute} from "../../admin/shared/race-attribute";

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  constructor(private http: HttpClient) {
  }

  getComplexions(): Observable<Array<Complexion>> {
    return <Observable<Array<Complexion>>> this.http.get("http://localhost:8888/admin/complexions")
      .pipe(map(data=>this.sort(data)));
  }

  addComplexion(complexion: Complexion): Observable<{}> {
    return this.http.post("http://localhost:8888/admin/complexions", complexion);
  }

  deleteComplexion(complexionId: number): Observable<{}> {
    return this.http.delete("http://localhost:8888/admin/complexions/" + complexionId);
  }

  getEyeColors(): Observable<Array<EyeColor>> {
    return <Observable<Array<EyeColor>>> this.http.get("http://localhost:8888/admin/eyeColors")
      .pipe(map(data=>this.sort(data)));
  }

  addEyeColor(eyeColor: EyeColor): Observable<{}> {
    return this.http.post("http://localhost:8888/admin/eyeColors", eyeColor);
  }

  deleteEyeColor(eyeColorId: number): Observable<{}> {
    return this.http.delete("http://localhost:8888/admin/eyeColors/" + eyeColorId);
  }

  getHairColors(): Observable<Array<HairColor>> {
    return <Observable<Array<HairColor>>> this.http.get("http://localhost:8888/admin/hairColors")
      .pipe(map(data=>this.sort(data)));
  }

  addHairColor(hairColor: HairColor): Observable<{}> {
    return this.http.post("http://localhost:8888/admin/hairColors", hairColor);
  }

  deleteHairColor(hairColorId: number): Observable<{}> {
    return this.http.delete("http://localhost:8888/admin/hairColors/" + hairColorId);
  }

  getSkinColors(): Observable<Array<SkinColor>> {
    return <Observable<Array<SkinColor>>> this.http.get("http://localhost:8888/admin/skinColors")
      .pipe(map(data=>this.sort(data)));
  }

  addSkinColor(skinColor: SkinColor): Observable<{}> {
    return this.http.post("http://localhost:8888/admin/skinColors", skinColor);
  }

  deleteSkinColor(skinColorId: number): Observable<{}> {
    return this.http.delete("http://localhost:8888/admin/skinColors/" + skinColorId);
  }

  sort(data: Object): Array<RaceAttribute>
  {
    let raceAttributes: Array<RaceAttribute> = <Array<RaceAttribute>> data;

    raceAttributes.sort((a, b) => {
      return a.name < b.name ? -1 : 1;
    });

    return raceAttributes;
  }
}
