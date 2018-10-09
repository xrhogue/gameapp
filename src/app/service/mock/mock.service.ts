import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Observable} from "rxjs/internal/Observable";
import {RequestInfo} from "angular-in-memory-web-api/interfaces";
import {Complexion} from "../../admin/shared/complexion";
import {EyeColor} from "../../admin/shared/eye-color";
import {HairColor} from "../../admin/shared/hair-color";
import {SkinColor} from "../../admin/shared/skin-color";

@Injectable({
  providedIn: 'root'
})
export class MockService implements InMemoryDbService {

  constructor() { }

  createDb(reqInfo?: RequestInfo): {} | Observable<{}> | Promise<{}> {
    let complexions = [
      new Complexion(1, 'tan'),
      new Complexion(2, 'dark')
    ];

    let eyeColors = [
      new EyeColor(1, 'blue'),
      new EyeColor(2, 'green')
    ];

    let hairColors = [
      new HairColor(1, 'black'),
      new HairColor(2, 'red')
    ];

    let skinColors = [
      new SkinColor(1, 'orange'),
      new SkinColor(2, 'purple')
    ];

    return {
      complexions: complexions,
      eyeColors: eyeColors,
      hairColors: hairColors,
      skinColors: skinColors
    };
  }
}
