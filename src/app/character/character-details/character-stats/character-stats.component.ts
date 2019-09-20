import {Component, OnInit} from '@angular/core';
import {CharacterBaseComponent} from "../../../shared/components/character-base/character-base.component";
import {UtilService} from "../../../shared/services/util/util.service";
import {StatService} from "../../../service/stat/stat.service";
import {Stat} from "admin/shared/stat";
import {CharacterStat} from "admin/shared/character-stat";
import {CharacterRace} from "admin/shared/character-race";
import {Race} from "admin/shared/race";
import {RaceService} from "../../../service/race/race.service";
import {RaceStat} from "admin/shared/race-stat";

@Component({
  selector: 'app-character-stats',
  templateUrl: './character-stats.component.html',
  styleUrls: ['./character-stats.component.scss']
})
export class CharacterStatsComponent extends CharacterBaseComponent implements OnInit {
  races: Array<Race>;
  stats: Array<Stat>;

  constructor(private raceService: RaceService, private statService: StatService, protected utilService: UtilService) {
    super(utilService);
  }

  ngOnInit() {
    this.statService.getStats().subscribe(stats => {
      this.stats = stats;


      this.raceService.getRaces().subscribe(races => {
        this.races = races;

        this.initCharacterStats();
      });
    });
  }

  initCharacterStats() {
    if (!this.character.stats) {
      this.character.stats = [];
    }

    if (this.character.stats.length == 0) {
      this.stats.forEach(stat => this.character.stats.push(new CharacterStat(this.character.id, stat.id, 0)));
    }

    if (!!this.character.races) {
      this.character.stats.forEach(characterStat => {
        characterStat.low = 0;
        characterStat.high = 0;
        characterStat.max = 0;
      });

      this.character.races.forEach(characterRace => this.updateStats(characterRace));
      this.adjustStats();
    }
  }

  updateStats(characterRace: CharacterRace) {
    if (!!this.getRace(characterRace) && !!this.getRace(characterRace).stats) {
      this.getRace(characterRace).stats.find(raceStats => raceStats[0].genderId === this.character.genderId).forEach(raceStat => this.updateStat(raceStat, characterRace.percent));
    }
  }

  updateStat(raceStat: RaceStat, percent: number) {
    let characterStat: CharacterStat = this.character.stats.find(characterStat => characterStat.statId === raceStat.statId);

    if (!characterStat) {
      characterStat = new CharacterStat(this.character.id, raceStat.statId, 70, this.getStatRangeValue(raceStat.low, percent), this.getStatRangeValue(raceStat.high, percent), this.getStatRangeValue(raceStat.max, percent));
      this.character.stats.push(characterStat);
    } else {
      characterStat.low += this.getStatRangeValue(raceStat.low, percent);
      characterStat.high += this.getStatRangeValue(raceStat.high, percent);
      characterStat.max += this.getStatRangeValue(raceStat.max, percent);

      if (characterStat.value === 0) {
        characterStat.value = characterStat.low;
      }

      if (characterStat.value > characterStat.max) {
        characterStat.value = characterStat.max;
      }
    }
  }

  adjustStats() {
    this.character.stats.forEach(characterStat => {
      characterStat.low = Math.floor(characterStat.low / 5) * 5;
      characterStat.high = Math.floor(characterStat.high / 5) * 5;
      characterStat.max = Math.floor(characterStat.max / 5) * 5;
    });
  }

  getStatRangeValue(rangeValue: number, percent: number) {
    return Math.floor(rangeValue * percent / 100);
  }

  getStatShortName(statId: number): string {
    return this.getStat(statId).shortName
  }

  getStat(statId: number): Stat {
    return this.stats.find(stat => stat.id === statId);
  }

  getRace(characterRace: CharacterRace): Race {
    return this.races.find(race => race.id === characterRace.raceId);
  }
}
