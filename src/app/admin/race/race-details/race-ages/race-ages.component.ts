import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Race} from "../../../shared/race";
import {Gender} from "../../../shared/gender";
import {UtilService} from "../../../../shared/services/util/util.service";
import {RaceAge} from "../../../shared/race-age";

@Component({
  selector: 'app-race-ages',
  templateUrl: './race-ages.component.html',
  styleUrls: ['./race-ages.component.scss']
})
export class RaceAgesComponent implements OnInit {

  @Input() gender: Gender;
  @Input() race: Race;
  @Output() raceChange: EventEmitter<Race> = new EventEmitter<Race>();
  isInteger:(number: string) => boolean;
  MAX_VALUE: Number = Number.MAX_VALUE;

  constructor(private utilService: UtilService) {
    this.isInteger = this.utilService.isInteger;
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
