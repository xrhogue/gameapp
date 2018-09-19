import { Stat } from '../../admin/shared/stat';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatService {

  stats: Array<Stat> = [
    {id: 1, name: 'Strength', shortName: 'STR', code: 'S', multiplier: 1},
    {id: 2, name: 'Intelligence', shortName: 'INT', code: 'I', multiplier: 1}
    ];

  constructor(private http: HttpClient) {}

  getStats() {
    return this.stats;
        // return this.http.get('http://localhost:9090/stats');
  }

  getStat(statId: number) {
    for (let statKey in this.stats) {
      if (this.stats[statKey].id == statId) {
        return new Stat(
          this.stats[statKey].id,
          this.stats[statKey].name,
          this.stats[statKey].shortName,
          this.stats[statKey].code,
          this.stats[statKey].multiplier);
      }
    }

    return {id: 0, name: 'Unknown', shortName: 'UNK', code: 'U', multiplier: 0};

    // return this.http.get('http://localhost:9090/stats/' + statId);
  }

  addStat(stat: Stat) {
    stat.id = this.stats.length + 1;

    this.stats.push(stat)

    return stat;

    // return this.http.post('http://localhost:9090/stats');
  }

  updateStat(stat: Stat) {
    for (let statKey in this.stats) {
      if (this.stats[statKey].id === stat.id) {
        this.stats[statKey] = stat;

        return stat;
      }
    }

    return {id: 0, name: 'Unknown', shortName: 'UNK', code: 'U', multiplier: 0};
    // return this.http.put('http://localhost:9090/stats/' + stat.id);
  }

  deleteStat(statId: number) {
    let statKey;

    for (statKey in this.stats) {
      if (this.stats[statKey].id === statId) {
        this.stats.splice(statKey,1);
      }
    }
    // return this.http.delete('http://localhost:9090/stats/' + stat.id);
  }

  isUnique(stat: Stat, fieldName: String, value: String) {
    for (let statKey in this.stats) {
      if (this.stats[statKey].id != stat.id &&
        ((fieldName === "name" && this.stats[statKey].name === value) ||
          (fieldName === "shortName" && this.stats[statKey].shortName == value) ||
          (fieldName === "code" && this.stats[statKey].code == value))) {
        return false;
      }
    }

    return true;
  }
}
