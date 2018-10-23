import {Complexion} from "./complexion";
import {HairColor} from "./hair-color";
import {SkinColor} from "./skin-color";
import {EyeColor} from "./eye-color";
import {Gender} from "./gender";

export class RaceGenderAttributes {
  constructor(
    public gender: Gender,
    public complexions: Array<Complexion>,
    public eyeColors: Array<EyeColor>,
    public hairColors: Array<HairColor>,
    public skinColors: Array<SkinColor>,
    public heights: Array<number>,
    public weights: Array<number>,
    public ages: Array<number>
  ) {}
}
