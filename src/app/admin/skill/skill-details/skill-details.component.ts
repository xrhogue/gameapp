import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {SkillService} from "app/service/skill/skill.service";
import {Skill} from "admin/shared/skill";
import {SkillGeneralComponent} from "./skill-general/skill-general.component";
import {SkillPrerequisitesComponent} from "./skill-prerequisites/skill-prerequisites.component";

@Component({
  selector: 'app-skill-details',
  templateUrl: './skill-details.component.html',
  styleUrls: ['./skill-details.component.scss']
})
export class SkillDetailsComponent implements OnInit {

  id: number;
  skill: Skill;
  JSON: JSON;
  invalid: boolean = true;

  @ViewChild('form', { static: true }) ngForm: NgForm;
  @ViewChild(SkillGeneralComponent, { static: false }) private skillGeneralComponent: SkillGeneralComponent;
  @ViewChild(SkillPrerequisitesComponent, { static: false }) private skillPrerequisitesComponent: SkillPrerequisitesComponent;

  constructor(private route: ActivatedRoute, private router: Router, private skillService: SkillService) {
    this.route.params.subscribe( params => this.id = params.id );
    this.JSON = JSON;
  }

  ngOnInit() {
    if (this.id > 0) {
      this.skillService.getSkill(this.id).subscribe(skill => this.skill = skill);
    }
    else {
      this.skill = new Skill(0, "", "", 3, 3, true, null, null, null, null, null, null);
    }
  }

  update() {
    if (this.skill.id == 0) {
      this.skillService.addSkill(this.skill).subscribe(skill => this.skill = skill);
    }
    else {
      this.skillService.updateSkill(this.skill).subscribe(skill => this.skill = skill);
    }

    this.router.navigate(['/admin/skills']).catch(/*handle error here */);
  }

  cancel() {
    this.router.navigate(['/admin/skills']).catch(/*handle error here */);
  }

  isInvalid() {
    if (this.skillGeneralComponent !== undefined) {
      this.invalid = this.skillGeneralComponent.invalid();
    }

    return this.invalid;
  }
}
