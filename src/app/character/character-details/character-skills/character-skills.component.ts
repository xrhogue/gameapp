import { Component, OnInit } from '@angular/core';
import {UtilService} from "../../../shared/services/util/util.service";
import {Skill} from "admin/shared/skill";
import {CharacterBaseComponent} from "../../../shared/components/character-base/character-base.component";
import {SkillService} from "../../../service/skill/skill.service";
import {Stat} from "admin/shared/stat";
import {CharacterSkill} from "admin/shared/character-skill";
import {Router} from "@angular/router";

@Component({
  selector: 'app-character-skills',
  templateUrl: './character-skills.component.html',
  styleUrls: ['./character-skills.component.scss']
})
export class CharacterSkillsComponent extends CharacterBaseComponent implements OnInit {
  skills: Array<Skill>

  constructor(private skillService: SkillService, protected utilService: UtilService, private router: Router) {
    super(utilService);
  }

  ngOnInit() {
    this.skillService.getSkills().subscribe(skills => {
      this.skills = skills;

      this.initCharacterSkills();
    });
  }

  initCharacterSkills() {
    if (!this.character.skills) {
      this.character.skills = [];
    }
  }

  addCharacterSkill() {
    this.router.navigateByUrl('/character/skill/0');
  }

  updateCharacterSkill(characterSkill: CharacterSkill) {
    this.router.navigateByUrl('/character/skills/' + characterSkill.skillId);
  }

  deleteCharacterSkill(skillId: number) {
    // delete from the character object
  }

  getSkill(characterSkill: CharacterSkill): Skill {
    return this.skills.find(skill => skill.id === characterSkill.skillId); // TODO: propagate this to other filters where findFirst is needed
  }
}
