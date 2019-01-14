import { Component, OnInit } from '@angular/core';
import {CharacterBaseComponent} from "../../../shared/components/character-base/character-base.component";
import {UtilService} from "../../../shared/services/util/util.service";
import {StatService} from "../../../service/stat/stat.service";
import {Stat} from "admin/shared/stat";
import {CharacterStat} from "admin/shared/character-stat";

@Component({
  selector: 'app-character-stats',
  templateUrl: './character-stats.component.html',
  styleUrls: ['./character-stats.component.scss']
})
export class CharacterStatsComponent extends CharacterBaseComponent implements OnInit {
  stats: Array<Stat>

  constructor(private statService: StatService, protected utilService: UtilService) {
    super(utilService);
  }

  ngOnInit() {
    this.statService.getStats().subscribe(stats => {
      this.stats = stats;

      this.initCharacterStats();
    });
  }

  initCharacterStats() {
    if (!this.character.stats) {
      this.character.stats = [];
    }

    if (this.character.stats.length == 0) {
      this.stats.forEach(stat => this.character.stats.push(new CharacterStat(this.character.id, stat.id)));
    }
  }

  getStatShortName(statId: number): string {
    return this.getStat(statId).shortName
  }

  getStat(statId: number): Stat {
    let stats: Array<Stat> = this.getStats(statId);

    return stats.length == 1 ? stats[0] : new Stat(0, '', '', '');
  }

  getStats(statId: number): Array<Stat> {
    return this.stats.filter(stat => stat.id == statId);
  }
}
