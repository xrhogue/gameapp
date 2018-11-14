import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Race} from "../../../shared/race";
import {Gender} from "../../../shared/gender";
import {RaceAgesComponent} from "../race-ages/race-ages.component";
import {RaceStatsComponent} from "../race-stats/race-stats.component";
import {RaceAttributesComponent} from "../race-attributes/race-attributes.component";
import {RaceMeasurementsComponent} from "../race-measurements/race-measurements.component";

@Component({
  selector: 'app-race-gender',
  templateUrl: './race-gender.component.html',
  styleUrls: ['./race-gender.component.scss']
})
export class RaceGenderComponent implements OnInit {

  @Input() gender: Gender;
  @Input() race: Race;
  @Output() raceChange: EventEmitter<Race> = new EventEmitter<Race>();
  @ViewChild(RaceAgesComponent) private raceAgesComponent: RaceAgesComponent;
  @ViewChild(RaceStatsComponent) private raceStatsComponent: RaceStatsComponent;
  @ViewChild(RaceAttributesComponent) private raceAttributesComponent: RaceAttributesComponent;
  @ViewChild(RaceMeasurementsComponent) private raceMeasurementsComponent: RaceMeasurementsComponent;
  componentStates: Array<boolean> = [];

  constructor() {
  }

  ngOnInit() {
    this.initInvalid();
  }

  isInvalid() {
    if (!!this.raceAgesComponent) {
      this.componentStates['raceAgesComponent'] = this.raceAgesComponent.isInvalid();
    }
    if (!!this.raceStatsComponent) {
      this.componentStates['raceStatsComponent'] = this.raceStatsComponent.isInvalid();
    }
    if (!!this.raceAttributesComponent) {
      this.componentStates['raceAttributesComponent'] = this.raceAttributesComponent.isInvalid();
    }
    if (!!this.raceMeasurementsComponent) {
      this.componentStates['raceMeasurementsComponent'] = this.raceMeasurementsComponent.isInvalid();
    }

    for (let componentKey in this.componentStates) {
      if (this.componentStates[componentKey]) {
        return true;
      }
    }

    return false;
  }

  initInvalid() {
    if (!this.race.complexions || this.race.complexions.filter(complexion => complexion.genderId == this.gender.id).length == 0) {
      this.componentStates['raceAttributesComponent'] = true;
    }
  }
}
