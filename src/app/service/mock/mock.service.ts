import {Injectable} from '@angular/core';
import {DeityType} from "admin/shared/deity-type";
import {LocationType} from "admin/shared/location-type";
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
import {Skill} from "admin/shared/skill";
import {Character} from "admin/shared/character";
import {RaceStat} from "admin/shared/race-stat";
import {RaceAge} from "admin/shared/race-age";
import {RaceMeasurement} from "admin/shared/race-measurement";
import {RaceComplexion} from "admin/shared/race-complexion";
import {RaceEyeColor} from "admin/shared/race-eye-color";
import {RaceHairColor} from "admin/shared/race-hair-color";
import {RaceSkinColor} from "admin/shared/race-skin-color";
import {CharacterStat} from "admin/shared/character-stat";
import {CharacterRace} from "admin/shared/character-race";
import {Campaign} from "admin/shared/campaign";
import {Deity} from "admin/shared/deity";
import {Location} from "admin/shared/location";

@Injectable({
  providedIn: 'root'
})
export class MockService implements InMemoryDbService {

  constructor() { }

  // elements must contain as least one element or the mock service is unable to determine the type when adding the an element
  createDb(reqInfo?: RequestInfo): {} | Observable<{}> {
    let campaigns: Campaign[] = [
      new Campaign(0,0,'System'),
      new Campaign(1,1,'Boo')
    ];

    let locations: Location[] = [new Location(0, 0, null, 0,"System", null),
                                 new Location(1, 0, null, 1,"Big Sky", null),
                                 new Location(2, 0, 1, 2,"Small Land", null)];

    let locationTypes: LocationType[] = [new LocationType(0, "World"),
                                         new LocationType(1, "Continent"),
                                         new LocationType(2, "Kingdom")];

    let deities: Deity[] = [new Deity(1, 0, null, 2,"Joe")];

    let deityTypes: DeityType[] = [new DeityType(0, "World"),
                                   new DeityType(1, "Pantheon"),
                                   new DeityType(2, "Demi-god")];

    let stats = [
      new Stat(1, 'Strength', 'STR', 'S',1),
      new Stat(2, 'Intelligence', 'INT', 'I', 1)
    ];

    let genders = [
      new Gender(0, 'Base'),
      new Gender(1, 'Male'),
      new Gender(2, 'Female'),
      new Gender(3, 'Invalid')
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
      new Race(1,
        'Human',
        true,
        null,
        [genders[1], genders[2]],
        [[new RaceStat(1, 1, 70, 100, 150), new RaceStat(2, 1, 70, 100, 150)]],
        [new RaceAge(1)],
        [new RaceMeasurement(1)],
        [new RaceComplexion(1, 1)],
        [new RaceEyeColor(1, 1)],
        [new RaceHairColor(1, 1)],
        [new RaceSkinColor(1, 1)],
        [100]),
      new Race(2, 'Felisi'),
      new Race(3, 'Charr', true, 2),
      new Race(4,
        'Aelvari',
        true,
        null,
        [genders[1], genders[2]],
        [[new RaceStat(1, 1, 65, 95, 145), new RaceStat(2, 1, 65, 95, 145)]],
        [new RaceAge(1)],
        [new RaceMeasurement(1)],
        [new RaceComplexion(1, 1)],
        [new RaceEyeColor(1, 1)],
        [new RaceHairColor(1, 1)],
        [new RaceSkinColor(1, 1)],
        [100]),
    ];

    let skills = [
      new Skill(1, 'Hunting', 'Hunting', 3, 3, true, null, 1, [1],  null, null, null),
      new Skill(2, 'Targeting', 'Targeting', 3, 3, true, 1, 1, [1,2],  null, null, null),
      new Skill(3, 'Partying', 'Partying', 3, 3, true, null, 1, [1,2],  [5], null, null),
      new Skill(4, 'Prerequisite Skill 1', 'PS1', 3, 3, true, null, 1, [1,2],  null, null, null),
      new Skill(5, 'Prerequisite Skill 2', 'PS2', 3, 3, true, null, 1, [1,2],  [7], null, null),
      new Skill(6, 'Prerequisite Skill 3', 'PS3', 3, 3, true, null, 1, [1,2],  [2,4], null, null),
      new Skill(7, 'Prerequisite Skill 4', 'PS4', 3, 3, true, null, 1, [1,2],  null, null, null)
    ];

    let characters = [
      new Character(
        1,
        'Bob',
        1,
        1,
        1,
         [1],
        [new CharacterStat(1, 1, 71), new CharacterStat(1, 2, 81)],
        [new CharacterRace(1, 1, 50), new CharacterRace(1, 4, 50)]),
      new Character(2, 'Dell', 1, 1, 1),
      new Character(3, 'Harriet', 2, 1, 2)
    ];

    return {
      campaigns: campaigns,
      locations: locations,
      locationTypes: locationTypes,
      deities: deities,
      deityTypes: deityTypes,
      stats: stats,
      genders: genders,
      complexions: complexions,
      eyeColors: eyeColors,
      hairColors: hairColors,
      skinColors: skinColors,
      races: races,
      skills: skills,
      characters: characters
    };
  }
}
