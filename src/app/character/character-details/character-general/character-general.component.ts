import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UtilService} from "../../../shared/services/util/util.service";
import {CharacterBaseComponent} from "../../../shared/components/character-base/character-base.component";
import {Character} from "admin/shared/character";
import {CharacterService} from "../../../service/character/character.service";
import {RaceService} from "../../../service/race/race.service";
import {Location} from "admin/shared/location";

@Component({
  selector: 'app-character-general',
  templateUrl: './character-general.component.html',
  styleUrls: ['./character-general.component.scss']
})
export class CharacterGeneralComponent extends CharacterBaseComponent implements OnInit {
  id: number;
  @Input() character: Character;
  @Output() characterChange: EventEmitter<Character> = new EventEmitter<Character>();
  birthplace: Location;
  showDialog: boolean = false;

  constructor(private raceService: RaceService, private characterService: CharacterService, protected utilService: UtilService) {
    super(utilService);
    this.fieldStates['name'] = true;
  }

  ngOnInit() {
    this.initInvalid();
  }

  initInvalid() {
    if (!this.character.name || this.character.name.length === 0) {
      this.fieldStates['name'] = true;
    }
  }

  updateBirthplace(birthplace: Location) {
    this.character.locationId = birthplace.id;
    this.characterChange.emit(this.character);
  }
}
