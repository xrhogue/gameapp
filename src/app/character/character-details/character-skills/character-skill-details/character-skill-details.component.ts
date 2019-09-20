import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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

  constructor(protected utilService: UtilService) {
    this.isInteger = this.utilService.isInteger;
  }

  ngOnInit() {
  }
}
