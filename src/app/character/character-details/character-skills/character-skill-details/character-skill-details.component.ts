import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CharacterSkill} from "admin/shared/character-skill";
import {UtilService} from "../../../../shared/services/util/util.service";

@Component({
  selector: 'app-character-skill-details',
  templateUrl: './character-skill-details.component.html',
  styleUrls: ['./character-skill-details.component.scss']
})
export class CharacterSkillDetailsComponent implements OnInit {

  @Input() characterSkill: CharacterSkill;
  @Output() characterSkillChange: EventEmitter<CharacterSkill> = new EventEmitter<CharacterSkill>();
  isInteger:(number: string) => boolean;

  constructor(private route: ActivatedRoute, private router: Router, protected utilService: UtilService) {
    this.isInteger = this.utilService.isInteger;
  }

  ngOnInit() {
  }

  close() {
    this.router.navigate(['/admin/skills']).catch(/*handle error here */);
  }
}
