import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, CanDeactivate, Router} from '@angular/router';
import {StatService} from '../../../service/stat/stat.service';
import {UtilService} from "../../../shared/services/util/util.service";
import {Stat} from '../../shared/stat';
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs/internal/Subscription";
import {Observable} from "rxjs/internal/Observable";
import {DialogService} from "../../../shared/services/dialog/dialog.service";

@Component({
  selector: 'app-stat-details',
  templateUrl: './stat-details.component.html',
  styleUrls: ['./stat-details.component.scss']
})
export class StatDetailsComponent implements OnInit, OnDestroy, CanDeactivate<Observable<boolean>> {

  id: number;
  stat: Stat;
  statCodes: Array<String>;
  isInteger:(number: string) => boolean;
  JSON: JSON;
  formChangesSubscription: Subscription;
  ignoreDirty: boolean = false;

  @ViewChild('form', { static: true }) ngForm: NgForm;

  constructor(private route: ActivatedRoute, private router: Router, private data: StatService, private dialogService: DialogService, protected utilService: UtilService) {
    this.route.params.subscribe(params => this.id = params.id);
    this.JSON = JSON;
    this.isInteger = this.utilService.isInteger;
  }

  ngOnInit() {
    if (!!this.ngForm) {
      this.formChangesSubscription = this.ngForm.form.valueChanges.subscribe(stat => {
        if (stat.name !== undefined && stat.code !== undefined && stat.name.length >= 1 && stat.code.length == 0 && this.data.isUnique(this.stat, "code", stat.name.charAt(0))) {
          this.stat.code = stat.name.charAt(0);
        }

        if (stat.name !== undefined && stat.shortName !== undefined && stat.name.length >= 3 && stat.shortName.length == 0 && this.data.isUnique(this.stat, "shortName", stat.name.substr(0, 3).toUpperCase())) {
          this.stat.shortName = stat.name.substr(0, 3).toUpperCase();
        }
      })
    }

    if (this.id > 0) {
      this.data.getStat(this.id).subscribe(stat => this.stat = stat);
    }
    else {
      this.stat = new Stat(null, "", "", "", 1);
    }

    this.statCodes = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toUpperCase().split('');

    this.data.getStats().subscribe(data => {
      let stats: Array<Stat> = data

      for (let statKey in stats) {
        if (stats[statKey].code === this.stat.code) {
          continue;
        }

        let index = this.statCodes.findIndex(statCode => statCode === stats[statKey].code)

        if (index > -1) {
          this.statCodes.splice(index, 1);
        }
      }
    });
  }

  ngOnDestroy() {
    if (!!this.formChangesSubscription) {
      this.formChangesSubscription.unsubscribe();
    }
  }

  update() {
    if (!this.stat.id) {
      this.data.addStat(this.stat).subscribe(stat => {
        this.stat = stat;
        this.ignoreDirty = true;
        this.router.navigate(['/admin/stats']);
      });
    }
    else {
      this.data.updateStat(this.stat).subscribe(stat => {
        this.stat = stat;
        this.ignoreDirty = true;
        this.router.navigate(['/admin/stats']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/admin/stats']);
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.ignoreDirty || this.ngForm.dirty == false) {
      return true;
    }

    return this.dialogService.confirm('Discard changes?');
  }
}
