import {Gender} from "./gender";
import {RaceAge} from "./race-age";
import {RaceComplexion} from "./race-complexion";
import {RaceEyeColor} from "./race-eye-color";
import {RaceHairColor} from "./race-hair-color";
import {RaceSkinColor} from "./race-skin-color";
import {RaceStat} from "./race-stat";
import {RaceMeasurement} from "./race-measurement";

export class Race {
  constructor(
    public id: number,
    public name: string,
    public selectable: boolean = true,
    public parentId: number = 0,
    public genders: Array<Gender> = [],
    public stats: Array<Array<RaceStat>> = [],
    public ages: Array<RaceAge> = [],
    public measurements: Array<RaceMeasurement> = [],
    public complexions: Array<RaceComplexion> = [],
    public eyeColors: Array<RaceEyeColor> = [],
    public hairColors: Array<RaceHairColor> = [],
    public skinColors: Array<RaceSkinColor> = []
  ) {}
}
