import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Gender} from "../../../shared/gender";
import {Race} from "../../../shared/race";
import {RaceMeasurement} from "../../../shared/race-measurement";

@Component({
  selector: 'app-race-measurements',
  templateUrl: './race-measurements.component.html',
  styleUrls: ['./race-measurements.component.scss']
})
export class RaceMeasurementsComponent implements OnInit {

  @Input() gender: Gender;
  @Input() race: Race;
  @Output() raceChange: EventEmitter<Race> = new EventEmitter<Race>();
  isInteger:(number: string) => boolean;
  MAX_VALUE: Number = Number.MAX_VALUE;

  constructor() { }

  ngOnInit() {
    if (!this.race.measurements) {
      this.race.measurements = [];
    }

    if (!this.race.measurements[0]) {
      this.initRaceGenderMeasurements(0)
    }

    if (this.gender.id !== 0 && this.getGenderIndex(this.gender.id) === 0) {
      this.initRaceGenderMeasurements(this.gender.id)
    }
  }

  initRaceGenderMeasurements(genderId: number) {
    this.race.measurements.push(new RaceMeasurement(genderId));
  }

  getGenderIndex(genderId: number) {
    if (!!this.race.measurements) {
      for (let index = 0; index < this.race.measurements.length; index++) {
        if (this.race.measurements[index].genderId === genderId) {
          return index;
        }
      }
    }

    return 0;
  }
}
