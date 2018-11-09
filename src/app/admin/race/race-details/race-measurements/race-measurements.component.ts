import {Component, OnInit} from '@angular/core';
import {RaceMeasurement} from "../../../shared/race-measurement";
import {RaceGenderBaseComponent} from "../../shared/components/race-gender-base/race-gender-base.component";
import {UtilService} from "../../../../shared/services/util/util.service";

@Component({
  selector: 'app-race-measurements',
  templateUrl: './race-measurements.component.html',
  styleUrls: ['./race-measurements.component.scss']
})
export class RaceMeasurementsComponent extends RaceGenderBaseComponent implements OnInit {

  constructor(protected utilService: UtilService) {
    super(utilService);
  }

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
