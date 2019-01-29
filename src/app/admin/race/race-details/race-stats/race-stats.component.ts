import {Component, OnInit} from '@angular/core';
import {UtilService} from "../../../../shared/services/util/util.service";
import {StatService} from "../../../../service/stat/stat.service";
import {Stat} from "../../../shared/stat";
import {RaceStat} from "../../../shared/race-stat";
import {RaceGenderBaseComponent} from "../../shared/components/race-gender-base/race-gender-base.component";

@Component({
  selector: 'app-race-stats',
  templateUrl: './race-stats.component.html',
  styleUrls: ['./race-stats.component.scss']
})
export class RaceStatsComponent extends RaceGenderBaseComponent implements OnInit {

  stats: Array<Stat>

  constructor(private statService: StatService, protected utilService: UtilService) {
    super(utilService);
  }

  ngOnInit() {
    this.statService.getStats().subscribe(stats => {
      this.stats = stats;
      this.initRaceStats();
    });
  }

  initRaceStats() {
    if (!this.race.stats) {
      this.race.stats = [];
    }

    if (!this.race.stats[0]) {
      this.initRaceGenderStats(0)
    }

    if (this.gender.id !== 0 && this.getGenderIndex(this.gender.id) === 0) {
      this.initRaceGenderStats(this.gender.id)
    }
  }

  initRaceGenderStats(genderId: number) {
    let genderIndex: number = this.race.stats.length;

    this.race.stats[genderIndex] = [];

    let statIndex: number = 0;

    this.stats.forEach(stat => this.race.stats[genderIndex][statIndex++] = this.getGenderRaceStat(genderId, stat.id))
  }

  getGenderRaceStat(genderId: number, statId: number): RaceStat {
    if (genderId === 0) {
      return new RaceStat(statId, genderId);
    }

    let baseRaceStat : RaceStat = this.race.stats[0].filter(raceStat => raceStat.statId === statId)[0];

    return new RaceStat(statId, genderId, baseRaceStat.low, baseRaceStat.high, baseRaceStat.max);
  }

  getGenderIndex(genderId: number) {
    if (!!this.race.stats) {
      for (let index = 0; index < this.race.stats.length; index++) {
        if (!!this.race.stats[index] && this.race.stats[index].length > 0) {
          if (this.race.stats[index][0].genderId === genderId) {
            return index;
          }
        }
      }
    }

    return 0;
  }

  getErrorDescription(id: string) {
    return this.errorDescription[id];
  }
}
