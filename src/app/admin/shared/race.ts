import {Gender} from "./gender";
import {RaceAge} from "./race-age";
import {RaceComplexion} from "./race-complexion";
import {RaceEyeColor} from "./race-eye-color";
import {RaceHairColor} from "./race-hair-color";
import {RaceSkinColor} from "./race-skin-color";
import {RaceStat} from "./race-stat";
import {RaceMeasurement} from "./race-measurement";
import {Stat} from "admin/shared/stat";
import {Complexion} from "admin/shared/complexion";
import {EyeColor} from "admin/shared/eye-color";

export class Race {
  constructor(
    public id: number,
    public name: string,
    public selectable: boolean = true,
    public parentId: number = null,
    public genders: Array<Gender> = [],
    public stats: Array<Array<RaceStat>> = [],
    public ages: Array<RaceAge> = [],
    public measurements: Array<RaceMeasurement> = [],
    public complexions: Array<RaceComplexion> = [],
    public eyeColors: Array<RaceEyeColor> = [],
    public hairColors: Array<RaceHairColor> = [],
    public skinColors: Array<RaceSkinColor> = []
  ) {}

  static initialize(race: Race,
                    genderId: number,
                    stats: Array<Stat>,
                    complexions: Array<Complexion> = [],
                    eyeColors: Array<EyeColor> = []): Race {

    if (!race.stats) {
      race.stats = [];
    }

    if (!race.stats[0]) {
      this.initRaceStats(race, stats);
    }

    if (!race.ages) {
      race.ages = [];
    }

    if (!race.ages[genderId]) {
      race.ages[genderId] = new RaceAge(genderId);
    }

    if (!race.measurements) {
      race.measurements = [];
    }

    if (!race.measurements[genderId]) {
      race.measurements.push(new RaceMeasurement(genderId));
    }

    if (!race.complexions) {
      race.complexions = [];
    }

    if (race.complexions.filter(complexion => complexion.genderId === genderId).length == 0) {
      if (complexions.length > 0) {
        race.complexions.push(new RaceComplexion(complexions[0].id, genderId));
      }
    }

    if (!race.eyeColors) {
      race.eyeColors = [];
    }

    if (race.eyeColors.filter(eyeColor => eyeColor.genderId === genderId).length == 0) {
      if (eyeColors.length > 0) {
        race.eyeColors.push(new RaceEyeColor(eyeColors[0].id, genderId));
      }
    }

    return race;
  }


  static initRaceStats(race: Race, stats: Array<Stat>) {
    race.stats[0] = [];

    let statIndex: number = 0;

    stats.forEach(stat => race.stats[0][statIndex++] = this.getRaceStat(stat.id))
  }

  static getRaceStat(statId: number): RaceStat {
    return new RaceStat(statId, 0);
  }

  static isInvalid(race: Race): boolean {
    return !race.name || race.name.length == 0 || this.isGenderInvalid(race, 0) || race.genders.map(gender => this.isGenderInvalid(race, gender.id)).filter(invalid => invalid).length > 0;
  }

  static isGenderInvalid(race: Race, genderId: number) {
    console.log('gender: ' + genderId);
    console.log('stats invalid: ' + this.areStatsInvalid(race, genderId));
    console.log('ages invalid: ' + this.areAgesInvalid(race, genderId));
    console.log('measurements invalid: ' + this.areMeasurementsInvalid(race, genderId));
    console.log('attributes invalid: ' + this.areAttributesInvalid(race, genderId));

    return (genderId !== 0 && race.genders.filter(gender => gender.id === genderId).length == 0) ||
      this.areStatsInvalid(race, genderId) ||
      this.areAgesInvalid(race, genderId) ||
      this.areMeasurementsInvalid(race, genderId) ||
      this.areAttributesInvalid(race, genderId);
  }

  static areStatsInvalid(race: Race, genderId: number): boolean {
    for (let index = 0; index < race.stats.length; index++) {
      let stats: Array<RaceStat> = race.stats[index];

      if (stats.filter(raceStat => raceStat.genderId === genderId).length > 0) {
        for (let statIndex = 0; statIndex < stats.length; statIndex++) {
          let raceStat: RaceStat = stats[statIndex];

          if (raceStat.low <= 0 || raceStat.high <= 0 || raceStat.max <= 0 || raceStat.low >= raceStat.high || raceStat.high >= raceStat.max) {
            console.log('internal stats invalid true');
            return true;
          }
        }

        console.log('internal stats invalid false');
        return false;
      }
    }

    console.log('internal stats invalid true (no gender stats)');
    return true;
  }

  static areAgesInvalid(race: Race, genderId: number): boolean {
    if (race.ages.filter(raceAge => raceAge.genderId === genderId).length > 0) {
      let raceAge: RaceAge = race.ages.filter(age => age.genderId === genderId)[0];

      return raceAge.child <= 0 || raceAge.child >= raceAge.teen ||
        raceAge.teen >= raceAge.adult ||
        raceAge.adult >= raceAge.mature ||
        raceAge.mature >= raceAge.middle ||
        raceAge.middle >=raceAge.old ||
        raceAge.old >= raceAge.venerable ||
        raceAge.venerable >= raceAge.max;
    }

    return true;
  }

  static areMeasurementsInvalid(race: Race, genderId: number): boolean {
    if (race.measurements.filter(measurement => measurement.genderId === genderId).length > 0) {
      let raceMeasurement: RaceMeasurement = race.measurements.filter(measurement => measurement.genderId === genderId)[0];

      return raceMeasurement.height.min <= 0 || raceMeasurement.height.max <= 0 || raceMeasurement.height.min > raceMeasurement.height.max ||
        raceMeasurement.weight.min <= 0 || raceMeasurement.weight.max <= 0 || raceMeasurement.weight.min > raceMeasurement.weight.max;
    }

    return true;
  }

  static areAttributesInvalid(race: Race, genderId: number): boolean {
    return race.complexions.filter(complexion => complexion.genderId === genderId).length == 0 ||
      race.eyeColors.filter(eyeColor => eyeColor.genderId === genderId).length == 0 ||
      race.hairColors.filter(hairColor => hairColor.genderId === genderId).length == 0 ||
      race.skinColors.filter(skinColor => skinColor.genderId === genderId).length == 0
  }
}
