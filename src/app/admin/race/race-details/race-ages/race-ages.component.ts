import {Component, OnInit} from '@angular/core';
import {UtilService} from "../../../../shared/services/util/util.service";
import {RaceAge} from "../../../shared/race-age";
import {RaceGenderBaseComponent} from "../../shared/components/race-gender-base/race-gender-base.component";

@Component({
  selector: 'app-race-ages',
  templateUrl: './race-ages.component.html',
  styleUrls: ['./race-ages.component.scss']
})
export class RaceAgesComponent extends RaceGenderBaseComponent implements OnInit {

  constructor(protected utilService: UtilService) {
    super(utilService);
  }

  ngOnInit() {
    if (!this.race.ages) {
      this.race.ages = [];
    }

    if (!this.race.ages[this.gender.id]) {
      this.race.ages[this.gender.id] = new RaceAge(this.gender.id);
    }
  }
}
