import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SkillService} from "../../../../service/skill/skill.service";
import {NgForm} from "@angular/forms";
import {Skill} from "../../../shared/skill";
import {Subscription} from "rxjs/internal/Subscription";
import {StatService} from "../../../../service/stat/stat.service";
import {Stat} from "../../../shared/stat";
import {UtilService} from "../../../../shared/services/util/util.service";

@Component({
  selector: 'app-skill-general',
  templateUrl: './skill-general.component.html',
  styleUrls: ['./skill-general.component.scss']
})
export class SkillGeneralComponent implements OnInit, OnDestroy {

  id: number;
  @Input() skill: Skill;
  @Output() skillChange: EventEmitter<Skill> = new EventEmitter<Skill>();
  stats: Array<Stat>;
  skillSecondaryStats: Array<Stat> = [];
  JSON: JSON;
  formChangesSubscription: Subscription;
  fieldStates: {name: boolean, shortName: boolean, secondaryStats: boolean, baseCost: boolean, levelCost: boolean} = {name: false, shortName: false, secondaryStats: false, baseCost: false, levelCost: false};
  isInteger:(number: string)=>boolean;
  @Input() ngForm: NgForm;

  constructor(private route: ActivatedRoute, private router: Router, private skillService: SkillService, private statService: StatService, private utilService: UtilService) {
    this.route.params.subscribe( params => this.id = params.id );
    this.JSON = JSON;
    this.isInteger = utilService.isInteger;
  }

  ngOnInit() {
    this.formChangesSubscription = this.ngForm.form.valueChanges.subscribe(skill => {
      if (skill.name !== undefined && skill.shortName !== undefined && skill.shortName.length == 0 && this.skillService.isUnique(this.skill,"shortName", skill.name)) {
        this.skill.shortName = skill.name;
      }
    })

    this.statService.getStats().subscribe(stats => {
      this.stats = stats

      // probably should be checking here if the filter does not return a stat based on the id...
      this.skill.secondaryStatIds.forEach(statId=>this.skillSecondaryStats.push(this.stats.filter(stat=>stat.id === statId)[0]))
    });
  }

  ngOnDestroy() {
    this.formChangesSubscription.unsubscribe();
  }

  invalid() {
    return this.fieldStates.name || this.fieldStates.shortName || this.fieldStates.secondaryStats|| this.fieldStates.baseCost || this.fieldStates.levelCost;
  }

  updateSecondaryStats() {
    this.skill.secondaryStatIds = [];

    this.skillSecondaryStats.forEach(stat=>this.skill.secondaryStatIds.push(stat.id));
  }

  updateInvalid(field: string, invalid: boolean) {
    this.fieldStates[field] = invalid;
  }
}
