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
      new Complexion(1, 'Tan'),
      new Complexion(2, 'Dark')
    ];

    let eyeColors = [
      new EyeColor(1, 'Blue'),
      new EyeColor(2, 'Green')
    ];

    let hairColors = [
      new HairColor(1, 'Black'),
      new HairColor(2, 'Red')
    ];

    let skinColors = [
      new SkinColor(1, 'Orange'),
      new SkinColor(2, 'Purple')
    ];

    let races = [
      new Race(1, 'Human'),
      new Race(2, 'Felisi'),
      new Race(3, 'Charr', true, 2)
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
