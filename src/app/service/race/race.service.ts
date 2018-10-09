import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {Complexion} from "../../admin/shared/complexion";
import {EyeColor} from "../../admin/shared/eye-color";
import {HairColor} from "../../admin/shared/hair-color";
import {SkinColor} from "../../admin/shared/skin-color";

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  constructor(private http: HttpClient) {
  }

  getComplexions(): Observable<Array<Complexion>> {
    return <Observable<Array<Complexion>>> this.http
      .get("http://localhost:8888/admin/complexions");
  }

  getEyeColors(): Observable<Array<EyeColor>> {
    return <Observable<Array<EyeColor>>> this.http
      .get("http://localhost:8888/admin/eyeColors");
  }

  getHairColors(): Observable<Array<HairColor>> {
    return <Observable<Array<HairColor>>> this.http
      .get("http://localhost:8888/admin/hairColors");
  }

  getSkinColors(): Observable<Array<SkinColor>> {
    return <Observable<Array<SkinColor>>> this.http
      .get("http://localhost:8888/admin/skinColors");
  }
}
