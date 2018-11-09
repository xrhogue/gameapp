import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Gender} from "../../../../shared/gender";
import {Race} from "../../../../shared/race";
import {UtilService} from "../../../../../shared/services/util/util.service";

@Component({
  template: ''
})
export class RaceGenderBaseComponent implements OnInit {
  @Input() gender: Gender;
  @Input() race: Race;
  @Output() raceChange: EventEmitter<Race> = new EventEmitter<Race>();
  isInteger:(number: string) => boolean;
  MAX_VALUE: Number = Number.MAX_VALUE;

  constructor(protected utilService: UtilService) {
    this.isInteger = this.utilService.isInteger;
  }

  ngOnInit() {
  }
}
