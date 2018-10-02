import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SkillService} from "../../../service/skill/skill.service";
import {NgForm} from "@angular/forms";
import {Skill} from "../../shared/skill";
import {Subscription} from "rxjs/internal/Subscription";
import {StatService} from "../../../service/stat/stat.service";
import {Stat} from "../../shared/stat";
import {SkillGeneralComponent} from "./skill-general/skill-general.component";

@Component({
  selector: 'app-skill-details',
  templateUrl: './skill-details.component.html',
  styleUrls: ['./skill-details.component.scss']
})
export class SkillDetailsComponent implements OnInit {

  id: number;
  skill: Skill;
  stats: Array<Stat>;
  skillSecondaryStats: Array<Stat> = [];
  JSON: JSON;
  formChangesSubscription: Subscription;
  invalid: boolean = true;

  @ViewChild('form') ngForm: NgForm;
  @ViewChild(SkillGeneralComponent) private skillGeneralComponent: SkillGeneralComponent;

  constructor(private route: ActivatedRoute, private router: Router, private data: SkillService, private statService: StatService) {
    this.route.params.subscribe( params => this.id = params.id );
    this.JSON = JSON;
  }

  ngOnInit() {
    this.formChangesSubscription = this.ngForm.form.valueChanges.subscribe(skill => {
      if (skill.name !== undefined && skill.shortName !== undefined && skill.shortName.length == 0 && this.data.isUnique(this.skill,"shortName", skill.name)) {
        this.skill.shortName = skill.name;
      }
    })

    this.stats = this.statService.getStats();

    if (this.id > 0) {
      this.skill = this.data.getSkill(this.id);
    }
    else {
      this.skill = new Skill(0, "", "", 3, 3, true, null, null, null, null);
    }

    // probably should be checking here if the filter does not return a stat based on the id...
    this.skill.secondaryStatIds.forEach(statId=>this.skillSecondaryStats.push(this.stats.filter(stat=>stat.id === statId)[0]))

    let skills = this.data.getSkills();
    // this.data.getSkill(id).subscribe(data => this.skill = data);
  }

  ngOnDestroy() {
    this.formChangesSubscription.unsubscribe();
  }

  update() {
    if (this.skill.id == 0) {
      this.skill = this.data.addSkill(this.skill);
    }
    else {
      this.skill = this.data.updateSkill(this.skill);
    }
    // this.data.updateSkill(this.skill).subscribe(data => this.skill = data);
    this.router.navigate(['/admin/skills']);
  }

  cancel() {
    this.router.navigate(['/admin/skills']);
  }

  isInvalid() {
    if (this.skillGeneralComponent !== undefined) {
      this.invalid = this.skillGeneralComponent.invalid();
    }

    return this.invalid;
  }

  isInteger(number: string) {
    if (number.match('.*[^0-9]+.*')) {
      return false;
    }

    return Number.isInteger(Number.parseInt(number))
  }
}
