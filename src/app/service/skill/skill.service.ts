import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Skill} from "../../admin/shared/skill";

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  skills: Array<Skill> = [
    {id: 1, name: 'Hunting', shortName: 'Hunting', baseCost: 3, levelCost: 3, selectable: true, parentId: null, primaryStatId: 1, secondaryStatIds: [1], prerequisiteSkillIds: null},
    {id: 2, name: 'Targeting', shortName: 'Targeting', baseCost: 3, levelCost: 3, selectable: true, parentId: 1, primaryStatId: 1, secondaryStatIds: [1,2], prerequisiteSkillIds: null}];

  constructor(private http: HttpClient) {}

  getSkills() {
    return this.skills;
    // return this.http.get('http://localhost:9090/skills');
  }

  getSkill(skillId: number) {
    for (let skillKey in this.skills) {
      if (this.skills[skillKey].id == skillId) {
        return new Skill(
          this.skills[skillKey].id,
          this.skills[skillKey].name,
          this.skills[skillKey].shortName,
          this.skills[skillKey].baseCost,
          this.skills[skillKey].levelCost,
          this.skills[skillKey].selectable,
          this.skills[skillKey].parentId,
          this.skills[skillKey].primaryStatId,
          this.skills[skillKey].secondaryStatIds,
          this.skills[skillKey].prerequisiteSkillIds);
      }
    }

    return {id: 1, name: 'Hunting', shortName: 'Hunting', baseCost: 3, levelCost: 3, selectable: true, parentId: null, primaryStatId: 1, secondaryStatIds: [1], prerequisiteSkillIds: null};

    // return this.http.get('http://localhost:9090/skills/' + skillId);
  }

  addSkill(skill: Skill) {
    skill.id = this.skills.length + 1;

    this.skills.push(skill)

    return skill;

    // return this.http.post('http://localhost:9090/skills');
  }

  updateSkill(skill: Skill) {
    for (let skillKey in this.skills) {
      if (this.skills[skillKey].id === skill.id) {
        this.skills[skillKey] = skill;

        return skill;
      }
    }

    return {id: 1, name: 'Hunting', shortName: 'Hunting', baseCost: 3, levelCost: 3, selectable: true, parentId: null, primaryStatId: 1, secondaryStatIds: [1], prerequisiteSkillIds: null};
    // return this.http.put('http://localhost:9090/skills/' + skill.id);
  }

  deleteSkill(skillId: number) {
    let skillKey;

    for (skillKey in this.skills) {
      if (this.skills[skillKey].id === skillId) {
        this.skills.splice(skillKey,1);
      }
    }
    // return this.http.delete('http://localhost:9090/skills/' + skill.id);
  }

  isUnique(skill: Skill, fieldName: String, value: String) {
    for (let skillKey in this.skills) {
      if (this.skills[skillKey].id != skill.id &&
        ((fieldName === "name" && this.skills[skillKey].name === value) ||
          (fieldName === "shortName" && this.skills[skillKey].shortName == value))) {
        return false;
      }
    }

    return true;
  }
}
