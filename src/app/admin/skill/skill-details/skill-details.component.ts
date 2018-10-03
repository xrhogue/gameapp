import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SkillService} from "../../../service/skill/skill.service";
import {NgForm} from "@angular/forms";
import {Skill} from "../../shared/skill";
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

  @ViewChild('form') ngForm: NgForm;
  @ViewChild(SkillGeneralComponent) private skillGeneralComponent: SkillGeneralComponent;
  @ViewChild(SkillPrerequisitesComponent) private skillPrerequisitesComponent: SkillPrerequisitesComponent;

  constructor(private route: ActivatedRoute, private router: Router, private skillService: SkillService) {
    this.route.params.subscribe( params => this.id = params.id );
    this.JSON = JSON;
  }

  ngOnInit() {
    if (this.id > 0) {
      this.skill = this.skillService.getSkill(this.id);
    }
    else {
      this.skill = new Skill(0, "", "", 3, 3, true, null, null, null, null);
    }

    // this.data.getSkill(id).subscribe(data => this.skill = data);
  }

  update() {
    if (this.skill.id == 0) {
      this.skill = this.skillService.addSkill(this.skill);
    }
    else {
      this.skill = this.skillService.updateSkill(this.skill);
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
}
