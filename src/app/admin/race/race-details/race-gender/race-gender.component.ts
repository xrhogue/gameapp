import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Race} from "../../../shared/race";
import {Gender} from "../../../shared/gender";
import {RaceAgesComponent} from "../race-ages/race-ages.component";
import {RaceStatsComponent} from "../race-stats/race-stats.component";
import {RaceAttributesComponent} from "../race-attributes/race-attributes.component";
import {RaceMeasurementsComponent} from "../race-measurements/race-measurements.component";
import {StatService} from "../../../../service/stat/stat.service";

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

  constructor(private statService: StatService) {
  }

  ngOnInit() {
    this.race = Race.initialize(this.race, this.gender.id, this.statService.getStatsCache());
    this.initInvalid();
  }

  isInvalid() {
    return Race.isGenderInvalid(this.race, this.gender.id);
    // if (!!this.raceAgesComponent) {
    //   this.componentStates['ages'] = this.raceAgesComponent.isInvalid();
    // }
    //
    // if (!!this.raceStatsComponent) {
    //   this.componentStates['stats'] = this.raceStatsComponent.isInvalid();
    // }
    //
    // if (!!this.raceAttributesComponent) {
    //   this.componentStates['attributes'] = this.raceAttributesComponent.isInvalid();
    // }
    //
    // if (!!this.raceMeasurementsComponent) {
    //   this.componentStates['measurements'] = this.raceMeasurementsComponent.isInvalid();
    // }
    //
    // for (let componentKey in this.componentStates) {
    //   if (this.componentStates[componentKey]) {
    //     return true;
    //   }
    // }
    //
    // return false;
  }

  areAttributesInvalid() {
    return Race.areAttributesInvalid(this.race, this.gender.id);
  }

  isComponentInvalid(name: string) {
    return this.componentStates[name];
  }

  initInvalid() {
    console.log('initializing race gender invalid state');

    this.componentStates['stats'] = Race.areStatsInvalid(this.race, this.gender.id);
    this.componentStates['ages'] = Race.areAgesInvalid(this.race, this.gender.id);
    this.componentStates['attributes'] = Race.areAttributesInvalid(this.race, this.gender.id);
    this.componentStates['measurements'] = Race.areMeasurementsInvalid(this.race, this.gender.id);

    console.log('race gender stats invalid: ' + this.componentStates['stats']);
    console.log('race gender ages invalid: ' + this.componentStates['ages']);
    console.log('race gender attributes invalid: ' + this.componentStates['attributes']);
    console.log('race gender measurements invalid: ' + this.componentStates['measurements']);
  }
}
