import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {Complexion} from "../../admin/shared/complexion";
import {EyeColor} from "../../admin/shared/eye-color";
import {HairColor} from "../../admin/shared/hair-color";
import {SkinColor} from "../../admin/shared/skin-color";

import {Attribute} from "../../admin/shared/attribute";
import {Gender} from "../../admin/shared/gender";
import {Race} from "../../admin/shared/race";

import {catchError, map} from 'rxjs/operators'
import {throwError} from "rxjs/internal/observable/throwError";

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  races: Array<Race>;
  complexions: Array<Complexion>;
  eyeColors: Array<EyeColor>;
  hairColors: Array<HairColor>;
  skinColors: Array<SkinColor>;

  constructor(private http: HttpClient) {
    this.updateCache();
  }

  getComplexionsCache() : Array<Complexion> {
    return this.complexions;
  }

  getEyeColorsCache() : Array<EyeColor> {
    return this.eyeColors;
  }

  getHairColorsCache() : Array<HairColor> {
    return this.hairColors;
  }

  getSkinColorsCache() : Array<SkinColor> {
    return this.skinColors;
  }

  getRaces(): Observable<Array<Race>> {
    return this.http.get<Array<Race>>("http://localhost:8888/admin/races");
  }

  getRace(raceId: number): Observable<Race> {
    return this.http.get<Race>("http://localhost:8888/admin/races/" + raceId);
  }

  addRace(race: Race): Observable<Race> {
    return this.http.post<Race>("http://localhost:8888/admin/races", race);
  }

  updateRace(race: Race): Observable<Race> {
    return this.http.put<Race>("http://localhost:8888/admin/races", race);
  }

  deleteRace(raceId: number): Observable<Race> {
    return this.http.delete<Race>("http://localhost:8888/admin/races/" + raceId);
  }

  getGenders(): Observable<Array<Gender>> {
    return <Observable<Array<Gender>>> this.http.get("http://localhost:8888/admin/genders")
      .pipe(map(data=>this.sort(data)));
  }

  addGender(gender: Gender): Observable<{}> {
    return this.http.post("http://localhost:8888/admin/genders", gender);
  }

  deleteGender(genderId: number): Observable<{}> {
    return this.http.delete("http://localhost:8888/admin/genders/" + genderId);
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

  sort(data: Object): Array<Attribute>
  {
    let raceAttributes: Array<Attribute> = <Array<Attribute>> data;

    raceAttributes.sort((a, b) => {
      return a.name < b.name ? -1 : 1;
    });

    return raceAttributes;
  }

  isUnique(race: Race, fieldName: string, value: string) {
    this.getRaces().subscribe(races => this.races = races);

    if (!!this.races) {
      for (let raceKey in this.races) {
        if (this.races[raceKey].id != race.id &&
          ((fieldName === "name" && this.races[raceKey].name === value))) {
          return false;
        }
      }
    }

    return true;
  }

  private handleError (error: any) {
    // In a real world app, we might send the error to remote logging infrastructure
    // and reformat for user consumption
    console.error(error); // log to console instead
    return throwError(error);
  }

  updateCache() {
    if (!!this.getComplexions()) {
      this.getComplexions().subscribe(complexions => this.complexions = complexions);
    }

    if (!!this.getEyeColors()) {
      this.getEyeColors().subscribe(eyeColors => this.eyeColors = eyeColors);
    }

    if (!!this.getHairColors()) {
      this.getHairColors().subscribe(hairColors => this.hairColors = hairColors);
    }

    if (!!this.getSkinColors()) {
      this.getSkinColors().subscribe(skinColors => this.skinColors = skinColors);
    }
  }
}
