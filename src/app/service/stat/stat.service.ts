import {Stat} from '../../admin/shared/stat';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs/internal/Observable";

@Injectable({
              providedIn: 'root'
            })
export class StatService {

  stats: Array<Stat>

  constructor(private http: HttpClient) {
    this.updateCache();
  }

  getStatsCache(): Array<Stat> {
    return this.stats;
  }

  getStats(): Observable<Array<Stat>> {
    return this.http.get<Array<Stat>>("http://localhost:8888/admin/stats");
  }

  getStat(statId: number): Observable<Stat> {
    return this.http.get<Stat>("http://localhost:8888/admin/stats/" + statId);
  }

  addStat(stat: Stat): Observable<Stat> {
    setTimeout(this.updateCache, 500);

    return this.http.post<Stat>("http://localhost:8888/admin/stats", stat);
  }

  updateStat(stat: Stat): Observable<Stat> {
    setTimeout(this.updateCache, 500);

    return this.http.put<Stat>("http://localhost:8888/admin/stats", stat);
  }

  deleteStat(statId: number): Observable<Stat> {
    setTimeout(this.updateCache, 500);

    return this.http.delete<Stat>("http://localhost:8888/admin/stats/" + statId);
  }

  isUnique(stat: Stat, fieldName: String, value: String) {
    this.getStats().subscribe(stats => this.stats = stats);

    if (!!this.stats) {
      for (let statKey in this.stats) {
        if (this.stats[statKey].id != stat.id &&
            ((fieldName === "name" && this.stats[statKey].name === value) ||
             (fieldName === "shortName" && this.stats[statKey].shortName == value) ||
             (fieldName === "code" && this.stats[statKey].code == value))) {
          return false;
        }
      }
    }

    return true;
  }

  updateCache() {
    if (!!this.getStats) { // TODO why is this sometimes a function, and sometimes not?
      this.getStats().subscribe(stats => this.stats = stats);
    }
  }
}
