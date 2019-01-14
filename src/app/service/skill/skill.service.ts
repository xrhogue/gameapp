import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Skill} from "../../admin/shared/skill";
import {Observable} from "rxjs/internal/Observable";
import {Race} from "admin/shared/race";

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  skills: Array<Skill>;

  constructor(private http: HttpClient) {
    this.updateCache();
  }

  getSkills(): Observable<Array<Skill>> {
    return this.http.get<Array<Skill>>("http://localhost:8888/admin/skills");
  }

  getSkill(skillId: number): Observable<Skill> {
    return this.http.get<Skill>("http://localhost:8888/admin/skills/" + skillId);
  }

  addSkill(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>("http://localhost:8888/admin/skills", skill);
  }

  updateSkill(skill: Skill): Observable<Skill> {
    return this.http.put<Skill>("http://localhost:8888/admin/skills", skill);
  }

  deleteSkill(skillId: number): Observable<Skill> {
    return this.http.delete<Skill>("http://localhost:8888/admin/skills/" + skillId);
  }

  getSkillsCache() {
    return this.skills;
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

  updateCache() {
    if (!!this.getSkills()) {
      this.getSkills().subscribe(skills => this.skills = skills);
    }
  }
}
