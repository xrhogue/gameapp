import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { StatService } from '../../../service/stat/stat.service';
import { Stat } from '../../shared/stat';
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs/internal/Subscription";

@Component({
  selector: 'app-stat-details',
  templateUrl: './stat-details.component.html',
  styleUrls: ['./stat-details.component.scss']
})
export class StatDetailsComponent implements OnInit {

  id: number;
  stat: Stat;
  statCodes: Array<String>;
  JSON: JSON;
  formChangesSubscription: Subscription;

  @ViewChild('form') ngForm: NgForm;

  constructor(private route: ActivatedRoute, private router: Router, private data: StatService) {
      this.route.params.subscribe( params => this.id = params.id );
      this.JSON = JSON;
   }

  ngOnInit() {
    this.formChangesSubscription = this.ngForm.form.valueChanges.subscribe(stat => {
      if (stat.name !== undefined && stat.code !== undefined && stat.name.length >= 1 && stat.code.length == 0 && this.data.isUnique(this.stat,"code", stat.name.charAt(0))) {
        this.stat.code = stat.name.charAt(0);
      }

      if (stat.name !== undefined && stat.shortName !== undefined && stat.name.length >= 3 && stat.shortName.length == 0 && this.data.isUnique(this.stat,"shortName", stat.name.substr(0, 3).toUpperCase())) {
        this.stat.shortName = stat.name.substr(0, 3).toUpperCase();
      }
    })

    if (this.id > 0) {
      this.stat = this.data.getStat(this.id);
    }
    else {
      this.stat = new Stat(0, "", "", "", 1);
    }

    this.statCodes = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toUpperCase().split('');

    let stats = this.data.getStats();

    for (let statKey in stats) {
      if (stats[statKey].code === this.stat.code) {
        continue;
      }

      let index = this.statCodes.findIndex(statCode => statCode === stats[statKey].code)

      if (index > -1) {
        this.statCodes.splice(index, 1);
      }
    }
    // this.data.getStat(id).subscribe(data => this.stat = data);
  }
  ngOnDestroy() {
    this.formChangesSubscription.unsubscribe();
  }

  update() {
    if (this.stat.id == 0) {
      this.stat = this.data.addStat(this.stat);
    }
    else {
      this.stat = this.data.updateStat(this.stat);
    }
    // this.data.updateStat(this.stat).subscribe(data => this.stat = data);
    this.router.navigate(['/stats']);
  }

  cancel() {
    this.router.navigate(['/stats']);
  }

  isInteger(number: string) {
    if (number.match('.*[^0-9]+.*')) {
      return false;
    }

    return Number.isInteger(Number.parseInt(number))
  }
}
