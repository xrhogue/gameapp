import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Observable} from "rxjs/internal/Observable";
import {RequestInfo} from "angular-in-memory-web-api/interfaces";
import {Complexion} from "../../admin/shared/complexion";
import {EyeColor} from "../../admin/shared/eye-color";
import {HairColor} from "../../admin/shared/hair-color";
import {SkinColor} from "../../admin/shared/skin-color";
import {Race} from "../../admin/shared/race";
import {Gender} from "../../admin/shared/gender";
import {Stat} from "../../admin/shared/stat";

@Injectable({
  providedIn: 'root'
})
export class MockService implements InMemoryDbService {

  constructor() { }

  createDb(reqInfo?: RequestInfo): {} | Observable<{}> | Promise<{}> {
    let stats = [
      new Stat(1, 'Strength', 'STR', 'S',1),
      new Stat(2, 'Intelligence', 'INT', 'I', 1)
    ];

    let genders = [
      new Gender(0, 'Base'),
      new Gender(1, 'Male'),
      new Gender(2, 'Female')
    ];

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

    let races = [
      new Race(1, 'Human', true, null, null, null, null, null, null, null, null, null, null),
      new Race(2, 'Felisi', true, null, null, null, null, null, null, null, null, null, null),
      new Race(3, 'Charr', true, 2, null, null, null, null, null, null, null, null, null)
    ];

    return {
      stats: stats,
      genders: genders,
      complexions: complexions,
      eyeColors: eyeColors,
      hairColors: hairColors,
      skinColors: skinColors,
      races: races
    };
  }
}
