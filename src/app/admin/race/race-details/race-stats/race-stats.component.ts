import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Race} from "../../../shared/race";
import {UtilService} from "../../../../shared/services/util/util.service";
import {RaceService} from "../../../../service/race/race.service";
import {Gender} from "../../../shared/gender";
import {StatService} from "../../../../service/stat/stat.service";
import {Stat} from "../../../shared/stat";
import {RaceStat} from "../../../shared/race-stat";

@Component({
  selector: 'app-race-stats',
  templateUrl: './race-stats.component.html',
  styleUrls: ['./race-stats.component.scss']
})
export class RaceStatsComponent implements OnInit {

  @Input() gender: Gender;
  @Input() race: Race;
  @Output() raceChange: EventEmitter<Race> = new EventEmitter<Race>();
  stats: Array<Stat>
  isInteger:(number: string) => boolean;
  MAX_VALUE: Number = Number.MAX_VALUE;

  constructor(private statService: StatService, private raceService: RaceService, private utilService: UtilService) {
    this.statService.getStats()
    this.isInteger = this.utilService.isInteger;
  }

  ngOnInit() {
    this.statService.getStats().subscribe(stats => this.stats = stats);

    if (!this.race.stats)
    {
      this.race.stats = [];

      this.race.stats[0] = [new RaceStat(1, 0, 70, 100), new RaceStat(2, 0, 70, 100)];
    }
  }
}
