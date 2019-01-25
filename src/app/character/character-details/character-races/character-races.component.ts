import {Component, OnInit, ViewChild} from '@angular/core';
import {UtilService} from "../../../shared/services/util/util.service";
import {CharacterBaseComponent} from "../../../shared/components/character-base/character-base.component";
import {RaceService} from "../../../service/race/race.service";
import {Race} from "admin/shared/race";
import {Gender} from "admin/shared/gender";
import {CharacterRace} from "admin/shared/character-race";
import {Router} from "@angular/router";
import {Character} from "admin/shared/character";
import {Table} from "primeng/table";

@Component({
  selector: 'app-character-races',
  templateUrl: './character-races.component.html',
  styleUrls: ['./character-races.component.scss']
})
export class CharacterRacesComponent extends CharacterBaseComponent implements OnInit {
  @ViewChild(Table) characterRaces: Table;
  races: Array<Race>
  genders: Array<Gender>;
  character: Character;
  selectedCharacterRace: CharacterRace;
  showDialog: boolean = false;
  invalid: string = '';

  constructor(private raceService: RaceService, protected utilService: UtilService, private router: Router) {
    super(utilService);
  }

  ngOnInit() {
    this.raceService.getGenders().subscribe(genders => {
      this.genders = genders;

      this.raceService.getRaces().subscribe(races => {
        this.races = races;

        this.initCharacterRaces();
        this.selectedCharacterRace = this.initCharacterRace();
      });
    });
  }

  initCharacterRaces() {
    if (!this.character.races) {
      this.character.races = [];
    }
  }

  initCharacterRace(): CharacterRace {
    return CharacterRace.initialize(this.character.id, 0, Character.getRemainingPercent(this.character));
  }

  getRemainingPercent(): number {
    return Character.getRemainingPercent(this.character);
  }

  getMaxPercent(characterRace: CharacterRace): number {
    return this.getRemainingPercent() + characterRace.percent + 1;
  }

  updateRemainingPercent() {
    this.selectedCharacterRace.percent = this.getRemainingPercent();
  }

  addCharacterRace(characterRace: CharacterRace) {
    this.character.races.push(characterRace);
    this.selectedCharacterRace = this.initCharacterRace();
  }

  deleteCharacterRace(raceId: number) {
    let index: number = this.character.races.findIndex(characterRace => characterRace.raceId === raceId);

    if (index > -1) {
      this.character.races.splice(index, 1);
      this.selectedCharacterRace.percent = this.getRemainingPercent();
    }
  }

  getRace(characterRace: CharacterRace): Race {
    return this.races.find(race => race.id === characterRace.raceId);
  }

  updateInvalid(event: {id: string, name: string, invalid: boolean, description: string}) {
    this.invalid = event.description;
  }

  cellFocusLost() {
    this.characterRaces.closeCellEdit();
  }
}
