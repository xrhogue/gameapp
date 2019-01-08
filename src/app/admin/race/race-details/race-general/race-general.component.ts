import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RaceService} from "../../../../service/race/race.service";
import {NgForm} from "@angular/forms";
import {Race} from "../../../shared/race";
import {UtilService} from "../../../../shared/services/util/util.service";
import {Gender} from "../../../shared/gender";
import {RaceEyeColor} from "admin/shared/race-eye-color";
import {RaceHairColor} from "admin/shared/race-hair-color";
import {RaceSkinColor} from "admin/shared/race-skin-color";
import {RaceComplexion} from "admin/shared/race-complexion";
import {RaceMeasurement} from "admin/shared/race-measurement";
import {Height} from "admin/shared/height";
import {Weight} from "admin/shared/weight";
import {RaceStat} from "admin/shared/race-stat";
import {RaceAge} from "admin/shared/race-age";
import {Dialog} from "primeng/dialog";

@Component({
  selector: 'app-race-general',
  templateUrl: './race-general.component.html',
  styleUrls: ['./race-general.component.scss']
})
export class RaceGeneralComponent implements OnInit {

  id: number;
  genders: Array<Gender>;
  selectedGenders: Array<Gender>;
  //@ViewChild('gInput') gInput;
  @Input() race: Race;
  @Output() raceChange: EventEmitter<Race> = new EventEmitter<Race>();
  @Output() genderUpdate: EventEmitter<any> = new EventEmitter<any>();
  JSON: JSON;
  fieldStates: {name: boolean, genders: boolean} = {name: false, genders: false};
  isInteger:(number: string)=>boolean;
  @Input() ngForm: NgForm;
  showDialog: boolean = false;
  newGender: string = "";

  constructor(private route: ActivatedRoute, private router: Router, private raceService: RaceService, private utilService: UtilService) {
    this.route.params.subscribe( params => this.id = params.id );
    this.JSON = JSON;
    this.isInteger = utilService.isInteger;
  }

  ngOnInit() {
    this.raceService.getGenders().subscribe(genders => this.genders = genders.filter(gender => gender.id !== 0));

    this.selectedGenders = this.race.genders;

    this.initInvalid();
  }

  initInvalid() {
    if (!this.race.name || this.race.name.length === 0) {
      this.fieldStates.name = true;
    }

    if (!this.selectedGenders || this.selectedGenders.length == 0) {
      this.fieldStates.genders = true;
    }
  }

  isInvalid() {
    return this.fieldStates.name || this.fieldStates.genders;
  }

  addGender(event: Event) {
    this.raceService.addGender(new Gender(null, this.newGender)).subscribe(data => {
      this.newGender = '';
      this.raceService.getGenders().subscribe(genders => this.genders = genders.filter(gender => gender.id !== 0));
    });
  }

  updateGenders() {
    this.race.genders = Array.from(this.selectedGenders);
    this.initSelectedGenders();
    this.genderUpdate.emit();
  }

  updateInvalid(field: string, invalid: boolean) {
    this.fieldStates[field] = invalid;
  }

  initSelectedGenders() {
    this.race.genders.map(gender => this.initSelectedGender(gender.id));
  }

  initSelectedGender(genderId: number) {
    let stats: Array<RaceStat> = this.race.stats.reduce((stats, stat) => stats.concat(stat));

    if (stats.filter(stat => stat.genderId === genderId).length == 0) {
      let raceStats: Array<RaceStat> = [];

      stats.filter(stat => stat.genderId === 0).forEach(stat => raceStats.push(new RaceStat(stat.statId, genderId, stat.low, stat.high, stat.max)));

      this.race.stats.push(raceStats);
    }

    if (this.race.ages.filter(age => age.genderId === genderId).length == 0) {
      this.race.ages.filter(age => age.genderId === 0).forEach(age => this.race.ages[genderId] = new RaceAge(genderId, age.child, age.teen, age.adult, age.mature, age.middle, age.old, age.venerable, age.max, age.immortal));
    }

    if (this.race.complexions.filter(complexion => complexion.genderId === genderId).length == 0) {
      this.race.complexions.filter(complexion => complexion.genderId === 0).forEach(complexion => this.race.complexions.push(new RaceComplexion(complexion.complexionId, genderId)));
    }

    if (this.race.eyeColors.filter(eyeColor => eyeColor.genderId === genderId).length == 0) {
      this.race.eyeColors.filter(eyeColor => eyeColor.genderId === 0).forEach(eyeColor => this.race.eyeColors.push(new RaceEyeColor(eyeColor.eyeColorId, genderId)));
    }

    if (this.race.hairColors.filter(hairColor => hairColor.genderId === genderId).length == 0) {
      this.race.hairColors.filter(hairColor => hairColor.genderId === 0).forEach(hairColor => this.race.hairColors.push(new RaceHairColor(hairColor.hairColorId, genderId)));
    }

    if (this.race.skinColors.filter(skinColor => skinColor.genderId === genderId).length == 0) {
      this.race.skinColors.filter(skinColor => skinColor.genderId === 0).forEach(skinColor => this.race.skinColors.push(new RaceSkinColor(skinColor.skinColorId, genderId)));
    }

    if (this.race.measurements.filter(measurement => measurement.genderId === genderId).length == 0) {
      this.race.measurements.filter(measurement => measurement.genderId === 0).forEach(measurement => this.race.measurements.push(new RaceMeasurement(genderId, new Height(measurement.height.min, measurement.height.max), new Weight(measurement.weight.min, measurement.weight.max))));
    }
  }
}
