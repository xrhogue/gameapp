import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatService } from '../../../service/stat/stat.service';
import { Stat } from '../../shared/stat';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  stats: Array<Stat>;

  constructor(private data: StatService, private router: Router) { }

  ngOnInit() {
    this.stats = this.data.getStats();
    // this.data.getStats().subscribe(data => this.stats = data);
  }

  addStat() {
    this.router.navigateByUrl('/stats/0');
  }

  updateStat(stat: Stat) {
    return this.data.updateStat(stat);
    // return this.data.updateStat(stat);
  }

  deleteStat(statId: number) {
    this.data.deleteStat(statId);
    // this.data.deleteStat(statId);
  }
}
