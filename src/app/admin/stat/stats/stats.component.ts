import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {StatService} from '../../../service/stat/stat.service';
import {Stat} from '../../shared/stat';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  stats: Array<Stat>;

  constructor(private statService: StatService, private router: Router) {
  }

  ngOnInit() {
    this.statService.getStats().subscribe(stats => this.stats = stats);
  }

  addStat() {
    this.router.navigateByUrl('/admin/stats/0');
  }

  updateStat(stat: Stat) {
    this.router.navigateByUrl('/admin/stats/' + stat.id);
  }

  deleteStat(statId: number) {
    this.statService.deleteStat(statId).subscribe(stat => this.statService.getStats().subscribe(stats => this.stats = stats));
  }
}
