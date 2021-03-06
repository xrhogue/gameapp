import { Component, OnInit } from '@angular/core';
import {UtilService} from "../../../shared/services/util/util.service";
import {Skill} from "admin/shared/skill";
import {CharacterBaseComponent} from "../../../shared/components/character-base/character-base.component";
import {SkillService} from "../../../service/skill/skill.service";
import {Stat} from "admin/shared/stat";
import {CharacterSkill} from "admin/shared/character-skill";
import {Router} from "@angular/router";
import {CharacterRace} from "admin/shared/character-race";
import {Character} from "admin/shared/character";

@Component({
  selector: 'app-character-skills',
  templateUrl: './character-skills.component.html',
  styleUrls: ['./character-skills.component.scss']
})
export class CharacterSkillsComponent extends CharacterBaseComponent implements OnInit {
  skills: Array<Skill>;
  selectedCharacterSkills: Array<CharacterSkill> = [];
  characterSkill: CharacterSkill = new CharacterSkill(0, 0, 0);
  showDialog: boolean = false;
  showDetails: boolean = false;

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

  addCharacterSkills(characterSkills: Array<CharacterSkill>) {
    characterSkills.forEach(characterSkill => this.character.skills.push(characterSkill));
  }

  updateCharacterSkill(characterSkill: CharacterSkill) {
    this.showDetails = true;
    this.characterSkill = characterSkill;
  }

  deleteCharacterSkill(characterSkill: CharacterSkill) {
    this.utilService.deleteObjectFromArray(this.character.skills, characterSkill.skillId, this.comparator);
    //
    // let index: number = this.character.skills.findIndex(characterSkill => characterSkill.skillId === skillId);
    //
    // if (index > -1) {
    //   this.character.skills.splice(index, 1);
    // }
  }

  comparator(characterSkill: CharacterSkill, skillId: number): boolean {
    return characterSkill.skillId === skillId;
  }

  getSkill(characterSkill: CharacterSkill): Skill {
    let skill: Skill = this.skills.find(skill => skill.id === characterSkill.skillId); // TODO: propagate this to other filters where findFirst is needed

    if (!!skill) {
      return skill;
    }

    return new Skill(0, "", "", 0, 0, false, 0, 0, [0]);
  }
}
