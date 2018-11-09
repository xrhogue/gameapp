import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Gender} from "../../../../shared/gender";
import {Race} from "../../../../shared/race";
import {StatService} from "../../../../../service/stat/stat.service";
import {UtilService} from "../../../../../shared/services/util/util.service";
import {RaceService} from "../../../../../service/race/race.service";

@Component({
  template: ''
})
export class RaceGenderBaseComponent implements OnInit {
  @Input() gender: Gender;
  @Input() race: Race;
  @Output() raceChange: EventEmitter<Race> = new EventEmitter<Race>();
  isInteger:(number: string) => boolean;
  MAX_VALUE: Number = Number.MAX_VALUE;

  constructor(private statService: StatService, private raceService: RaceService, private utilService: UtilService) {
    this.isInteger = this.utilService.isInteger;
  }

  ngOnInit() {
  }
}
