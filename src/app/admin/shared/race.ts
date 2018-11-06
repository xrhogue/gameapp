import {Gender} from "./gender";
import {RaceAge} from "./race-age";
import {RaceHeight} from "./race-height";
import {RaceWeight} from "./race-weight";
import {RaceComplexion} from "./race-complexion";
import {RaceEyeColor} from "./race-eye-color";
import {RaceHairColor} from "./race-hair-color";
import {RaceSkinColor} from "./race-skin-color";
import {RaceStat} from "./race-stat";

export class Race {
  constructor(
    public id: number,
    public name: string,
    public selectable: boolean,
    public parentId: number,
    public genders: Array<Gender>,
    public stats: Array<Array<RaceStat>>,
    public ages: Array<RaceAge>,
    public heights: Array<RaceHeight>,
    public weights: Array<RaceWeight>,
    public complexions: Array<RaceComplexion>,
    public eyeColors: Array<RaceEyeColor>,
    public hairColors: Array<RaceHairColor>,
    public skinColors: Array<RaceSkinColor>
  ) {}
}
